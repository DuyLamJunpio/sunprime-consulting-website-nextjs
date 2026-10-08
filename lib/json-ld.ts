/**
 * Serialize dữ liệu JSON-LD để nhúng trong <script type="application/ld+json">.
 * JSON.stringify không escape "<", nên chuỗi chứa "</script>" (vd tiêu đề bài viết từ API) có thể thoát khỏi thẻ script.
 * Thay "<" bằng < (vẫn là JSON hợp lệ, trình phân tích đọc ra đúng ký tự).
 */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
