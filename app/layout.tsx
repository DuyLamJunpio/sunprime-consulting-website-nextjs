import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import Nav from "@/components/nav";
import SiteFooter from "@/components/footer";
import ContactFloatingButtons from "@/components/contact";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-geist" });

export const metadata: Metadata = {
  title: {
    default: "SunPrime Consulting | Kế toán, pháp lý doanh nghiệp",
    template: "%s | SunPrime Consulting",
  },
  description:
    "SunPrime Consulting đồng hành doanh nghiệp về pháp lý, kế toán và vận hành để xây nền tảng chuẩn luật, rõ số, vững hệ thống.",
  keywords: [
    "kế toán doanh nghiệp",
    "pháp lý doanh nghiệp",
    "tư vấn thành lập công ty",
    "kế toán nhà hàng",
    "tư vấn vận hành",
    "dịch vụ kế toán",
    "SunPrime Consulting",
  ],
  applicationName: "SunPrime Consulting",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "SunPrime Consulting | Kế toán, pháp lý doanh nghiệp",
    description:
      "Tư vấn pháp lý, kế toán và vận hành cho doanh nghiệp, đặc biệt trong lĩnh vực nhà hàng – khách sạn.",
    type: "website",
    locale: "vi_VN",
  },
  twitter: {
    card: "summary_large_image",
    title: "SunPrime Consulting | Kế toán, pháp lý doanh nghiệp",
    description:
      "Tư vấn pháp lý, kế toán và vận hành cho doanh nghiệp, đặc biệt trong lĩnh vực nhà hàng – khách sạn.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="scroll-smooth">
      <body className={`${inter.className} ${inter.variable}`}>
        <Nav />
        {children}
        <SiteFooter />
        <ContactFloatingButtons />
        <Script src="https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
