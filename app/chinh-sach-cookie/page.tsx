import type { Metadata } from "next";
import LegalContent from "@/components/legal/legal-content";

export const metadata: Metadata = {
  title: "Chính sách cookie",
  description:
    "Chính sách cookie của SunPrime Consulting: website lưu gì trên trình duyệt, dịch vụ bên thứ ba và cách bạn quản lý cookie.",
  alternates: { canonical: "/chinh-sach-cookie" },
};

export default function CookiePage() {
  return <LegalContent docKey="cookies" />;
}
