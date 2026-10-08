import type { Metadata } from "next";
import LegalContent from "@/components/legal/legal-content";

export const metadata: Metadata = {
  title: "Chính sách bảo mật",
  description:
    "Chính sách bảo mật của SunPrime Consulting: thông tin chúng tôi thu thập, mục đích sử dụng, quyền của bạn và cách bảo vệ dữ liệu.",
  alternates: { canonical: "/chinh-sach-bao-mat" },
};

export default function PrivacyPage() {
  return <LegalContent docKey="privacy" />;
}
