import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Liên hệ SunPrime Consulting',
  description:
    'Kết nối với SunPrime Consulting qua Facebook, Instagram, TikTok, Zalo, WhatsApp, Telegram và Email.',
};

const officeAddress =
  'Tầng 6, Toà nhà dầu khí, Số 2 đường 30-4, Phường Hoà Cường, TP Đà Nẵng, Việt Nam';
const googleMapsUrl =
  'https://www.google.com/maps/search/?api=1&query=Tang+6,+Toa+nha+dau+khi,+So+2+duong+30-4,+Phuong+Hoa+Cuong,+TP+Da+Nang,+Viet+Nam';
const googleMapsEmbedUrl =
  'https://www.google.com/maps?q=Tang+6,+Toa+nha+dau+khi,+So+2+duong+30-4,+Phuong+Hoa+Cuong,+TP+Da+Nang,+Viet+Nam&output=embed';

const contactChannels = [
  {
    id: 'facebook',
    name: 'Facebook',
    note: 'Theo dõi tin tức và nhắn tin trực tiếp với đội ngũ SunPrime.',
    href: 'https://facebook.com',
    icon: 'simple-icons:facebook',
    actionLabel: 'Mở Facebook',
    tint: 'from-[#1877F2]/10 via-transparent to-transparent',
    iconColor: 'text-[#1877F2]',
    iconSurface: 'bg-[#1877F2]/10 border-[#1877F2]/20',
  },
  {
    id: 'instagram',
    name: 'Instagram',
    note: 'Xem hoạt động mới nhất, hình ảnh dự án và nội dung chuyên môn.',
    href: 'https://instagram.com',
    icon: 'simple-icons:instagram',
    actionLabel: 'Mở Instagram',
    tint: 'from-[#E4405F]/10 via-transparent to-transparent',
    iconColor: 'text-[#E4405F]',
    iconSurface: 'bg-[#E4405F]/10 border-[#E4405F]/20',
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    note: 'Theo dõi video ngắn về kế toán, pháp lý và vận hành doanh nghiệp.',
    href: 'https://www.tiktok.com',
    icon: 'simple-icons:tiktok',
    actionLabel: 'Mở TikTok',
    tint: 'from-[#111111]/10 via-transparent to-transparent',
    iconColor: 'text-[#111111]',
    iconSurface: 'bg-[#111111]/10 border-[#111111]/20',
  },
  {
    id: 'zalo',
    name: 'Zalo',
    note: 'Trao đổi nhanh với tư vấn viên qua Zalo.',
    href: 'https://zalo.me/0938168168',
    icon: 'simple-icons:zalo',
    actionLabel: 'Chat qua Zalo',
    tint: 'from-[#0068FF]/10 via-transparent to-transparent',
    iconColor: 'text-[#0068FF]',
    iconSurface: 'bg-[#0068FF]/10 border-[#0068FF]/20',
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    note: 'Nhắn trực tiếp để nhận phản hồi nhanh từ đội ngũ hỗ trợ.',
    href: 'https://wa.me/84938168168',
    icon: 'simple-icons:whatsapp',
    actionLabel: 'Chat WhatsApp',
    tint: 'from-[#25D366]/10 via-transparent to-transparent',
    iconColor: 'text-[#25D366]',
    iconSurface: 'bg-[#25D366]/10 border-[#25D366]/20',
  },
  {
    id: 'telegram',
    name: 'Telegram',
    note: 'Kênh liên hệ qua Telegram dành cho trao đổi công việc.',
    href: 'https://t.me',
    icon: 'simple-icons:telegram',
    actionLabel: 'Mở Telegram',
    tint: 'from-[#26A5E4]/10 via-transparent to-transparent',
    iconColor: 'text-[#26A5E4]',
    iconSurface: 'bg-[#26A5E4]/10 border-[#26A5E4]/20',
  },
  {
    id: 'email',
    name: 'Email',
    note: 'Gửi thông tin chi tiết qua email để nhận tư vấn đầy đủ.',
    href: 'mailto:hello@sunprime.consulting',
    icon: 'simple-icons:gmail',
    actionLabel: 'Gửi Email',
    tint: 'from-[#EA4335]/10 via-transparent to-transparent',
    iconColor: 'text-[#EA4335]',
    iconSurface: 'bg-[#EA4335]/10 border-[#EA4335]/20',
  },
] as const;

