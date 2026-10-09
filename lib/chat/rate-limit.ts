/**
 * Bộ giới hạn tốc độ kiểu cửa sổ trượt, giữ trong bộ nhớ của tiến trình Node.
 *
 * Lưu ý khi triển khai: trạng thái mất khi khởi động lại và KHÔNG chia sẻ giữa nhiều tiến trình/instance.
 * Chạy một tiến trình `next start` sau reverse proxy thì đủ dùng; nếu mở rộng ra nhiều instance hoặc
 * serverless, thay bằng kho dùng chung (Redis, Upstash...) với cùng giao diện check/record.
 *
 * File này cố ý không import gì để chạy được trực tiếp trong test của Node.
 */

export type RateLimitCheck = { allowed: true } | { allowed: false; retryAfterSeconds: number };

export type SlidingWindowLimiter = {
  /** Cho biết key còn được phép hay không. KHÔNG ghi nhận lượt. */
  check: (key: string) => RateLimitCheck;
  /** Ghi nhận một lượt cho key (gọi sau khi đã quyết định phục vụ yêu cầu). */
  record: (key: string) => void;
};

type LimiterOptions = {
  /** Số lượt tối đa trong một cửa sổ. */
  limit: number;
  windowMs: number;
  /** Số key tối đa giữ trong bộ nhớ, tránh tăng vô hạn khi bị gửi dồn từ nhiều nguồn. */
  maxKeys?: number;
  /** Đồng hồ, cho phép thay thế trong test. */
  now?: () => number;
};

const DEFAULT_MAX_KEYS = 10_000;

export function createSlidingWindowLimiter({
  limit,
  windowMs,
  maxKeys = DEFAULT_MAX_KEYS,
  now = Date.now,
}: LimiterOptions): SlidingWindowLimiter {
  // Mỗi key giữ mảng mốc thời gian tăng dần; luôn tạo mảng mới thay vì sửa tại chỗ.
  const hitsByKey = new Map<string, readonly number[]>();

  const activeHits = (key: string, current: number): readonly number[] =>
    (hitsByKey.get(key) ?? []).filter((timestamp) => current - timestamp < windowMs);

  /** Dọn các key đã hết hạn; nếu vẫn đầy thì loại key được ghi nhận lâu nhất. */
  const makeRoom = (current: number): void => {
    for (const [key, hits] of hitsByKey) {
      if (hits.every((timestamp) => current - timestamp >= windowMs)) {
        hitsByKey.delete(key);
      }
    }
    if (hitsByKey.size < maxKeys) return;
    const oldestKey = hitsByKey.keys().next().value;
    if (oldestKey !== undefined) hitsByKey.delete(oldestKey);
  };

  return {
    check(key) {
      const current = now();
      const hits = activeHits(key, current);
      if (hits.length < limit) return { allowed: true };

      // Được phép lại khi lượt thứ (hits.length - limit + 1) tính từ cũ nhất hết hạn.
      const retryAfterMs = hits[hits.length - limit] + windowMs - current;
      return { allowed: false, retryAfterSeconds: Math.max(1, Math.ceil(retryAfterMs / 1000)) };
    },

    record(key) {
      const current = now();
      const hits = activeHits(key, current);
      if (!hitsByKey.has(key) && hitsByKey.size >= maxKeys) makeRoom(current);
      // Xoá rồi đặt lại để key vừa dùng nằm cuối thứ tự duyệt (cũ nhất bị loại trước).
      hitsByKey.delete(key);
      hitsByKey.set(key, [...hits, current]);
    },
  };
}
