"use client";

import { useI18n } from "@/components/i18n-provider";
import { messages } from "@/lib/i18n/messages";

const EMAIL = "giangtran.sunprime@gmail.com";
const PHONE_DISPLAY = "0914 699 877";
const PHONE_TEL = "+84914699877";

const googleMapsUrl =
  "https://www.google.com/maps/search/?api=1&query=Tang+6,+Toa+nha+dau+khi,+So+2+duong+30-4,+Phuong+Hoa+Cuong,+TP+Da+Nang,+Viet+Nam";
const googleMapsEmbedUrl =
  "https://www.google.com/maps?q=Tang+6,+Toa+nha+dau+khi,+So+2+duong+30-4,+Phuong+Hoa+Cuong,+TP+Da+Nang,+Viet+Nam&output=embed";

const FACEBOOK = "https://www.facebook.com/profile.php?id=61586874073145&locale=vi_VN";
const INSTAGRAM = "https://www.instagram.com/sunprime.danang/";
const TIKTOK = "https://www.tiktok.com/@sun.prime0";

type Channel = {
  id: string;
  name: string;
  noteVi: string;
  noteEn: string;
  href: string;
  icon: string;
  iconColor: string;
};

const channels: Channel[] = [
  {
    id: "facebook",
    name: "Facebook",
    noteVi: "Theo dõi tin tức và nhắn tin trực tiếp với đội ngũ SunPrime.",
    noteEn: "Follow our updates and message the SunPrime team directly.",
    href: FACEBOOK,
    icon: "simple-icons:facebook",
    iconColor: "text-[#1877F2]",
  },
  {
    id: "instagram",
    name: "Instagram",
    noteVi: "Xem hoạt động mới nhất, hình ảnh dự án và nội dung chuyên môn.",
    noteEn: "See our latest activities, project photos and expert content.",
    href: INSTAGRAM,
    icon: "simple-icons:instagram",
    iconColor: "text-[#E4405F]",
  },
  {
    id: "tiktok",
    name: "TikTok",
    noteVi: "Video ngắn về kế toán, pháp lý và vận hành doanh nghiệp.",
    noteEn: "Short videos on accounting, legal and business operations.",
    href: TIKTOK,
    icon: "simple-icons:tiktok",
    iconColor: "text-text-primary",
  },
  {
    id: "zalo",
    name: "Zalo",
    noteVi: "Trao đổi nhanh với tư vấn viên qua Zalo.",
    noteEn: "Chat quickly with a consultant via Zalo.",
    href: "https://zalo.me/0914699877",
    icon: "simple-icons:zalo",
    iconColor: "text-[#0068FF]",
  },
  {
    id: "whatsapp",
    name: "WhatsApp",
    noteVi: "Nhắn trực tiếp để nhận phản hồi nhanh từ đội ngũ hỗ trợ.",
    noteEn: "Message us directly for a fast response from our support team.",
    href: "https://wa.me/84914699877",
    icon: "simple-icons:whatsapp",
    iconColor: "text-[#25D366]",
  },
  {
    id: "email",
    name: "Email",
    noteVi: "Gửi thông tin chi tiết qua email để nhận tư vấn đầy đủ.",
    noteEn: "Send detailed information by email for a full consultation.",
    href: `mailto:${EMAIL}`,
    icon: "simple-icons:gmail",
    iconColor: "text-[#EA4335]",
  },
];

const socialHighlights = [
  { id: "facebook", name: "Facebook", href: FACEBOOK, icon: "simple-icons:facebook", iconColor: "text-[#1877F2]" },
  { id: "instagram", name: "Instagram", href: INSTAGRAM, icon: "simple-icons:instagram", iconColor: "text-[#E4405F]" },
  { id: "tiktok", name: "TikTok", href: TIKTOK, icon: "simple-icons:tiktok", iconColor: "text-text-primary" },
];