const highlightedChannels = [
  {
    id: 'facebook',
    name: 'Facebook',
    note: 'Tin tức mới nhất, case study và cập nhật hoạt động đội ngũ.',
    href: 'https://facebook.com',
    icon: 'simple-icons:facebook',
    actionLabel: 'Theo dõi Facebook',
    accent: 'from-process-1/15 via-transparent to-transparent',
    iconColor: 'text-[#1877F2]',
  },
  {
    id: 'instagram',
    name: 'Instagram',
    note: 'Nội dung hình ảnh, văn hoá doanh nghiệp và hoạt động hậu trường.',
    href: 'https://instagram.com',
    icon: 'simple-icons:instagram',
    actionLabel: 'Theo dõi Instagram',
    accent: 'from-process-2/15 via-transparent to-transparent',
    iconColor: 'text-[#E4405F]',
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    note: 'Video ngắn chia sẻ kinh nghiệm thực chiến về kế toán và pháp lý.',
    href: 'https://www.tiktok.com',
    icon: 'simple-icons:tiktok',
    actionLabel: 'Theo dõi TikTok',
    accent: 'from-process-3/15 via-transparent to-transparent',
    iconColor: 'text-[#111111]',
  },
] as const;

export default function ContactPage() {
  return (
    <div className="space-y-12 lg:space-y-16">
      <section className="relative overflow-hidden rounded-[40px] border border-neutral-200 bg-white/95 px-6 py-10 shadow-xl shadow-neutral-200/50 lg:px-10 lg:py-12">
        <div className="pointer-events-none absolute -top-24 -right-20 h-60 w-60 rounded-full bg-indigo-100/60 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-emerald-100/70 blur-3xl" />

        <div className="relative grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.45em] text-neutral-400">Contact SunPrime</p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-tight text-neutral-900 lg:text-6xl">
              Liên hệ nhanh, đồng hành thật
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-neutral-500 lg:text-lg">
              SunPrime luôn sẵn sàng hỗ trợ doanh nghiệp qua nhiều kênh: Facebook, Instagram, TikTok, Zalo,
              WhatsApp, Telegram và Email. Chọn kênh phù hợp để nhận phản hồi nhanh từ đội ngũ chuyên môn.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center rounded-full bg-neutral-900 px-5 py-3 text-sm font-medium text-neutral-50 transition hover:bg-neutral-800"
              >
                Xem địa chỉ trên Google Maps
                <iconify-icon icon="solar:map-point-wave-bold-duotone" width={16} className="ml-2" />
              </a>
              <a
                href="mailto:hello@sunprime.consulting"
                className="inline-flex items-center rounded-full border border-neutral-300 px-5 py-3 text-sm font-medium text-neutral-900 transition hover:border-neutral-900"
              >
                Gửi email ngay
                <iconify-icon icon="solar:letter-linear" width={16} className="ml-2" />
              </a>
            </div>
          </div>

          <div className="rounded-3xl border border-neutral-200 bg-white/85 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-neutral-400">Thông tin văn phòng</p>
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
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-neutral-400">Danh bạ liên hệ</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-neutral-900">Chọn kênh bạn muốn kết nối</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {contactChannels.map((channel) => (
            <a
              key={channel.id}
              href={channel.href}
              target={channel.href.startsWith('mailto:') ? undefined : '_blank'}
              rel={channel.href.startsWith('mailto:') ? undefined : 'noreferrer'}
              className="group relative overflow-hidden rounded-3xl border border-neutral-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-neutral-300 hover:shadow-[0_14px_34px_-18px_rgba(0,0,0,0.45)]"
            >
              <div className={`pointer-events-none absolute inset-0 bg-linear-to-br ${channel.tint}`} />
              <div className="pointer-events-none absolute -right-10 -top-12 h-32 w-32 rounded-full bg-white opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />
              <div className="flex items-start justify-between gap-4">
                <span className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl border ${channel.iconSurface} ${channel.iconColor}`}>
                  <iconify-icon icon={channel.icon} width={20} />
                </span>
                <span className="inline-flex items-center rounded-full border border-neutral-300 bg-white px-3 py-1 text-xs font-medium text-neutral-600 transition group-hover:border-neutral-900 group-hover:text-neutral-900">
                  {channel.actionLabel}
                </span>
              </div>
              <h2 className="mt-4 text-2xl font-semibold tracking-tight text-neutral-900">{channel.name}</h2>
              <p className="mt-2 text-sm leading-relaxed text-neutral-500">{channel.note}</p>
              <div className="mt-4 inline-flex items-center text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400 group-hover:text-neutral-600">
                Kết nối ngay
                <iconify-icon icon="solar:arrow-right-linear" width={14} className="ml-1" />
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="rounded-[36px] border border-neutral-200 bg-linear-to-br from-white via-[#FFFDF8] to-[#F7FAFF] p-4 md:p-6 lg:p-8">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-neutral-400">Vị trí văn phòng</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-neutral-900">Bản đồ chi tiết</h2>
            <p className="mt-2 text-sm leading-relaxed text-neutral-500">{officeAddress}</p>
          </div>
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center rounded-full border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-900 transition hover:border-neutral-900"
          >
            Mở trên Google Maps
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
            title="Bản đồ văn phòng SunPrime Consulting"
          />
          <div className="flex items-center justify-between border-t border-neutral-200 bg-white px-4 py-3 text-sm">
            <span className="font-medium text-neutral-700">Nhấn để mở Google Maps và chỉ đường chi tiết</span>
            <span className="inline-flex items-center text-neutral-500 group-hover:text-neutral-900">
              Xem đường đi
              <iconify-icon icon="solar:arrow-right-linear" width={16} className="ml-1" />
            </span>
          </div>
        </a>
      </section>

      <section className="rounded-[36px] border border-neutral-200 bg-white/90 p-4 md:p-6 lg:p-8">
        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-neutral-400">Social Channels</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-neutral-900">
            Theo dõi SunPrime trên mạng xã hội
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-neutral-500">
            Thiết kế theo phong cách quy trình làm việc: 3 ô nổi bật tương ứng Facebook, Instagram và TikTok.
            Mỗi ô dùng màu accent đồng bộ theo các bước đầu của section quy trình.
          </p>
        </div>

        <div className="grid grid-cols-1 z-10 relative items-stretch gap-3 lg:grid-cols-12 sm:gap-3">
          {highlightedChannels.map((channel, index) => (
            <a
              key={channel.id}
              href={channel.href}
              target="_blank"
              rel="noreferrer"
              className={`lg:col-span-4 hover-lift flex flex-col bg-white h-full border-neutral-200 border rounded-3xl p-6 relative shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden ${index === 1 ? 'lg:translate-y-6' : index === 2 ? 'lg:-translate-y-4' : ''}`}
            >
              <div className={`pointer-events-none absolute inset-0 rounded-3xl bg-linear-to-br ${channel.accent}`} />
              <div className="relative h-40 rounded-2xl bg-neutral-100 border border-neutral-200 overflow-hidden">
                <span className="absolute top-3 left-3 z-10 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-200 bg-white/95 text-xs text-neutral-800 tracking-tight font-geist shadow-sm">
                  <iconify-icon icon={channel.icon} width={14} className={channel.iconColor} />
                  {channel.name}
                </span>
                <div className="absolute inset-0 bg-linear-to-t from-neutral-900/10 to-transparent" />
                <div className="absolute right-4 bottom-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-neutral-200 bg-white shadow-sm">
                  <iconify-icon icon={channel.icon} width={20} className={channel.iconColor} />
                </div>
              </div>

              <h3 className="text-2xl text-neutral-900 tracking-tighter mt-6 font-geist">{channel.actionLabel}</h3>
              <p className="text-sm text-neutral-600 tracking-tight mt-2 font-geist leading-relaxed">
                {channel.note}
              </p>
              <span className="mt-5 inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-white px-4 py-2 text-xs font-medium text-neutral-700 w-fit">
                Truy cập ngay
                <iconify-icon icon="solar:arrow-right-linear" width={14} />
              </span>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
