import test from "node:test";
import assert from "node:assert/strict";
import { parseStoredSession } from "../storage.ts";

const validSessionId = "3f2a9c1e-7b64-4d0a-9a55-0c1d2e3f4a5b";

const stored = (overrides = {}) =>
  JSON.stringify({
    version: 1,
    sessionId: validSessionId,
    questionCount: 2,
    limitReached: false,
    messages: [
      { id: "m1", role: "user", content: "Chi phí thành lập công ty?" },
      { id: "m2", role: "assistant", content: "Chi phí phụ thuộc loại hình." },
    ],
    ...overrides,
  });

test("đọc lại đúng phiên đã lưu", () => {
  assert.deepEqual(parseStoredSession(stored()), {
    sessionId: validSessionId,
    questionCount: 2,
    limitReached: false,
    messages: [
      { id: "m1", role: "user", content: "Chi phí thành lập công ty?" },
      { id: "m2", role: "assistant", content: "Chi phí phụ thuộc loại hình." },
    ],
  });
});

test("không có dữ liệu, JSON hỏng hoặc sai phiên bản thì trả về null", () => {
  assert.equal(parseStoredSession(null), null);
  assert.equal(parseStoredSession(""), null);
  assert.equal(parseStoredSession("{không phải json"), null);
  assert.equal(parseStoredSession(stored({ version: 2 })), null);
  assert.equal(parseStoredSession(stored({ messages: "nope" })), null);
  assert.equal(parseStoredSession("[]"), null);
});

test("bỏ qua tin nhắn sai định dạng, giữ lại tin hợp lệ", () => {
  const session = parseStoredSession(
    stored({
      messages: [
        { id: "ok", role: "user", content: "Xin chào" },
        { id: "bad-role", role: "system", content: "x" },
        { id: "", role: "user", content: "thiếu id" },
        { id: "no-content", role: "user" },
        null,
        "chuỗi",
      ],
    })
  );

  assert.deepEqual(
    session.messages.map((m) => m.id),
    ["ok"]
  );
});

test("giữ mã lỗi hợp lệ dạng chuỗi ngắn, bỏ mã lỗi bất thường", () => {
  const session = parseStoredSession(
    stored({
      messages: [
        { id: "a", role: "assistant", content: "", error: "busy" },
        { id: "b", role: "assistant", content: "", error: "x".repeat(100) },
        { id: "c", role: "assistant", content: "", error: 42 },
      ],
    })
  );

  assert.equal(session.messages[0].error, "busy");
  assert.equal("error" in session.messages[1], false);
  assert.equal("error" in session.messages[2], false);
});

test("làm sạch giá trị bất thường: sessionId, bộ đếm, cờ giới hạn", () => {
  const session = parseStoredSession(
    stored({ sessionId: "bad id!", questionCount: -3, limitReached: "yes" })
  );

  assert.equal(session.sessionId, null);
  assert.equal(session.questionCount, 0);
  assert.equal(session.limitReached, false);

  assert.equal(parseStoredSession(stored({ questionCount: 1.5 })).questionCount, 0);
  assert.equal(parseStoredSession(stored({ questionCount: 999999 })).questionCount, 1000);
});

test("chỉ giữ số tin nhắn gần nhất và cắt nội dung quá dài", () => {
  const many = Array.from({ length: 100 }, (_, i) => ({ id: `m${i}`, role: "user", content: `tin ${i}` }));
  const session = parseStoredSession(stored({ messages: many }));

  assert.equal(session.messages.length, 60);
  assert.equal(session.messages.at(-1).id, "m99");

  const long = parseStoredSession(
    stored({ messages: [{ id: "x", role: "assistant", content: "a".repeat(9000) }] })
  );
  assert.equal(long.messages[0].content.length, 5000);
});
