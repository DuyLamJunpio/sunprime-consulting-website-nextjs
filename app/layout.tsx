import type { Metadata } from "next";
import { Be_Vietnam_Pro, Inter } from "next/font/google";
import Script from "next/script";
import Nav from "@/components/nav";
import SiteFooter from "@/components/footer";
import ContactFloatingButtons from "@/components/contact";
import ScrollReveal from "@/components/scroll-reveal";
import I18nProvider from "@/components/i18n-provider";
import { siteConfig, absoluteUrl } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  display: "swap",
  variable: "--font-geist",
});

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["500", "600", "700"],
  display: "swap",
  variable: "--font-heading",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "SunPrime Consulting | Kế toán, pháp lý doanh nghiệp",
    template: "%s | SunPrime Consulting",
  },
  description: siteConfig.description,
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
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.legalName,
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "SunPrime Consulting | Kế toán, pháp lý doanh nghiệp",
    description:
      "Tư vấn pháp lý, kế toán và vận hành cho doanh nghiệp, đặc biệt trong lĩnh vực nhà hàng – khách sạn.",
    type: "website",
    locale: "vi_VN",
    url: siteConfig.url,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: "SunPrime Consulting | Kế toán, pháp lý doanh nghiệp",
    description:
      "Tư vấn pháp lý, kế toán và vận hành cho doanh nghiệp, đặc biệt trong lĩnh vực nhà hàng – khách sạn.",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness", "AccountingService"],
  "@id": absoluteUrl("/#organization"),
  name: siteConfig.name,
  legalName: siteConfig.legalName,
  url: siteConfig.url,
  description: siteConfig.description,
  email: siteConfig.email,
  telephone: siteConfig.phone,
  taxID: siteConfig.taxId,
  image: absoluteUrl(siteConfig.ogImage),
  logo: absoluteUrl(siteConfig.logo),
  address: {
    "@type": "PostalAddress",
    streetAddress: siteConfig.address.street,
    addressLocality: siteConfig.address.city,
    addressRegion: siteConfig.address.district,
    addressCountry: siteConfig.address.country,
  },
  areaServed: "VN",
  sameAs: [
    siteConfig.social.facebook,
    siteConfig.social.instagram,
    siteConfig.social.tiktok,
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="scroll-smooth">
      <body className={`${inter.className} ${inter.variable} ${beVietnamPro.variable}`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <I18nProvider>
          <ScrollReveal />
          <Nav />
          {children}
          <SiteFooter />
          <ContactFloatingButtons />
        </I18nProvider>
        <Script src="https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
