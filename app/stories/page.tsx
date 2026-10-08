import PartnerShowcaseSection from "@/components/partner-showcase-section";
import { showSampleContent } from "@/lib/feature-flags";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Khách hàng & đối tác",
  description:
    "Những doanh nghiệp đã tin tưởng và đồng hành cùng SunPrime Consulting trong kế toán, pháp lý và vận hành.",
  alternates: { canonical: "/stories" },
  openGraph: {
    title: "Khách hàng & đối tác của SunPrime Consulting",
    description:
      "Những doanh nghiệp đã tin tưởng và đồng hành cùng SunPrime Consulting.",
    url: "/stories",
    type: "website",
  },
};

export default function PartnerShowcasePage() {
  // Dữ liệu khách hàng/đối tác hiện là nội dung mẫu: ẩn cho đến khi có case study thật.
  if (!showSampleContent) notFound();
  return <PartnerShowcaseSection showHero />;
}