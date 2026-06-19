"use client";

import { useI18n } from "@/components/i18n-provider";
import { messages } from "@/lib/i18n/messages";

const googleMapsUrl =
  "https://www.google.com/maps/search/?api=1&query=Tang+6,+Toa+nha+dau+khi,+So+2+duong+30-4,+Phuong+Hoa+Cuong,+TP+Da+Nang,+Viet+Nam";
const googleMapsEmbedUrl =
  "https://www.google.com/maps?q=Tang+6,+Toa+nha+dau+khi,+So+2+duong+30-4,+Phuong+Hoa+Cuong,+TP+Da+Nang,+Viet+Nam&output=embed";

type Channel = {
  id: string;
  name: string;
  noteVi: string;
  noteEn: string;
  href: string;
  icon: string;
  actionLabelVi: string;
  actionLabelEn: string;
  tint: string;
  iconColor: string;
  iconSurface: string;
};

const contactChannels: Channel[] = [
  {
    id: "facebook",
    name: "Facebook",
    noteVi: "Theo dõi tin tức và nhắn tin trực tiếp với đội ngũ SunPrime.",
    noteEn: "Follow our updates and message the SunPrime team directly.",
    href: "https://facebook.com",
    icon: "simple-icons:facebook",
    actionLabelVi: "Mở Facebook",
    actionLabelEn: "Open Facebook",
    tint: "from-[#1877F2]/10 via-transparent to-transparent",
    iconColor: "text-[#1877F2]",
    iconSurface: "bg-[#1877F2]/10 border-[#1877F2]/20",
  },
  {
    id: "instagram",
    name: "Instagram",
    noteVi: "Xem hoạt động mới nhất, hình ảnh dự án và nội dung chuyên môn.",
    noteEn: "See our latest activities, project photos and expert content.",
    href: "https://instagram.com",
    icon: "simple-icons:instagram",
    actionLabelVi: "Mở Instagram",
    actionLabelEn: "Open Instagram",
    tint: "from-[#E4405F]/10 via-transparent to-transparent",
    iconColor: "text-[#E4405F]",
    iconSurface: "bg-[#E4405F]/10 border-[#E4405F]/20",
  },
  {
    id: "tiktok",
    name: "TikTok",
    noteVi: "Theo dõi video ngắn về kế toán, pháp lý và vận hành doanh nghiệp.",
    noteEn: "Watch short videos on accounting, legal and business operations.",
    href: "https://www.tiktok.com",
    icon: "simple-icons:tiktok",
    actionLabelVi: "Mở TikTok",
    actionLabelEn: "Open TikTok",
    tint: "from-[#111111]/10 via-transparent to-transparent",
    iconColor: "text-[#111111]",
    iconSurface: "bg-[#111111]/10 border-[#111111]/20",
  },
  {
    id: "zalo",
    name: "Zalo",
    noteVi: "Trao đổi nhanh với tư vấn viên qua Zalo.",
    noteEn: "Chat quickly with a consultant via Zalo.",
    href: "https://zalo.me/0938168168",
    icon: "simple-icons:zalo",
    actionLabelVi: "Chat qua Zalo",
    actionLabelEn: "Chat on Zalo",
    tint: "from-[#0068FF]/10 via-transparent to-transparent",
    iconColor: "text-[#0068FF]",
    iconSurface: "bg-[#0068FF]/10 border-[#0068FF]/20",
  },
  {
    id: "whatsapp",
    name: "WhatsApp",
    noteVi: "Nhắn trực tiếp để nhận phản hồi nhanh từ đội ngũ hỗ trợ.",
    noteEn: "Message us directly for a fast response from our support team.",
    href: "https://wa.me/84938168168",
    icon: "simple-icons:whatsapp",
    actionLabelVi: "Chat WhatsApp",
    actionLabelEn: "Chat on WhatsApp",
    tint: "from-[#25D366]/10 via-transparent to-transparent",
    iconColor: "text-[#25D366]",
    iconSurface: "bg-[#25D366]/10 border-[#25D366]/20",
  },
  {
    id: "telegram",
    name: "Telegram",
    noteVi: "Kênh liên hệ qua Telegram dành cho trao đổi công việc.",
    noteEn: "A Telegram channel for work-related communication.",
    href: "https://t.me",
    icon: "simple-icons:telegram",
    actionLabelVi: "Mở Telegram",
    actionLabelEn: "Open Telegram",
    tint: "from-[#26A5E4]/10 via-transparent to-transparent",
    iconColor: "text-[#26A5E4]",
    iconSurface: "bg-[#26A5E4]/10 border-[#26A5E4]/20",
  },
  {
    id: "email",
    name: "Email",
    noteVi: "Gửi thông tin chi tiết qua email để nhận tư vấn đầy đủ.",
    noteEn: "Send detailed information by email for a full consultation.",
    href: "mailto:hello@sunprime.consulting",
    icon: "simple-icons:gmail",
    actionLabelVi: "Gửi Email",
    actionLabelEn: "Send Email",
    tint: "from-[#EA4335]/10 via-transparent to-transparent",
    iconColor: "text-[#EA4335]",
    iconSurface: "bg-[#EA4335]/10 border-[#EA4335]/20",
  },
];

