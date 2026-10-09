import test from "node:test";
import assert from "node:assert/strict";
import { createSlidingWindowLimiter } from "../rate-limit.ts";

const MINUTE = 60_000;

function createClock(start = 1_000_000) {
  let current = start;
  return {
    now: () => current,
    advance: (ms) => {
      current += ms;
    },
  };
}

test("cho phép đến đúng giới hạn rồi chặn", () => {
  const clock = createClock();
  const limiter = createSlidingWindowLimiter({ limit: 3, windowMs: 60 * MINUTE, now: clock.now });

  for (let i = 0; i < 3; i++) {
    assert.deepEqual(limiter.check("ip-1"), { allowed: true });
    limiter.record("ip-1");
  }

  const decision = limiter.check("ip-1");
  assert.equal(decision.allowed, false);
  assert.equal(decision.retryAfterSeconds, 3600);
});

test("check không tự ghi nhận lượt", () => {
  const limiter = createSlidingWindowLimiter({ limit: 1, windowMs: 60 * MINUTE });

  for (let i = 0; i < 5; i++) {
    assert.deepEqual(limiter.check("ip-1"), { allowed: true });
  }
});

test("các key độc lập với nhau", () => {
  const limiter = createSlidingWindowLimiter({ limit: 1, windowMs: 60 * MINUTE });

  limiter.record("ip-1");

  assert.equal(limiter.check("ip-1").allowed, false);
  assert.equal(limiter.check("ip-2").allowed, true);
});

test("cửa sổ trượt: lượt cũ hết hạn thì được hỏi tiếp", () => {
  const clock = createClock();
  const limiter = createSlidingWindowLimiter({ limit: 2, windowMs: 60 * MINUTE, now: clock.now });

  limiter.record("ip-1"); // t = 0
  clock.advance(30 * MINUTE);
  limiter.record("ip-1"); // t = 30 phút

  clock.advance(29 * MINUTE); // t = 59 phút: lượt đầu chưa hết hạn
  const blocked = limiter.check("ip-1");
  assert.equal(blocked.allowed, false);
  assert.equal(blocked.retryAfterSeconds, 60); // còn 1 phút nữa lượt đầu mới hết hạn

  clock.advance(2 * MINUTE); // t = 61 phút: lượt đầu đã hết hạn
  assert.deepEqual(limiter.check("ip-1"), { allowed: true });
});

test("retryAfterSeconds luôn tối thiểu 1 giây", () => {
  const clock = createClock();
  const limiter = createSlidingWindowLimiter({ limit: 1, windowMs: 1000, now: clock.now });

  limiter.record("ip-1");
  clock.advance(999);

  const decision = limiter.check("ip-1");
  assert.equal(decision.allowed, false);
  assert.equal(decision.retryAfterSeconds, 1);
});

test("vượt maxKeys thì loại key cũ nhất, bộ nhớ không tăng vô hạn", () => {
  const limiter = createSlidingWindowLimiter({ limit: 1, windowMs: 60 * MINUTE, maxKeys: 2 });

  limiter.record("a");
  limiter.record("b");
  limiter.record("c"); // đầy: loại "a"

  assert.equal(limiter.check("a").allowed, true);
  assert.equal(limiter.check("b").allowed, false);
  assert.equal(limiter.check("c").allowed, false);
});

test("khi đầy, ưu tiên dọn key đã hết hạn trước khi loại key còn hiệu lực", () => {
  const clock = createClock();
  const limiter = createSlidingWindowLimiter({ limit: 1, windowMs: 10 * MINUTE, maxKeys: 2, now: clock.now });

  limiter.record("old"); // sẽ hết hạn
  clock.advance(5 * MINUTE);
  limiter.record("fresh");
  clock.advance(6 * MINUTE); // "old" đã hết hạn, "fresh" còn hiệu lực

  limiter.record("new"); // đầy: phải dọn "old", giữ "fresh"

  assert.equal(limiter.check("fresh").allowed, false);
  assert.equal(limiter.check("new").allowed, false);
});