export default function ContactContent() {
  const { lang } = useI18n();
  const t = messages[lang].contact;
  const vi = lang === "vi";
  const officeAddress = vi
    ? "Tầng 6, Toà nhà dầu khí, Số 2 đường 30-4, Phường Hoà Cường, TP Đà Nẵng, Việt Nam"
    : "6th Floor, Petroleum Building, 2 30-4 Street, Hoa Cuong Ward, Da Nang, Vietnam";

  return (
    <main className="bg-surface-base">
      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden bg-linear-to-br from-brand via-brand-strong to-brand-ink text-text-inverse">
        <div className="absolute inset-0 opacity-20">
          <div className="h-full w-full bg-[radial-gradient(circle_at_top_right,#f0d8c2_0,transparent_55%),radial-gradient(circle_at_bottom_left,#e4c9ae_0,transparent_45%)]" />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.22)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.22)_1px,transparent_1px)] bg-size-[36px_36px] opacity-[0.16]" />

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
          <div className="grid items-center gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-14">
            <div>
              <span className="mb-4 inline-flex rounded-full border border-white/35 bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
                {t.heroEyebrow}
              </span>
              <h1 className="max-w-2xl text-4xl font-semibold leading-tight tracking-tight lg:text-6xl">
                {t.heroTitle}
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/80 lg:text-lg">{t.heroDesc}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-surface-base px-6 py-3 text-sm font-semibold text-brand transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-soft"
                >
                  {t.mapBtn}
                  <iconify-icon icon="solar:map-point-wave-bold-duotone" width={16} />
                </a>
                <a
                  href={`mailto:${EMAIL}`}
                  className="inline-flex items-center gap-2 rounded-lg border border-white/40 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/20"
                >
                  {t.emailBtn}
                  <iconify-icon icon="solar:letter-linear" width={16} />
                </a>
              </div>
            </div>

            {/* Office info glass card */}
            <div className="rounded-3xl border border-white/25 bg-white/10 p-6 backdrop-blur-md">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/70">{t.officeInfo}</p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight">SunPrime Consulting</h2>
              <p className="mt-3 flex items-start gap-2 text-sm leading-relaxed text-white/80">
                <iconify-icon icon="solar:map-point-linear" width={18} className="mt-0.5 shrink-0" />
                {officeAddress}
              </p>
              <div className="mt-5 space-y-3">
                <a
                  href={`tel:${PHONE_TEL}`}
                  className="flex items-center justify-between rounded-2xl border border-white/25 bg-white/10 px-4 py-3 text-sm font-medium text-white transition hover:bg-white/20"
                >
                  <span className="inline-flex items-center gap-2">
                    <iconify-icon icon="solar:phone-calling-linear" width={16} />
                    {PHONE_DISPLAY}
                  </span>
                  <iconify-icon icon="solar:arrow-right-up-linear" width={16} />
                </a>
                <a
                  href={`mailto:${EMAIL}`}
                  className="flex items-center justify-between rounded-2xl border border-white/25 bg-white/10 px-4 py-3 text-sm font-medium text-white transition hover:bg-white/20"
                >
                  <span className="inline-flex items-center gap-2">
                    <iconify-icon icon="solar:letter-linear" width={16} />
                    {EMAIL}
                  </span>
                  <iconify-icon icon="solar:arrow-right-up-linear" width={16} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CHANNELS ===== */}
      <section className="bg-surface-base py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-col gap-3">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-text-muted">{t.directoryEyebrow}</p>
            <h2 className="text-3xl font-semibold tracking-tight text-text-primary lg:text-4xl">{t.directoryTitle}</h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {channels.map((channel) => (
              <a
                key={channel.id}
                href={channel.href}
                target={channel.href.startsWith("mailto:") ? undefined : "_blank"}
                rel={channel.href.startsWith("mailto:") ? undefined : "noreferrer"}
                className="group rounded-3xl border border-border bg-surface-card p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-brand-ring hover:shadow-soft-lg"
              >
                <div className="flex items-start justify-between">
                  <span className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-surface-section ${channel.iconColor}`}>
                    <iconify-icon icon={channel.icon} width={22} />
                  </span>
                  <iconify-icon
                    icon="solar:arrow-right-up-linear"
                    width={18}
                    className="text-text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand"
                  />
                </div>
                <h3 className="mt-4 text-xl font-semibold tracking-tight text-text-primary group-hover:text-brand">
                  {channel.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                  {vi ? channel.noteVi : channel.noteEn}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-brand">
                  {t.connectNow}
                  <iconify-icon icon="solar:arrow-right-linear" width={14} />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ===== MAP ===== */}
      <section className="bg-linear-to-br from-section-grad-start via-section-grad-mid to-section-grad-end py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-text-muted">{t.locationEyebrow}</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-text-primary lg:text-4xl">{t.mapTitle}</h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-text-secondary">{officeAddress}</p>
            </div>
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-brand px-5 py-3 text-sm font-semibold text-white shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-strong"
            >
              {t.openMaps}
              <iconify-icon icon="solar:arrow-right-up-linear" width={16} />
            </a>
          </div>

          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noreferrer"
            className="group block overflow-hidden rounded-3xl border border-border bg-surface-card shadow-soft"
          >
            <iframe
              src={googleMapsEmbedUrl}
              className="h-[420px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="SunPrime Consulting office map"
            />
            <div className="flex items-center justify-between border-t border-border bg-surface-card px-5 py-4 text-sm">
              <span className="font-medium text-text-secondary">{t.mapHint}</span>
              <span className="inline-flex items-center gap-1.5 font-semibold text-brand">
                {t.viewDirections}
                <iconify-icon icon="solar:arrow-right-linear" width={16} />
              </span>
            </div>
          </a>
        </div>
      </section>

      {/* ===== SOCIAL FOLLOW ===== */}
      <section className="bg-surface-base py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-text-muted">{t.socialEyebrow}</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-text-primary lg:text-4xl">{t.socialTitle}</h2>
            <p className="mt-3 text-sm leading-relaxed text-text-secondary">{t.socialDesc}</p>
          </div>
          <div className="grid gap-5 sm:grid-cols-3">
            {socialHighlights.map((channel) => (
              <a
                key={channel.id}
                href={channel.href}
                target="_blank"
                rel="noreferrer"
                className="group relative overflow-hidden rounded-3xl border border-border bg-surface-card p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-brand-ring hover:shadow-soft-lg"
              >
                <div className="pointer-events-none absolute -right-10 -top-12 h-32 w-32 rounded-full bg-brand-soft opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />
                <span className={`relative inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-surface-section ${channel.iconColor}`}>
                  <iconify-icon icon={channel.icon} width={26} />
                </span>
                <h3 className="relative mt-5 text-xl font-semibold tracking-tight text-text-primary group-hover:text-brand">
                  {channel.name}
                </h3>
                <span className="relative mt-4 inline-flex items-center gap-2 rounded-full border border-border bg-surface-base px-4 py-2 text-xs font-semibold text-text-secondary transition group-hover:border-brand-ring group-hover:text-brand">
                  {t.visitNow}
                  <iconify-icon icon="solar:arrow-right-up-linear" width={14} />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
