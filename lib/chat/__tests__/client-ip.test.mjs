import test from "node:test";
import assert from "node:assert/strict";
import { getClientIp } from "../client-ip.ts";

const ipOf = (headers) => getClientIp(new Headers(headers));

test("ưu tiên x-real-ip (do reverse proxy đặt)", () => {
  assert.equal(ipOf({ "x-real-ip": "203.0.113.7", "x-forwarded-for": "198.51.100.1" }), "203.0.113.7");
});

test("không có x-real-ip thì lấy phần tử đầu của x-forwarded-for", () => {
  assert.equal(ipOf({ "x-forwarded-for": "198.51.100.1, 10.0.0.1, 10.0.0.2" }), "198.51.100.1");
});

test("cắt khoảng trắng", () => {
  assert.equal(ipOf({ "x-real-ip": "  203.0.113.7  " }), "203.0.113.7");
});

test("bỏ tiền tố IPv4-mapped IPv6", () => {
  assert.equal(ipOf({ "x-real-ip": "::ffff:203.0.113.7" }), "203.0.113.7");
});

test("giữ nguyên IPv6 hợp lệ, chuẩn hoá chữ thường", () => {
  assert.equal(ipOf({ "x-real-ip": "2001:DB8::1" }), "2001:db8::1");
});

test("giá trị không hợp lệ hoặc quá dài trả về unknown", () => {
  assert.equal(ipOf({ "x-real-ip": "not an ip!" }), "unknown");
  assert.equal(ipOf({ "x-real-ip": "<script>alert(1)</script>" }), "unknown");
  assert.equal(ipOf({ "x-real-ip": "1".repeat(100) }), "unknown");
});

test("không có header nào trả về unknown", () => {
  assert.equal(ipOf({}), "unknown");
});
