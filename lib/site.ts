/**
 * Cấu hình site tập trung cho SEO (URL, tên, mô tả, thông tin liên hệ, mạng xã hội).
 * Đổi domain thật qua biến môi trường NEXT_PUBLIC_SITE_URL khi deploy.
 */
export const siteConfig = {
  name: "SunPrime Consulting",
  legalName: "CÔNG TY TNHH SUNPRIME CONSULTING",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://sunprime.vn").replace(/\/$/, ""),
  description:
    "SunPrime Consulting đồng hành doanh nghiệp về pháp lý, kế toán và vận hành để xây nền tảng chuẩn luật, rõ số, vững hệ thống.",
  locale: "vi_VN",
  taxId: "0402296727",
  phone: "+84938168168",
  email: "hello@sunprime.consulting",
  address: {
    street: "Tầng 6, Toà nhà dầu khí, Số 2 đường 30-4",
    district: "Phường Hoà Cường",
    city: "Đà Nẵng",
    country: "VN",
  },
  // Ảnh OG mặc định được sinh động tại app/opengraph-image.tsx (route /opengraph-image).
  ogImage: "/opengraph-image",
  logo: "/logo.png",
  // Cổng dịch vụ B2B cho khách hàng doanh nghiệp.
  portalUrl: process.env.NEXT_PUBLIC_PORTAL_URL ?? "https://portal.sunprime.vn",
  social: {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    tiktok: "https://www.tiktok.com",
  },
} as const;

/** Trả về URL tuyệt đối từ đường dẫn tương đối (cho canonical/OG). */
export const absoluteUrl = (path = "/") =>
  `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
