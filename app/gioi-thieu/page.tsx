import PartnerShowcaseSection from "@/components/partner-showcase-section";
import AboutContent from "@/components/about/about-content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Giới thiệu SunPrime Consulting",
  description:
    "SunPrime Consulting – đơn vị tư vấn thành lập, pháp lý, kế toán và vận hành, đồng hành doanh nghiệp xây nền tảng chuẩn luật, rõ số, vững hệ thống.",
  alternates: { canonical: "/gioi-thieu" },
  openGraph: {
    title: "Giới thiệu SunPrime Consulting",
    description:
      "Tầm nhìn, sứ mệnh và giá trị cốt lõi của SunPrime Consulting trong tư vấn pháp lý, kế toán và vận hành doanh nghiệp.",
    url: "/gioi-thieu",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <main className="bg-surface-base">
      <AboutContent />
      <PartnerShowcaseSection showHero={false} />
    </main>
  );
}
