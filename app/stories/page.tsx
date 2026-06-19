import PartnerShowcaseSection from "@/components/partner-showcase-section";
import type { Metadata } from "next";

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
  return <PartnerShowcaseSection showHero />;
}