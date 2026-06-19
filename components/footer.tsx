"use client";

import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { useI18n } from "@/components/i18n-provider";
import { messages } from "@/lib/i18n/messages";

export default function SiteFooter() {
  const { lang } = useI18n();
  const t = messages[lang].footer;
  const address =
    lang === "vi"
      ? "Tầng 6, Toà nhà dầu khí, Số 2 đường 30-4, Phường Hoà Cường, TP Đà Nẵng, Việt Nam"
      : "6th Floor, Petroleum Building, 2 30-4 Street, Hoa Cuong Ward, Da Nang, Vietnam";

  return (
    <footer className="border-t border-border-soft bg-surface-section pb-12 pt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top Footer */}
        <div className="mb-20 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-5 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="group mb-4 flex items-center gap-2">
              <Image src="/logo.png" alt="Sunprime Logo" width={36} height={36} className="h-9 w-9 object-contain" />
              <div className="flex flex-col">
                <span className="leading-none text-base font-bold tracking-tight text-text-primary">{siteConfig.legalName}</span>
              </div>
            </Link>
            <p className="mb-3 pl-1 text-xs font-medium text-text-muted">{t.tagline}</p>
            <p className="mb-3 pl-1 text-sm text-text-muted">{t.description}</p>
            <p className="pl-1 text-sm font-medium text-text-secondary">
              <span className="font-semibold text-text-primary">{t.taxLabel}</span> {siteConfig.taxId}
            </p>
            <Link
              href={siteConfig.portalUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-5 ml-1 inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-strong hover:shadow-brand-glow"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                <path d="m10 17 5-5-5-5" />
                <path d="M15 12H3" />
              </svg>
              <span>{t.portalButton}</span>
            </Link>
          </div>

          {/* Column 1 */}
          <div>
            <h3 className="mb-6 font-semibold tracking-tight text-text-primary">{t.contactInfo}</h3>
            <ul className="space-y-4 text-[15px] font-medium text-text-muted">
              <li>{address}</li>
              <li>
                <a href="tel:+84914699877" className="transition-colors hover:text-brand">
                  0914 699 877
                </a>
              </li>
              <li>
                <a href="mailto:giangtran.sunprime@gmail.com" className="transition-colors hover:text-brand">
                  giangtran.sunprime@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="mb-6 font-semibold tracking-tight text-text-primary">{t.workingHours}</h3>
            <ul className="space-y-4 text-[15px] font-medium text-text-muted">
              {t.hours.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="mb-6 font-semibold tracking-tight text-text-primary">{t.links}</h3>
            <ul className="space-y-4 text-[15px] font-medium text-text-muted">
              <li>
                <a href="https://maps.google.com/?q=2+duong+30-4+da+nang" target="_blank" rel="noreferrer" className="transition-colors hover:text-brand">
                  {t.viewOnMap}
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-brand">
                  {t.privacy}
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-brand">
                  {t.terms}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h3 className="mb-6 font-semibold tracking-tight text-text-primary">{t.follow}</h3>
            <div className="flex gap-4 text-text-secondary">
              <a href="https://www.facebook.com/profile.php?id=61586874073145&locale=vi_VN" target="_blank" rel="noreferrer" className="p-1 transition-colors hover:text-brand">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a href="https://www.tiktok.com/@sun.prime0" target="_blank" rel="noreferrer" className="p-1 transition-colors hover:text-brand">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16.7 3c.3 1.7 1.3 3 2.9 3.8V9c-1.3 0-2.6-.4-3.7-1.1v6.1a5.7 5.7 0 1 1-4.9-5.6v2.3a3.4 3.4 0 1 0 2.6 3.3V3z" />
                </svg>
              </a>
              <a href="https://www.instagram.com/sunprime.danang/" target="_blank" rel="noreferrer" className="p-1 transition-colors hover:text-brand">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="flex flex-col items-start justify-between gap-8 border-t border-border-soft pt-10 md:flex-row md:items-center">
          <div className="text-xs font-medium leading-relaxed text-text-muted">
            <p>© {new Date().getFullYear()} SUNPRIME CONSULTING. {t.rights}</p>
            <p>{t.taxLabel} {siteConfig.taxId}</p>
          </div>

          <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm font-medium text-text-muted">
            <a href="#" className="transition-colors hover:text-text-primary">
              {t.privacy}
            </a>
            <a href="#" className="transition-colors hover:text-text-primary">
              {t.terms}
            </a>
            <a href="#" className="transition-colors hover:text-text-primary">
              {t.cookie}
            </a>
          </div>

          <div className="flex items-center gap-6">
            <span className="text-sm font-bold tracking-tight text-text-primary">SUNPRIME CONSULTING</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
