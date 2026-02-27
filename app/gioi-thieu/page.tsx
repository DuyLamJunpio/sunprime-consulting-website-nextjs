import PartnerShowcaseSection from "@/components/partner-showcase-section";
import Link from "next/link";

export default function AboutPage() {
  const mottos = ["Thực chiến", "Đúng luật", "Vận hành bền vững"];
  const coreValues = [
    {
      title: "Thực chiến & hiệu quả thực tế",
      description: "Giải pháp bám sát tình huống vận hành thật, triển khai được ngay và tạo kết quả đo lường được.",
      icon: "target",
    },
    {
      title: "Tuân thủ pháp lý - chuẩn mực kế toán",
      description: "Mọi quy trình và hồ sơ đều đảm bảo đúng luật, đúng hạn và đúng chuẩn số liệu theo quy định hiện hành.",
      icon: "shield",
    },
    {
      title: "Tư duy hệ thống & dài hạn",
      description: "Xây nền tảng vận hành bền vững để doanh nghiệp kiểm soát rủi ro tốt hơn và tăng trưởng lâu dài.",
      icon: "layers",
    },
    {
      title: "Minh bạch - chính trực",
      description: "Thông tin rõ ràng, báo cáo nhất quán, cam kết trách nhiệm trong toàn bộ quá trình đồng hành.",
      icon: "eye",
    },
    {
      title: "Đồng hành cùng doanh nghiệp",
      description: "Không dừng ở tư vấn, SunPrime theo sát khi triển khai và hỗ trợ xử lý phát sinh trong thực tế.",
      icon: "handshake",
    },
  ];

  const renderValueIcon = (icon: string) => {
    switch (icon) {
      case "target":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
            <circle cx="12" cy="12" r="8" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="12" cy="12" r="1.5" />
          </svg>
        );
      case "shield":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <path d="m9 12 2 2 4-4" />
          </svg>
        );
      case "layers":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
            <path d="m12 3 9 5-9 5-9-5 9-5z" />
            <path d="m3 12 9 5 9-5" />
            <path d="m3 16 9 5 9-5" />
          </svg>
        );
      case "eye":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
            <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
            <path d="M7 11h10" />
            <path d="M12 7v8" />
            <path d="M5 3h14a2 2 0 0 1 2 2v14l-4-2-5 2-5-2-4 2V5a2 2 0 0 1 2-2z" />
          </svg>
        );
    }
  };

  return (
    <main className="bg-surface-base">
      <section className="relative overflow-hidden bg-linear-to-br from-brand via-brand-strong to-brand-ink py-24 text-text-inverse">
        <div className="absolute inset-0 opacity-20">
          <div className="h-full w-full bg-[radial-gradient(circle_at_top_right,#a5b4fc_0,transparent_55%),radial-gradient(circle_at_bottom_left,#818cf8_0,transparent_45%)]" />
        </div>
        <div className="pointer-events-none absolute inset-0 opacity-[0.16] [background-image:linear-gradient(rgba(255,255,255,0.22)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.22)_1px,transparent_1px)] [background-size:36px_36px]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <span className="mb-4 inline-flex rounded-full border border-white/35 bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
            Giới thiệu SunPrime
          </span>
          <h1 className="max-w-4xl text-4xl font-semibold leading-tight tracking-tight lg:text-5xl">Châm ngôn</h1>
          <div className="mt-6 flex flex-wrap gap-3">
            {mottos.map((motto) => (
              <span
                key={motto}
                className="inline-flex items-center rounded-full border border-white/40 bg-white/15 px-4 py-2 text-sm font-semibold tracking-wide text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/25"
              >
                {motto}
              </span>
            ))}
          </div>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-indigo-100">
            SunPrime không chỉ tư vấn trên giấy. Chúng tôi đi cùng doanh nghiệp trong từng bước triển khai để kết
            quả được tạo ra trong thực tế vận hành mỗi ngày.
          </p>
          <div className="mt-8">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-lg bg-surface-base px-6 py-3 text-sm font-semibold text-brand transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-soft"
            >
              Tìm hiểu dịch vụ của chúng tôi
              <span aria-hidden="true">-&gt;</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-surface-base py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h2 className="text-3xl font-semibold tracking-tight text-text-primary lg:text-4xl">Về chúng tôi</h2>
            <p className="mt-6 text-lg leading-relaxed text-text-secondary">
              Sun Prime Consulting là đơn vị tư vấn doanh nghiệp chuyên về thành lập, pháp lý, kế toán và vận hành.
              Chúng tôi đồng hành cùng doanh nghiệp xây dựng nền tảng chuẩn luật - rõ số - vững hệ thống, đặc biệt
              trong lĩnh vực nhà hàng - khách sạn.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-surface-base py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-semibold tracking-tight text-text-primary lg:text-4xl">Tầm nhìn và sứ mệnh</h2>
          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <article className="rounded-2xl border border-indigo-100 bg-surface-card p-7 shadow-sm">
              <h3 className="text-xl font-semibold text-brand">Tầm nhìn</h3>
              <p className="mt-4 text-base leading-relaxed text-text-secondary">
                Trở thành đơn vị tư vấn vận hành doanh nghiệp thực chiến, đáng tin cậy hàng đầu cho ngành nhà hàng -
                khách sạn.
              </p>
            </article>
            <article className="rounded-2xl border border-indigo-100 bg-surface-card p-7 shadow-sm">
              <h3 className="text-xl font-semibold text-brand">Sứ mệnh</h3>
              <p className="mt-4 text-base leading-relaxed text-text-secondary">
                Giúp doanh nghiệp vận hành minh bạch, kiểm soát rủi ro và tăng trưởng bền vững thông qua pháp lý, kế
                toán và hệ thống quản trị hiệu quả.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="bg-linear-to-br from-section-grad-start via-section-grad-mid to-section-grad-end py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-semibold tracking-tight text-text-primary lg:text-4xl">Giá trị cốt lõi</h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-text-secondary">
            Hệ giá trị của SunPrime được thiết kế liên kết như một chuỗi vận hành: từ thực chiến, tuân thủ đến phát
            triển dài hạn và đồng hành cùng doanh nghiệp.
          </p>
          <div className="relative mt-10">
            <div className="absolute left-0 right-0 top-10 hidden h-[2px] bg-linear-to-r from-transparent via-brand-ring to-transparent lg:block" />
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
              {coreValues.map((value) => (
                <article
                  key={value.title}
                  className="group relative rounded-2xl border border-slate-200 bg-surface-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-ring hover:shadow-[0_14px_28px_rgba(79,70,229,0.16)]"
                >
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-soft text-brand transition-all duration-300 group-hover:scale-110 group-hover:bg-brand group-hover:text-text-inverse">
                    {renderValueIcon(value.icon)}
                  </div>
                  <h3 className="text-base font-semibold leading-snug text-text-primary">{value.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-text-secondary">{value.description}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-10">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-brand px-6 py-3 text-sm font-semibold text-text-inverse transition-all duration-200 hover:bg-brand-strong"
            >
              Liên hệ đội ngũ SunPrime
              <span aria-hidden="true">-&gt;</span>
            </Link>
          </div>
        </div>
      </section>

      <PartnerShowcaseSection showHero={false} />
    </main>
  );
}
