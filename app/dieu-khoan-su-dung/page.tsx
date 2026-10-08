import type { Metadata } from "next";
import LegalContent from "@/components/legal/legal-content";

export const metadata: Metadata = {
  title: "Điều khoản sử dụng",
  description:
    "Điều khoản sử dụng website SunPrime Consulting: tính chất thông tin, thỏa thuận dịch vụ, sở hữu trí tuệ, giới hạn trách nhiệm và luật áp dụng.",
  alternates: { canonical: "/dieu-khoan-su-dung" },
};

export default function TermsPage() {
  return <LegalContent docKey="terms" />;
}
