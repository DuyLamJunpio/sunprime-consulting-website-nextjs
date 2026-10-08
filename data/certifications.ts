/**
 * Chứng nhận, giấy phép, giải thưởng liên quan đến ngành nghề của SunPrime.
 *
 * QUAN TRỌNG: chỉ mục có status "held" (công ty ĐÃ có, kèm giấy tờ chứng minh) mới hiện công khai.
 * Mục "planned" (dự kiến xin/đăng ký) chỉ hiện khi bật NEXT_PUBLIC_SHOW_CERT_PREVIEW=true để xem trước nội bộ,
 * và luôn có nhãn "Dự kiến". Khi công ty đạt được chứng nhận nào, đổi status sang "held" và điền `reference`.
 *
 * Danh sách dựa trên hiểu biết chung, cần xác minh điều kiện, cơ quan cấp và thủ tục hiện hành trước khi nộp hồ sơ.
 */

export type CertificationStatus = "held" | "planned";
export type CertificationCategory = "legal" | "standard" | "award" | "partner";

export type Certification = {
  id: string;
  category: CertificationCategory;
  status: CertificationStatus;
  name: { vi: string; en: string };
  issuer: { vi: string; en: string };
  /** Số hiệu / ngày cấp / link tra cứu — bắt buộc điền khi status là "held". */
  reference?: string;
};

export const certifications: readonly Certification[] = [
  {
    id: "accounting-service-license",
    category: "legal",
    status: "planned",
    name: {
      vi: "Giấy chứng nhận đủ điều kiện kinh doanh dịch vụ kế toán",
      en: "Accounting services business eligibility certificate",
    },
    issuer: { vi: "Bộ Tài chính", en: "Ministry of Finance" },
  },
  {
    id: "tax-procedure-service",
    category: "legal",
    status: "planned",
    name: {
      vi: "Đủ điều kiện kinh doanh dịch vụ làm thủ tục về thuế (đại lý thuế)",
      en: "Eligible to provide tax procedure services (tax agent)",
    },
    issuer: { vi: "Cơ quan thuế", en: "Tax authority" },
  },
  {
    id: "tax-agent-practitioner",
    category: "legal",
    status: "planned",
    name: {
      vi: "Chứng chỉ hành nghề đại lý thuế của nhân sự",
      en: "Tax agent practitioner certificates (staff)",
    },
    issuer: { vi: "Hội Tư vấn thuế Việt Nam (VTCA)", en: "Vietnam Tax Consultants Association (VTCA)" },
  },
  {
    id: "iso-9001",
    category: "standard",
    status: "planned",
    name: {
      vi: "ISO 9001:2015 - Hệ thống quản lý chất lượng",
      en: "ISO 9001:2015 - Quality management system",
    },
    issuer: {
      vi: "Tổ chức chứng nhận độc lập được công nhận",
      en: "Accredited independent certification body",
    },
  },
  {
    id: "esign-einvoice-partner",
    category: "partner",
    status: "planned",
    name: {
      vi: "Đại lý / đối tác chính thức về chữ ký số và hóa đơn điện tử",
      en: "Authorized agent / partner for digital signatures and e-invoicing",
    },
    issuer: {
      vi: "Nhà cung cấp dịch vụ được cấp phép",
      en: "Licensed service provider",
    },
  },
  {
    id: "sao-khue",
    category: "award",
    status: "planned",
    name: { vi: "Giải thưởng Sao Khuê", en: "Sao Khue Award" },
    issuer: {
      vi: "Hiệp hội Phần mềm và Dịch vụ CNTT Việt Nam (VINASA)",
      en: "Vietnam Software and IT Services Association (VINASA)",
    },
  },
  {
    id: "vietnam-digital-awards",
    category: "award",
    status: "planned",
    name: { vi: "Giải thưởng Chuyển đổi số Việt Nam", en: "Vietnam Digital Awards" },
    issuer: {
      vi: "Hiệp hội Phần mềm và Dịch vụ CNTT Việt Nam (VINASA)",
      en: "Vietnam Software and IT Services Association (VINASA)",
    },
  },
  {
    id: "sao-vang-dat-viet",
    category: "award",
    status: "planned",
    name: { vi: "Giải thưởng Sao Vàng Đất Việt", en: "Sao Vang Dat Viet Award" },
    issuer: {
      vi: "Hội Doanh nghiệp trẻ Việt Nam",
      en: "Vietnam Young Entrepreneurs Association",
    },
  },
];

export type TrustBadge = {
  id: string;
  image: { src: string; width: number; height: number };
  alt: { vi: string; en: string };
  /** Link xác minh của đơn vị cấp (DMCA: trang trạng thái bảo vệ; Bộ Công Thương: trang chi tiết trên online.gov.vn). Chưa điền thì badge hiện không có link. */
  href?: string;
};

/** Badge bản quyền / thông báo website, hiện ở cuối footer. Ảnh đặt trong public/images/badges. */
export const trustBadges: readonly TrustBadge[] = [
  {
    id: "dmca",
    image: { src: "/images/badges/dmca-protected.png", width: 68, height: 83 },
    alt: { vi: "Website được bảo vệ bởi DMCA", en: "Website protected by DMCA" },
  },
  {
    id: "bo-cong-thuong",
    image: { src: "/images/badges/da-thong-bao-bo-cong-thuong.png", width: 158, height: 83 },
    alt: { vi: "Đã thông báo Bộ Công Thương", en: "Notified to the Ministry of Industry and Trade" },
  },
];

/** Mục được phép hiển thị: công khai chỉ gồm mục đã có thật; xem trước nội bộ gồm cả mục dự kiến. */
export function getVisibleCertifications(includePlanned: boolean): Certification[] {
  return certifications.filter((item) => item.status === "held" || includePlanned);
}
