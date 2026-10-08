"use client";

import Image from "next/image";
import { useI18n } from "@/components/i18n-provider";
import { trustBadges } from "@/data/certifications";

/** Hàng badge DMCA / Bộ Công Thương ở cuối footer. Badge có `href` thì bấm được, chưa có thì chỉ hiển thị. */
export default function FooterTrustBadges() {
  const { lang } = useI18n();

  return (
    <ul className="flex flex-wrap items-center gap-4">
      {trustBadges.map(({ id, image, alt, href }) => {
        const badge = (
          <Image
            src={image.src}
            alt={alt[lang]}
            width={image.width}
            height={image.height}
            className="h-14 w-auto rounded-lg"
          />
        );

        return (
          <li key={id}>
            {href ? (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="block transition-opacity hover:opacity-80"
              >
                {badge}
              </a>
            ) : (
              badge
            )}
          </li>
        );
      })}
    </ul>
  );
}
