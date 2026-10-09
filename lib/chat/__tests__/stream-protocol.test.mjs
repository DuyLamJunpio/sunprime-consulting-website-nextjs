import test from "node:test";
import assert from "node:assert/strict";
import { createChatEventParser, encodeChatEvent, isChatErrorCode } from "../stream-protocol.ts";

test("mỗi sự kiện được mã hoá thành một dòng JSON kết thúc bằng xuống dòng", () => {
  const line = encodeChatEvent({ type: "delta", text: "Xin chào\n\"anh/chị\"" });

  assert.ok(line.endsWith("\n"));
  assert.equal(line.split("\n").length, 2); // nội dung có xuống dòng nhưng đã được escape
  assert.deepEqual(JSON.parse(line), { type: "delta", text: "Xin chào\n\"anh/chị\"" });
});

test("parser đọc nhiều sự kiện trong một khối", () => {
  const parser = createChatEventParser();
  const chunk =
    encodeChatEvent({ type: "delta", text: "A" }) +
    encodeChatEvent({ type: "delta", text: "B" }) +
    encodeChatEvent({ type: "done" });

  assert.deepEqual(parser.push(chunk), [
    { type: "delta", text: "A" },
    { type: "delta", text: "B" },
    { type: "done" },
  ]);
});

test("parser ghép được dòng bị cắt giữa chừng giữa các khối", () => {
  const parser = createChatEventParser();
  const line = encodeChatEvent({ type: "delta", text: "Xin chào anh/chị" });
  const cut = Math.floor(line.length / 2);

  assert.deepEqual(parser.push(line.slice(0, cut)), []);
  assert.deepEqual(parser.push(line.slice(cut)), [{ type: "delta", text: "Xin chào anh/chị" }]);
});

test("flush trả nốt dòng cuối không có ký tự xuống dòng", () => {
  const parser = createChatEventParser();

  assert.deepEqual(parser.push('{"type":"done"}'), []);
  assert.deepEqual(parser.flush(), [{ type: "done" }]);
  assert.deepEqual(parser.flush(), []);
});

test("bỏ qua dòng hỏng, sự kiện lạ và mã lỗi không hợp lệ", () => {
  const parser = createChatEventParser();
  const chunk = [
    "không phải json",
    '{"type":"unknown"}',
    '{"type":"delta"}', // thiếu text
    '{"type":"delta","text":123}',
    '{"type":"error","code":"hacker"}',
    '{"type":"error","code":"busy"}',
    "",
  ].join("\n");

  assert.deepEqual(parser.push(chunk), [{ type: "error", code: "busy" }]);
});

test("isChatErrorCode chỉ nhận các mã đã định nghĩa", () => {
  assert.equal(isChatErrorCode("busy"), true);
  assert.equal(isChatErrorCode("session_limit"), true);
  assert.equal(isChatErrorCode("whatever"), false);
  assert.equal(isChatErrorCode(undefined), false);
  assert.equal(isChatErrorCode(42), false);
});
