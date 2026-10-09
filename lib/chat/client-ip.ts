/**
 * Lấy địa chỉ IP của người gọi từ header do reverse proxy đặt.
 *
 * Chỉ đáng tin khi ứng dụng chạy sau proxy GHI ĐÈ các header này (nginx: `proxy_set_header X-Real-IP $remote_addr;`,
 * Vercel và các CDN lớn tự làm). Nếu proxy chỉ nối thêm vào x-forwarded-for thì phần tử đầu có thể bị giả,
 * khi đó chặn theo IP chỉ là lớp phụ, chốt chặn toàn hệ thống (config.ts) mới là lớp bảo vệ chi phí chính.
 *
 * File này cố ý không import gì để chạy được trực tiếp trong test của Node.
 */

export const UNKNOWN_IP = "unknown";

const IPV4_MAPPED_PREFIX = "::ffff:";
/** Đủ cho một địa chỉ IPv6 đầy đủ (kể cả dạng nhúng IPv4). */
const MAX_IP_LENGTH = 45;
const IP_CHARACTERS = /^[0-9a-f:.]+$/;

type HeaderReader = { get(name: string): string | null };

function normalizeIp(raw: string): string {
  const value = raw.trim().toLowerCase();
  const withoutMapping = value.startsWith(IPV4_MAPPED_PREFIX) ? value.slice(IPV4_MAPPED_PREFIX.length) : value;

  if (withoutMapping.length === 0 || withoutMapping.length > MAX_IP_LENGTH || !IP_CHARACTERS.test(withoutMapping)) {
    return UNKNOWN_IP;
  }
  return withoutMapping;
}

export function getClientIp(headers: HeaderReader): string {
  const realIp = headers.get("x-real-ip");
  if (realIp) return normalizeIp(realIp);

  const forwardedFor = headers.get("x-forwarded-for");
  if (forwardedFor) return normalizeIp(forwardedFor.split(",")[0] ?? "");

  return UNKNOWN_IP;
}
