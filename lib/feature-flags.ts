/**
 * Nội dung mẫu (khách hàng, đối tác, đội ngũ, đánh giá, số liệu hoạt động) chưa phải dữ liệu thật
 * vì công ty mới thành lập. Mặc định ẨN; chỉ bật lại khi đã thay bằng nội dung thật:
 *   NEXT_PUBLIC_SHOW_SAMPLE_CONTENT=true
 */
export const showSampleContent = process.env.NEXT_PUBLIC_SHOW_SAMPLE_CONTENT === "true";

/**
 * Xem trước khối "Chứng nhận & giải thưởng" ở footer gồm cả mục DỰ KIẾN (chưa đạt, luôn có nhãn "Dự kiến").
 * Chỉ đặt trong .env.local trên máy xem trước; KHÔNG đặt trên môi trường production.
 * Mục đã có thật (status "held" trong data/certifications.ts) hiện công khai bất kể cờ này.
 *   NEXT_PUBLIC_SHOW_CERT_PREVIEW=true
 */
export const showCertificationPreview = process.env.NEXT_PUBLIC_SHOW_CERT_PREVIEW === "true";