const highlightedChannels = [
  {
    id: "facebook",
    noteVi: "Tin tức mới nhất, case study và cập nhật hoạt động đội ngũ.",
    noteEn: "Latest news, case studies and team activity updates.",
    href: "https://facebook.com",
    icon: "simple-icons:facebook",
    actionLabelVi: "Theo dõi Facebook",
    actionLabelEn: "Follow Facebook",
    accent: "from-process-1/15 via-transparent to-transparent",
    iconColor: "text-[#1877F2]",
  },
  {
    id: "instagram",
    noteVi: "Nội dung hình ảnh, văn hoá doanh nghiệp và hoạt động hậu trường.",
    noteEn: "Visual content, company culture and behind-the-scenes activities.",
    href: "https://instagram.com",
    icon: "simple-icons:instagram",
    actionLabelVi: "Theo dõi Instagram",
    actionLabelEn: "Follow Instagram",
    accent: "from-process-2/15 via-transparent to-transparent",
    iconColor: "text-[#E4405F]",
  },
  {
    id: "tiktok",
    noteVi: "Video ngắn chia sẻ kinh nghiệm thực chiến về kế toán và pháp lý.",
    noteEn: "Short videos sharing hands-on experience in accounting and legal.",
    href: "https://www.tiktok.com",
    icon: "simple-icons:tiktok",
    actionLabelVi: "Theo dõi TikTok",
    actionLabelEn: "Follow TikTok",
    accent: "from-process-3/15 via-transparent to-transparent",
    iconColor: "text-[#111111]",
  },
];

