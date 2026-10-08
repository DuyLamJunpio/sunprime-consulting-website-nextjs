"use client";

import { useI18n } from "@/components/i18n-provider";
import { getVisibleCertifications } from "@/data/certifications";
import { showCertificationPreview } from "@/lib/feature-flags";

/**
 * Khối "Chứng nhận & giải thưởng" ở footer.
 * Công khai chỉ hiện mục đã có thật; mục "Dự kiến" chỉ hiện khi bật cờ xem trước và luôn gắn nhãn.
 */
export default function FooterCertifications() {
  const { lang } = useI18n();
  const items = getVisibleCertifications(showCertificationPreview);

  if (items.length === 0) return null;

  const title = lang === "vi" ? "Chứng nhận & giải thưởng" : "Certifications & awards";
  const plannedLabel = lang === "vi" ? "Dự kiến" : "Planned";
  const previewNote =
    lang === "vi"
      ? "Bản xem trước nội bộ: các mục “Dự kiến” chưa phải chứng nhận đã đạt."
      : "Internal preview: “Planned” items are not certifications already obtained.";

  return (
    <div className="mb-10 border-t border-border-soft pt-10">
      <h3 className="mb-2 font-semibold tracking-tight text-text-primary">{title}</h3>
      {showCertificationPreview && <p className="mb-4 text-xs font-medium text-text-muted">{previewNote}</p>}
      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <li key={item.id} className="rounded-xl border border-border-soft bg-surface-base p-4">
            <div className="flex items-start justify-between gap-2">
              <p className="text-sm font-semibold leading-snug text-text-primary">{item.name[lang]}</p>
              {item.status === "planned" && (
                <span className="shrink-0 rounded-full bg-brand-soft px-2 py-0.5 text-[11px] font-semibold text-brand">
                  {plannedLabel}
                </span>
              )}
            </div>
            <p className="mt-1 text-xs text-text-muted">{item.issuer[lang]}</p>
            {item.status === "held" && item.reference && (
              <p className="mt-1 text-xs text-text-muted">{item.reference}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
