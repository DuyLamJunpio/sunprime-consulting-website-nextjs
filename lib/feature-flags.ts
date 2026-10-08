/**
 * Nội dung mẫu (khách hàng, đối tác, đội ngũ, đánh giá, số liệu hoạt động) chưa phải dữ liệu thật
 * vì công ty mới thành lập. Mặc định ẨN; chỉ bật lại khi đã thay bằng nội dung thật:
 *   NEXT_PUBLIC_SHOW_SAMPLE_CONTENT=true
 */
export const showSampleContent = process.env.NEXT_PUBLIC_SHOW_SAMPLE_CONTENT === "true";