export default function ContactContent() {
  const { lang } = useI18n();
  const t = messages[lang].contact;
  const officeAddress =
    lang === "vi"
      ? "Tầng 6, Toà nhà dầu khí, Số 2 đường 30-4, Phường Hoà Cường, TP Đà Nẵng, Việt Nam"
      : "6th Floor, Petroleum Building, 2 30-4 Street, Hoa Cuong Ward, Da Nang, Vietnam";

  return (
    <div className="space-y-12 lg:space-y-16">
      <section className="relative overflow-hidden rounded-[40px] border border-neutral-200 bg-white/95 px-6 py-10 shadow-soft-lg lg:px-10 lg:py-12">
        <div className="pointer-events-none absolute -top-24 -right-20 h-60 w-60 rounded-full bg-brand-soft/50 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-accent-soft/80 blur-3xl" />

        <div className="relative grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.45em] text-neutral-400">{t.heroEyebrow}</p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-tight text-neutral-900 lg:text-6xl">
              {t.heroTitle}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-neutral-500 lg:text-lg">{t.heroDesc}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center rounded-full bg-neutral-900 px-5 py-3 text-sm font-medium text-neutral-50 transition hover:bg-neutral-800"
              >
                {t.mapBtn}
                <iconify-icon icon="solar:map-point-wave-bold-duotone" width={16} className="ml-2" />
              </a>
              <a
                href="mailto:hello@sunprime.consulting"
                className="inline-flex items-center rounded-full border border-neutral-300 px-5 py-3 text-sm font-medium text-neutral-900 transition hover:border-neutral-900"
              >
                {t.emailBtn}
                <iconify-icon icon="solar:letter-linear" width={16} className="ml-2" />
              </a>
            </div>
          </div>

          <div className="rounded-3xl border border-neutral-200 bg-white/85 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-neutral-400">{t.officeInfo}</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-neutral-900">SunPrime Consulting</h2>
            <p className="mt-3 text-sm leading-relaxed text-neutral-600">{officeAddress}</p>
            <div className="mt-5 space-y-3">
              <a
                href="tel:+84938168168"
                className="flex items-center justify-between rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm font-medium text-neutral-800 transition hover:border-neutral-300"
              >
                0938 168 168
                <iconify-icon icon="solar:phone-calling-linear" width={16} />
              </a>
              <a
                href="mailto:hello@sunprime.consulting"
                className="flex items-center justify-between rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm font-medium text-neutral-800 transition hover:border-neutral-300"
              >
                hello@sunprime.consulting
                <iconify-icon icon="solar:arrow-right-up-linear" width={16} />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-[36px] border border-neutral-200 bg-linear-to-br from-white via-[#F8FAFF] to-[#FFF9F5] p-4 md:p-6 lg:p-8">
        <div className="mb-4 border-b border-neutral-200 pb-4 lg:mb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-neutral-400">{t.directoryEyebrow}</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-neutral-900">{t.directoryTitle}</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {contactChannels.map((channel) => (
            <a
              key={channel.id}
              href={channel.href}
              target={channel.href.startsWith("mailto:") ? undefined : "_blank"}
              rel={channel.href.startsWith("mailto:") ? undefined : "noreferrer"}
              className="group relative overflow-hidden rounded-3xl border border-neutral-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-neutral-300 hover:shadow-soft-lg"
            >
              <div className={`pointer-events-none absolute inset-0 bg-linear-to-br ${channel.tint}`} />
              <div className="pointer-events-none absolute -right-10 -top-12 h-32 w-32 rounded-full bg-white opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />
              <div className="flex items-start justify-between gap-4">
                <span className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl border ${channel.iconSurface} ${channel.iconColor}`}>
                  <iconify-icon icon={channel.icon} width={20} />
                </span>
                <span className="inline-flex items-center rounded-full border border-neutral-300 bg-white px-3 py-1 text-xs font-medium text-neutral-600 transition group-hover:border-neutral-900 group-hover:text-neutral-900">
                  {lang === "vi" ? channel.actionLabelVi : channel.actionLabelEn}
                </span>
              </div>
              <h2 className="mt-4 text-2xl font-semibold tracking-tight text-neutral-900">{channel.name}</h2>
              <p className="mt-2 text-sm leading-relaxed text-neutral-500">
                {lang === "vi" ? channel.noteVi : channel.noteEn}
              </p>
              <div className="mt-4 inline-flex items-center text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400 group-hover:text-neutral-600">
                {t.connectNow}
                <iconify-icon icon="solar:arrow-right-linear" width={14} className="ml-1" />
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="rounded-[36px] border border-neutral-200 bg-linear-to-br from-white via-[#FFFDF8] to-[#F7FAFF] p-4 md:p-6 lg:p-8">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-neutral-400">{t.locationEyebrow}</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-neutral-900">{t.mapTitle}</h2>
            <p className="mt-2 text-sm leading-relaxed text-neutral-500">{officeAddress}</p>
          </div>
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center rounded-full border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-900 transition hover:border-neutral-900"
          >
            {t.openMaps}
            <iconify-icon icon="solar:arrow-right-up-linear" width={16} className="ml-1.5" />
          </a>
        </div>

        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noreferrer"
          className="group block overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-100"
        >
          <iframe
            src={googleMapsEmbedUrl}
            className="h-[420px] w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="SunPrime Consulting office map"
          />
          <div className="flex items-center justify-between border-t border-neutral-200 bg-white px-4 py-3 text-sm">
            <span className="font-medium text-neutral-700">{t.mapHint}</span>
            <span className="inline-flex items-center text-neutral-500 group-hover:text-neutral-900">
              {t.viewDirections}
              <iconify-icon icon="solar:arrow-right-linear" width={16} className="ml-1" />
            </span>
          </div>
        </a>
      </section>

      <section className="rounded-[36px] border border-neutral-200 bg-white/90 p-4 md:p-6 lg:p-8">
        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-neutral-400">{t.socialEyebrow}</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-neutral-900">{t.socialTitle}</h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-neutral-500">{t.socialDesc}</p>
        </div>

        <div className="grid grid-cols-1 z-10 relative items-stretch gap-3 lg:grid-cols-12 sm:gap-3">
          {highlightedChannels.map((channel, index) => (
            <a
              key={channel.id}
              href={channel.href}
              target="_blank"
              rel="noreferrer"
              className={`lg:col-span-4 hover-lift flex flex-col bg-white h-full border-neutral-200 border rounded-3xl p-6 relative shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden ${index === 1 ? "lg:translate-y-6" : index === 2 ? "lg:-translate-y-4" : ""}`}
            >
              <div className={`pointer-events-none absolute inset-0 rounded-3xl bg-linear-to-br ${channel.accent}`} />
              <div className="relative h-40 rounded-2xl bg-neutral-100 border border-neutral-200 overflow-hidden">
                <span className="absolute top-3 left-3 z-10 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-200 bg-white/95 text-xs text-neutral-800 tracking-tight font-geist shadow-sm">
                  <iconify-icon icon={channel.icon} width={14} className={channel.iconColor} />
                  {lang === "vi" ? channel.actionLabelVi : channel.actionLabelEn}
                </span>
                <div className="absolute inset-0 bg-linear-to-t from-neutral-900/10 to-transparent" />
                <div className="absolute right-4 bottom-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-neutral-200 bg-white shadow-sm">
                  <iconify-icon icon={channel.icon} width={20} className={channel.iconColor} />
                </div>
              </div>

              <h3 className="text-2xl text-neutral-900 tracking-tighter mt-6 font-geist">
                {lang === "vi" ? channel.actionLabelVi : channel.actionLabelEn}
              </h3>
              <p className="text-sm text-neutral-600 tracking-tight mt-2 font-geist leading-relaxed">
                {lang === "vi" ? channel.noteVi : channel.noteEn}
              </p>
              <span className="mt-5 inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-white px-4 py-2 text-xs font-medium text-neutral-700 w-fit">
                {t.visitNow}
                <iconify-icon icon="solar:arrow-right-linear" width={14} />
              </span>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
