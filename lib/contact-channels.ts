/**
 * Kênh liên hệ trực tiếp với chuyên viên SunPrime (Zalo, Telegram, WhatsApp).
 * Dùng chung cho nút nổi/khung chat và system prompt của trợ lý, để đổi số hoặc tài khoản ở một chỗ duy nhất.
 */
const PHONE_LOCAL = "0914699877";
/** Dạng quốc tế không có dấu "+", suy ra từ PHONE_LOCAL (bỏ số 0 đầu, thêm mã vùng 84). */
const PHONE_INTERNATIONAL = `84${PHONE_LOCAL.slice(1)}`;
const TELEGRAM_USERNAME = "duylamjunpio";

export const contactChannels = {
  phoneDisplay: "0914 699 877",
  zalo: {
    url: `https://zalo.me/${PHONE_LOCAL}`,
  },
  telegram: {
    url: `https://t.me/${TELEGRAM_USERNAME}`,
    appUrl: `tg://resolve?domain=${TELEGRAM_USERNAME}`,
  },
  whatsapp: {
    url: `https://wa.me/${PHONE_INTERNATIONAL}`,
    appUrl: `whatsapp://send?phone=${PHONE_INTERNATIONAL}`,
  },
} as const;
