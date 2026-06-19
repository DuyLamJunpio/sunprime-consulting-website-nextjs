'use client';
import { useI18n } from "@/components/i18n-provider";
import type { NewsPost } from "@/data/news-api";
import { getAllServices, getServiceCategories } from "@/data/services";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

export default function Home() {
  const { lang } = useI18n();
  // --- LOGIC STATES ---
  const featuredServiceCards = [
    ...getAllServices(lang).filter((service) => service.categoryId === "ke-toan").slice(0, 3),
    ...getAllServices(lang).filter((service) => service.categoryId === "thanh-lap").slice(0, 3),
  ];
  const heroServiceCategories = useMemo(
    () =>
      ["ke-toan", "thanh-lap", "nhan-su"]
        .map((categoryId) => getServiceCategories(lang).find((category) => category.id === categoryId))
        .filter((category): category is NonNullable<typeof category> => Boolean(category)),
    [lang]
  );
  const [newsArticles, setNewsArticles] = useState<NewsPost[]>([]);
  useEffect(() => {
    fetch('/api/top-news')
      .then((res) => res.json())
      .then((data) => { if (Array.isArray(data)) setNewsArticles(data); })
      .catch(() => {});
  }, []);
  const [heroUpdateIndex, setHeroUpdateIndex] = useState(0);
  const heroUpdates = lang === "vi"
    ? [
      "Tuần này SunPrime hoàn tất 24 bộ hồ sơ thuế cho khối F&B.",
      "Thêm 12 doanh nghiệp mới ký gói kế toán trọn gói trong tháng.",
      "Cập nhật checklist pháp lý 2026 cho 3 nhóm ngành trọng điểm.",
      "Đội ngũ đã hỗ trợ 37 phiên giải trình cùng cơ quan thuế quý này.",
    ]
    : [
      "This week SunPrime completed 24 tax dossiers for F&B clients.",
      "12 new businesses signed our full accounting package this month.",
      "2026 legal compliance checklist has been updated for 3 key industries.",
      "Our team has supported 37 tax clarification sessions this quarter.",
    ];
  const heroCategoryLabels: Record<string, string> = lang === "vi"
    ? {
      "ke-toan": "Kế toán",
      "thanh-lap": "Thành lập doanh nghiệp",
      "nhan-su": "Nhân sự",
    }
    : {
      "ke-toan": "Accounting",
      "thanh-lap": "Business Setup",
      "nhan-su": "Human Resources",
    };

  // Chuỗi giao diện trang chủ theo ngôn ngữ.
  const th = lang === "vi"
    ? {
      trustedBy: "Những khách hàng đã tin tưởng chúng tôi",
      servicesTitle: "Dịch vụ của chúng tôi",
      servicesDesc:
        "Chúng tôi đồng hành cùng doanh nghiệp bạn thông qua những chiến lược tài chính và pháp lý tối ưu, được đo ni đóng giày cho từng mục tiêu cụ thể.",
      allServicesCard: "Tất cả dịch vụ",
      learnMore: "Tìm hiểu thêm",
      processEyebrow: "Quy trình làm việc",
      processTitle:
        "Chúng tôi triển khai theo 4 bước rõ ràng, minh bạch và đồng hành xuyên suốt cùng doanh nghiệp.",
      stepLabel: "Bước",
      whyTitle: "Vì sao khách hàng chọn chúng tôi",
      whyDesc:
        "Giải pháp của SunPrime tập trung vào tính thực tiễn, kết quả đo lường được và đồng hành dài hạn cùng doanh nghiệp.",
      commitResponsibility: "Cam kết trách nhiệm",
      commitCost: "Cam kết chi phí",
      teamEyebrow: "Đội ngũ của chúng tôi",
      teamTitle: "Đội ngũ chuyên gia đồng hành cùng doanh nghiệp tăng trưởng bền vững",
      teamDesc:
        "Mỗi thành viên tại SunPrime đều có kinh nghiệm thực chiến trong kế toán, pháp lý và vận hành doanh nghiệp. Chúng tôi phối hợp như một đội ngũ nội bộ mở rộng, giúp bạn giải quyết đúng vấn đề và triển khai hiệu quả ngay từ đầu.",
      teamCta: "Liên hệ đội ngũ tư vấn",
      industriesEyebrow: "Ngành đã hợp tác",
      industriesTitle: "Những lĩnh vực chúng tôi đã đồng hành",
      industriesDesc:
        "SunPrime đã tư vấn và triển khai cho doanh nghiệp ở nhiều lĩnh vực khác nhau, với giải pháp linh hoạt theo đặc thù từng ngành.",
      companiesPartnered: "doanh nghiệp đã hợp tác",
      connectBusinesses: "Kết nối đến các doanh nghiệp",
      reviewsTitle: "Đánh giá của khách hàng dành cho chúng tôi",
      newsTitle: "Bản tin SunPrime",
      newsDesc:
        "Cập nhật các bài viết mới về kế toán, pháp lý và vận hành doanh nghiệp từ đội ngũ SunPrime.",
      viewAll: "Xem tất cả",
      readMore: "Đọc tiếp",
      ctaTitle: "Bạn cần tư vấn ngay?",
      ctaDesc:
        "Đội ngũ SunPrime sẵn sàng hỗ trợ doanh nghiệp về pháp lý, kế toán và vận hành với lộ trình rõ ràng, minh bạch ngay từ đầu.",
      ctaButton: "Nhận tư vấn miễn phí",
      reasons: [
        {
          title: "Hiểu sâu thực tế doanh nghiệp",
          description:
            "Chúng tôi bắt đầu từ việc đi sâu vào mô hình vận hành thực tế, dữ liệu hiện có và các điểm nghẽn đang xảy ra, để đề xuất đúng giải pháp doanh nghiệp cần thay vì áp dụng khuôn mẫu chung.",
        },
        {
          title: "Không tư vấn lý thuyết, tập trung vào kết quả",
          description:
            "Mọi giải pháp đều gắn với chỉ số đo lường cụ thể như tiến độ hồ sơ, độ chính xác số liệu và hiệu quả vận hành, giúp doanh nghiệp nhìn thấy kết quả rõ ràng sau từng giai đoạn triển khai.",
        },
        {
          title: "Đồng hành lâu dài, không làm dịch vụ cho xong",
          description:
            "SunPrime theo sát sau triển khai, hỗ trợ xử lý phát sinh và tối ưu liên tục để doanh nghiệp vận hành ổn định, giảm rủi ro và phát triển bền vững trong dài hạn.",
        },
      ],
      commitResponsibilityItems: [
        "Đúng luật - đúng hạn - đúng số liệu",
        "Bảo mật tuyệt đối thông tin doanh nghiệp",
        "Chịu trách nhiệm hồ sơ kế toán do Sun Prime thực hiện",
        "Đồng hành và hỗ trợ khi phát sinh kiểm tra thuế",
      ],
      commitCostItems: [
        "Báo giá trọn gói - rõ ràng - không phát sinh",
        "Tư vấn đúng nhu cầu, không bán dư dịch vụ",
        "Minh bạch ngay từ đầu",
      ],
    }
    : {
      trustedBy: "Trusted by our clients",
      servicesTitle: "Our services",
      servicesDesc:
        "We accompany your business with optimized financial and legal strategies, tailored to each specific goal.",
      allServicesCard: "All services",
      learnMore: "Learn more",
      processEyebrow: "How we work",
      processTitle:
        "We deliver in 4 clear, transparent steps and accompany your business throughout.",
      stepLabel: "Step",
      whyTitle: "Why clients choose us",
      whyDesc:
        "SunPrime's solutions focus on practicality, measurable results and long-term partnership with your business.",
      commitResponsibility: "Our responsibility",
      commitCost: "Our cost commitment",
      teamEyebrow: "Our team",
      teamTitle: "An expert team that helps businesses grow sustainably",
      teamDesc:
        "Every SunPrime member has hands-on experience in accounting, legal and business operations. We work as an extended in-house team, helping you solve the right problems and execute effectively from the start.",
      teamCta: "Contact our advisory team",
      industriesEyebrow: "Industries served",
      industriesTitle: "The fields we have accompanied",
      industriesDesc:
        "SunPrime has advised and delivered for businesses across many industries, with flexible solutions tailored to each sector.",
      companiesPartnered: "businesses partnered",
      connectBusinesses: "Connect with these businesses",
      reviewsTitle: "What our clients say about us",
      newsTitle: "SunPrime Newsletter",
      newsDesc:
        "The latest articles on accounting, legal and business operations from the SunPrime team.",
      viewAll: "View all",
      readMore: "Read more",
      ctaTitle: "Need advice right now?",
      ctaDesc:
        "The SunPrime team is ready to support your business in legal, accounting and operations with a clear, transparent roadmap from the start.",
      ctaButton: "Get a free consultation",
      reasons: [
        {
          title: "Deep understanding of your business",
          description:
            "We start by digging into your real operating model, existing data and current bottlenecks, to propose exactly what your business needs instead of applying a generic template.",
        },
        {
          title: "No theoretical advice — focused on results",
          description:
            "Every solution is tied to concrete metrics such as dossier progress, data accuracy and operational efficiency, so your business sees clear results after each phase.",
        },
        {
          title: "Long-term partnership, not just one-off service",
          description:
            "SunPrime stays close after rollout, helps handle issues and optimizes continuously so your business runs stably, reduces risk and grows sustainably over the long run.",
        },
      ],
      commitResponsibilityItems: [
        "Compliant - on time - accurate figures",
        "Absolute confidentiality of business information",
        "Accountable for accounting records done by SunPrime",
        "Accompany and support during tax inspections",
      ],
      commitCostItems: [
        "All-inclusive quote - clear - no surprises",
        "Advise to your real needs, no over-selling",
        "Transparent from the very start",
      ],
    };

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setHeroUpdateIndex((prev) => (prev + 1) % heroUpdates.length);
    }, 3000);
    return () => window.clearInterval(intervalId);
  }, [heroUpdates.length]);

  const renderServiceCardIcon = (slug: string) => {
    switch (slug) {
      case "ke-toan-tron-goi":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8">
            <path d="M4 4h16v16H4z" />
            <path d="M8 8h8" />
            <path d="M8 12h8" />
            <path d="M8 16h5" />
          </svg>
        );
      case "ke-khai-va-quyet-toan-thue":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8">
            <path d="M7 3h7l5 5v13H7z" />
            <path d="M14 3v5h5" />
            <path d="m10 16 2 2 4-4" />
          </svg>
        );
      case "lap-so-sach-chuan-muc":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8">
            <path d="M4 5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z" />
            <path d="M8 7h8" />
            <path d="M8 11h8" />
            <path d="M8 15h6" />
          </svg>
        );
      case "tu-van-thanh-lap-doanh-nghiep":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8">
            <path d="M3 21h18" />
            <path d="M5 21V7l7-4 7 4v14" />
            <path d="M9 21v-5h6v5" />
          </svg>
        );
      case "soan-thao-ho-so-phap-ly":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8">
            <path d="M6 3h9l5 5v13H6z" />
            <path d="M15 3v5h5" />
            <path d="M9 13h6" />
            <path d="M9 17h6" />
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8">
            <path d="M4 19h16" />
            <path d="M4 5h16" />
            <path d="M7 19V9h10v10" />
            <path d="M10 13h4" />
          </svg>
        );
    }
  };


  const howItWorksSteps = lang === "vi"
    ? [
      {
        title: "Tiếp nhận & đánh giá hiện trạng",
        content:
          "Lắng nghe mục tiêu, rà soát dữ liệu và đánh giá các vấn đề đang tồn tại trong mô hình vận hành hiện tại.",
      },
      {
        title: "Đề xuất giải pháp phù hợp",
        content:
          "Xây dựng lộ trình triển khai theo nhu cầu thực tế, tối ưu chi phí và đảm bảo tuân thủ pháp lý ngay từ đầu.",
      },
      {
        title: "Triển khai - chuẩn hóa - bàn giao",
        content:
          "Thiết lập hệ thống, chuẩn hóa quy trình và bàn giao đầy đủ tài liệu để đội ngũ có thể vận hành ngay.",
      },
      {
        title: "Theo dõi & hỗ trợ vận hành",
        content:
          "Theo sát kết quả triển khai, hỗ trợ xử lý phát sinh và tối ưu liên tục để doanh nghiệp tăng trưởng bền vững.",
      },
    ]
    : [
      {
        title: "Receive & assess the current state",
        content:
          "Listen to your goals, review your data and assess the issues in your current operating model.",
      },
      {
        title: "Propose a fitting solution",
        content:
          "Build a rollout roadmap to your real needs, optimize cost and ensure legal compliance from the start.",
      },
      {
        title: "Deploy - standardize - hand over",
        content:
          "Set up the system, standardize processes and hand over full documentation so your team can operate right away.",
      },
      {
        title: "Monitor & support operations",
        content:
          "Track rollout results, help handle issues and optimize continuously so your business grows sustainably.",
      },
    ];

  const teamMembers = [
    {
      fullName: "Nguyễn Minh Khoa",
      position: lang === "vi" ? "Giám đốc tư vấn doanh nghiệp" : "Director of Business Advisory",
      experience:
        lang === "vi"
          ? "12+ năm kinh nghiệm tư vấn kế toán - pháp lý"
          : "12+ years in accounting & legal advisory",
      image:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=1200&h=900",
    },
    {
      fullName: "Trần Thu Hà",
      position: lang === "vi" ? "Trưởng bộ phận kế toán dịch vụ" : "Head of Outsourced Accounting",
      experience:
        lang === "vi"
          ? "10+ năm triển khai chuẩn hóa sổ sách"
          : "10+ years standardizing accounting books",
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=1200&h=900",
    },
    {
      fullName: "Lê Đức Anh",
      position: lang === "vi" ? "Chuyên gia pháp lý doanh nghiệp" : "Corporate Legal Specialist",
      experience:
        lang === "vi"
          ? "8+ năm xử lý hồ sơ thành lập và tuân thủ"
          : "8+ years handling formation & compliance dossiers",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=1200&h=900",
    },
    {
      fullName: "Phạm Gia Hân",
      position: lang === "vi" ? "Tư vấn vận hành & tối ưu quy trình" : "Operations & Process Advisor",
      experience:
        lang === "vi" ? "7+ năm đồng hành doanh nghiệp SME" : "7+ years accompanying SMEs",
      image:
        "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=1200&h=900",
    },
  ];

  const partnerIndustries = [
    { id: "fnb", name: "F&B", companyCount: 126, icon: "utensils" },
    { id: "xay-dung", name: lang === "vi" ? "Xây dựng" : "Construction", companyCount: 74, icon: "building" },
    { id: "cong-nghe", name: lang === "vi" ? "Công nghệ" : "Technology", companyCount: 91, icon: "code" },
    { id: "ban-le", name: lang === "vi" ? "Bán lẻ" : "Retail", companyCount: 88, icon: "store" },
    { id: "san-xuat", name: lang === "vi" ? "Sản xuất" : "Manufacturing", companyCount: 63, icon: "factory" },
    { id: "thuong-mai", name: lang === "vi" ? "Thương mại" : "Commerce", companyCount: 57, icon: "briefcase" },
  ];

  const recentReviews = [
    {
      name: "Nguyễn Thanh Tùng",
      role: lang === "vi" ? "Giám đốc" : "Director",
      firm: lang === "vi" ? "Chuỗi nhà hàng Minh Long F&B" : "Minh Long F&B restaurant chain",
      reviewedAt: lang === "vi" ? "Đánh giá 3 ngày trước" : "Reviewed 3 days ago",
      content:
        lang === "vi"
          ? "SunPrime giúp chuỗi nhà hàng của tôi chuẩn hóa lại toàn bộ sổ sách và kê khai thuế. Hồ sơ luôn đúng hạn, số liệu rõ ràng, tôi yên tâm tập trung vận hành."
          : "SunPrime helped my restaurant chain standardize all bookkeeping and tax filing. Dossiers are always on time, the numbers are clear, and I can focus on operations with peace of mind.",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=150&h=150",
    },
    {
      name: "Trần Mỹ Linh",
      role: lang === "vi" ? "Nhà sáng lập" : "Founder",
      firm: "FreshFood Mart",
      reviewedAt: lang === "vi" ? "Đánh giá 5 ngày trước" : "Reviewed 5 days ago",
      content:
        lang === "vi"
          ? "Đội ngũ tư vấn rất tận tâm, giải thích dễ hiểu và phản hồi nhanh. Việc thành lập doanh nghiệp và thiết lập kế toán ban đầu diễn ra suôn sẻ hơn tôi nghĩ."
          : "The advisory team is dedicated, explains clearly and responds fast. Setting up the company and our initial accounting went more smoothly than I expected.",
      image:
        "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/4734259a-bad7-422f-981e-ce01e79184f2_1600w.jpg",
    },
    {
      name: "Phạm Đức Hải",
      role: lang === "vi" ? "Tổng giám đốc" : "CEO",
      firm: "Thiên An Construction",
      reviewedAt: lang === "vi" ? "Đánh giá 1 tuần trước" : "Reviewed 1 week ago",
      content:
        lang === "vi"
          ? "Báo giá trọn gói minh bạch, không phát sinh. SunPrime đồng hành cả khi có kiểm tra thuế, xử lý chuyên nghiệp và đúng luật."
          : "Transparent all-inclusive quote with no surprises. SunPrime stood by us even during tax inspections — professional and fully compliant.",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=150&h=150",
    },
    {
      name: "Lê Hoàng Quân",
      role: lang === "vi" ? "Đồng sáng lập" : "Co-founder",
      firm: "Horizon Tech",
      reviewedAt: lang === "vi" ? "Đánh giá 3 ngày trước" : "Reviewed 3 days ago",
      content:
        lang === "vi"
          ? "Là startup công nghệ, chúng tôi cần đối tác kế toán hiểu mô hình vận hành. SunPrime tư vấn đúng nhu cầu, không bán dư dịch vụ."
          : "As a tech startup, we needed an accounting partner who understood our operating model. SunPrime advised exactly what we needed, with no over-selling.",
      image:
        "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/c543a9e1-f226-4ced-80b0-feb8445a75b9_1600w.jpg",
    },
    {
      name: "Vũ Thị Ngọc",
      role: lang === "vi" ? "Chủ doanh nghiệp" : "Business owner",
      firm: "Blue Ocean Retail",
      reviewedAt: lang === "vi" ? "Đánh giá 12 giờ trước" : "Reviewed 12 hours ago",
      content:
        lang === "vi"
          ? "Quy trình làm việc rõ ràng theo từng bước, tôi luôn biết hồ sơ đang ở giai đoạn nào. Rất đáng tin cậy cho doanh nghiệp bán lẻ."
          : "A clear step-by-step process — I always know which stage my dossier is at. Very reliable for a retail business.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150",
    },
    {
      name: "Đặng Quốc Bảo",
      role: lang === "vi" ? "Giám đốc tài chính" : "CFO",
      firm: "Sunray Logistics",
      reviewedAt: lang === "vi" ? "Đánh giá 1 ngày trước" : "Reviewed 1 day ago",
      content:
        lang === "vi"
          ? "Số liệu chính xác, tư vấn tối ưu chi phí thuế hợp lý và đúng quy định. Sự đồng hành dài hạn của SunPrime tạo khác biệt thật sự."
          : "Accurate figures and sensible, compliant tax-cost optimization advice. SunPrime's long-term partnership makes a real difference.",
      image:
        "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/5bab247f-35d9-400d-a82b-fd87cfe913d2_1600w.webp",
    },
  ];

  return (
    <>
      <main
        id="hero-section"
        className="relative -mt-20 flex min-h-screen w-full items-center overflow-hidden px-4 pb-16 pt-20 sm:px-6 lg:px-8"
      >
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1800&auto=format&fit=crop"
            alt="SunPrime background"
            fill
            sizes="100vw"
            className="h-full w-full object-cover"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-tr from-brand-ink/85 via-text-primary/55 to-text-primary/30" />
          <div className="absolute inset-0 bg-linear-to-t from-text-primary/70 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl text-white">
          <div className="max-w-4xl">
            <Link
              href="https://portal.sunprime.vn"
              target="_blank"
              rel="noreferrer"
              className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-white transition-colors duration-200 hover:scale-[1.02] hover:text-white"
            >
              <span className="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_0_4px_rgba(74,222,128,0.18)]" />
              <span>{lang === "vi" ? "sunprimePortal v1 đã hoạt động" : "sunprimePortal v1 is live"}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-3.5 w-3.5"
                aria-hidden="true"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Link>

            <div className="relative mt-2 max-w-3xl">
              <div className="space-y-1">
                {heroServiceCategories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/services#${category.id}`}
                    className="group inline-flex origin-left items-center gap-2 text-left text-3xl font-medium leading-tight text-white transition-all duration-300 hover:scale-[1.03] hover:text-white sm:gap-3 sm:text-5xl lg:text-6xl"
                  >
                    <span className="text-balance">{heroCategoryLabels[category.id] ?? category.title}</span>
                    <span className="translate-x-1 text-2xl text-white opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 sm:text-3xl lg:text-4xl">
                      →
                    </span>
                  </Link>
                ))}
              </div>
            </div>

          </div>
        </div>

        <div className="absolute bottom-4 right-4 z-20 max-w-[320px] rounded-lg border border-white/25 bg-brand-ink/55 px-3 py-2 text-white backdrop-blur-sm sm:bottom-6 sm:right-6">
          <p className="text-[10px] uppercase tracking-widest text-white/80">{lang === "vi" ? "Thông tin mới" : "Latest updates"}</p>
          <p key={heroUpdateIndex} className="mt-1 text-xs leading-relaxed text-white animate-fade-up">
            {heroUpdates[heroUpdateIndex]}
          </p>
        </div>
      </main>

      <section className="relative overflow-hidden bg-brand py-12">
        <div className="pointer-events-none absolute inset-0 opacity-[0.14] [background-image:linear-gradient(rgba(255,255,255,0.24)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.24)_1px,transparent_1px)] [background-size:34px_34px]" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6 text-center">
            <span className="mb-2 inline-flex rounded-full border border-white/30 bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
              {th.trustedBy}
            </span>
          </div>

          <div className="marquee-mask w-full overflow-hidden">
            <div className="animate-infinite-scroll flex w-max items-center gap-4 py-2">
              {[
                { name: "SENVIET GROUP", short: "SV", tone: "from-[#EEF2FF] to-[#DBEAFE]" },
                { name: "ANPHU HOLDINGS", short: "AP", tone: "from-[#F5F3FF] to-[#E0E7FF]" },
                { name: "FRESHFOOD MART", short: "FF", tone: "from-[#ECFEFF] to-[#CCFBF1]" },
                { name: "HORIZON TECH", short: "HZ", tone: "from-[#E0F2FE] to-[#DBEAFE]" },
                { name: "MINH LONG F&B", short: "ML", tone: "from-[#FEF3C7] to-[#FDE68A]" },
                { name: "BLUE OCEAN RETAIL", short: "BO", tone: "from-[#E0F2FE] to-[#BFDBFE]" },
                { name: "SUNRAY LOGISTICS", short: "SR", tone: "from-[#DCFCE7] to-[#BBF7D0]" },
                { name: "THIEN AN CONSTRUCTION", short: "TA", tone: "from-[#FCE7F3] to-[#E9D5FF]" },
              ]
                .concat([
                  { name: "SENVIET GROUP", short: "SV", tone: "from-[#EEF2FF] to-[#DBEAFE]" },
                  { name: "ANPHU HOLDINGS", short: "AP", tone: "from-[#F5F3FF] to-[#E0E7FF]" },
                  { name: "FRESHFOOD MART", short: "FF", tone: "from-[#ECFEFF] to-[#CCFBF1]" },
                  { name: "HORIZON TECH", short: "HZ", tone: "from-[#E0F2FE] to-[#DBEAFE]" },
                  { name: "MINH LONG F&B", short: "ML", tone: "from-[#FEF3C7] to-[#FDE68A]" },
                  { name: "BLUE OCEAN RETAIL", short: "BO", tone: "from-[#E0F2FE] to-[#BFDBFE]" },
                  { name: "SUNRAY LOGISTICS", short: "SR", tone: "from-[#DCFCE7] to-[#BBF7D0]" },
                  { name: "THIEN AN CONSTRUCTION", short: "TA", tone: "from-[#FCE7F3] to-[#E9D5FF]" },
                ])
                .map((brand, index) => (
                  <div
                    key={`${brand.name}-${index}`}
                    className="group inline-flex h-18 min-w-[250px] items-center gap-3 rounded-2xl border border-white/60 bg-white/95 px-5 py-3 text-sm font-semibold tracking-wide text-slate-700 shadow-[0_10px_30px_rgba(15,23,42,0.20)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_36px_rgba(156,90,52,0.35)]"
                  >
                    <span
                      className={`inline-flex h-10 w-10 items-center justify-center bg-linear-to-br ${brand.tone} rounded-xl text-sm font-extrabold text-brand-ink shadow-inner`}
                    >
                      {brand.short}
                    </span>
                    <span className="transition-colors duration-300 group-hover:text-brand">{brand.name}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-20 max-w-3xl text-center">
            <h2 className="mb-6 text-4xl font-semibold tracking-tight text-text-primary lg:text-5xl">
              {th.servicesTitle}
            </h2>
            <p className="text-xl font-normal text-text-muted">{th.servicesDesc}</p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {featuredServiceCards.map((service) => (
              <div
                key={service.slug}
                className="group flex h-full flex-col rounded-2xl border border-border bg-surface-card p-8 shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-2 hover:border-brand-ring hover:bg-surface-tint hover:shadow-[0_20px_40px_rgba(156,90,52,0.15)]"
              >
                <div className="origin-left mb-6 text-text-primary transition-all duration-300 group-hover:scale-110 group-hover:text-brand">
                  {renderServiceCardIcon(service.slug)}
                </div>
                <h3 className="mb-4 text-xl font-semibold tracking-tight text-text-primary">{service.title}</h3>
                <p className="text-base font-normal leading-relaxed text-text-muted">{service.shortDescription}</p>
                <Link
                  href={`/services/${service.slug}`}
                  className="mt-auto inline-flex items-center pt-5 text-sm font-semibold text-brand transition-all duration-200 group-hover:translate-x-1 hover:text-brand-strong"
                >
                  {th.allServicesCard}
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-lg bg-brand px-7 py-3 text-sm font-semibold text-text-inverse shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-strong hover:shadow-md"
            >
              {th.learnMore}
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-surface-section py-24">
        <div className="pointer-events-none absolute inset-0 opacity-[0.1] [background-image:linear-gradient(rgba(156,90,52,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(156,90,52,0.16)_1px,transparent_1px)] [background-size:34px_34px]" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-32">
            <div className="mb-12 max-w-4xl">
              <span className="mb-4 block text-base font-medium text-text-muted">{th.processEyebrow}</span>
              <h2 className="text-4xl font-semibold leading-[1.1] tracking-tight text-text-primary lg:text-5xl">
                {th.processTitle}
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4">
              {howItWorksSteps.map((step, index) => (
                <article
                  key={step.title}
                  className="group relative flex min-h-[320px] flex-col items-center rounded-3xl border border-border-strong bg-surface-tint px-6 pb-8 pt-12 text-center shadow-[0_6px_20px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-3 hover:scale-[1.01] hover:border-brand-ring hover:bg-surface-base hover:shadow-[0_24px_44px_rgba(156,90,52,0.22)] hover:ring-2 hover:ring-brand-ring"
                >
                  <span className="absolute -top-4 inline-flex rounded-full bg-brand px-4 py-1.5 text-sm font-semibold text-text-inverse shadow-md transition-all duration-300 group-hover:scale-105 group-hover:bg-brand-strong">
                    {th.stepLabel} {String(index + 1).padStart(2, "0")}
                  </span>

                  <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-soft-hover text-brand transition-all duration-300 group-hover:scale-125 group-hover:rotate-3 group-hover:bg-brand-ring group-hover:text-brand-ink">
                    {index === 0 ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8">
                        <path d="M3 21h18" />
                        <path d="M5 21V7l7-4l7 4v14" />
                        <path d="M9 21v-5h6v5" />
                      </svg>
                    ) : index === 1 ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8">
                        <path d="M4 4h16v16H4z" />
                        <path d="M8 8h8" />
                        <path d="M8 12h8" />
                        <path d="M8 16h5" />
                      </svg>
                    ) : index === 2 ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8">
                        <path d="M3 6h18" />
                        <path d="M6 3v18" />
                        <path d="M18 3v18" />
                        <path d="M3 18h18" />
                        <path d="M10 10h4v4h-4z" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                        <path d="M8 9h8" />
                        <path d="M8 13h5" />
                      </svg>
                    )}
                  </div>

                  <h3 className="mb-3 text-xl font-semibold leading-snug tracking-tight text-text-primary transition-colors duration-300 group-hover:text-brand-ink">{step.title}</h3>
                  <p className="text-base font-normal leading-relaxed text-text-secondary">{step.content}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-linear-to-br from-brand/20 via-brand/10 to-surface-base py-24">
        <div className="pointer-events-none absolute inset-0 opacity-[0.1] [background-image:linear-gradient(rgba(156,90,52,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(156,90,52,0.14)_1px,transparent_1px)] [background-size:34px_34px]" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 max-w-4xl">
            <h2 className="text-3xl font-bold tracking-tight text-text-primary lg:text-4xl">
              {th.whyTitle}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-text-secondary">
              {th.whyDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {th.reasons.map((reason, index) => (
              <article
                key={reason.title}
                className="rounded-2xl border border-border bg-surface-section p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-ring hover:bg-surface-base hover:shadow-[0_16px_30px_rgba(156,90,52,0.14)]"
              >
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-soft text-brand">
                  <span className="text-sm font-bold">{index + 1}</span>
                </div>
                <h3 className="text-lg font-semibold leading-snug text-text-primary">{reason.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">{reason.description}</p>
              </article>
            ))}
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <article className="rounded-2xl border border-border bg-surface-base p-6 shadow-sm">
              <h3 className="mb-4 text-xl font-bold text-text-primary">{th.commitResponsibility}</h3>
              <ul className="space-y-3 text-text-secondary">
                {th.commitResponsibilityItems.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-brand" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>

            <article className="rounded-2xl border border-border bg-surface-base p-6 shadow-sm">
              <h3 className="mb-4 text-xl font-bold text-text-primary">{th.commitCost}</h3>
              <ul className="space-y-3 text-text-secondary">
                {th.commitCostItems.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-brand" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-14 lg:flex-row lg:items-start lg:gap-16">
            <div className="z-10 w-full lg:w-5/12">
              <span className="mb-3 block text-sm font-semibold uppercase tracking-wide text-text-secondary">
                {th.teamEyebrow}
              </span>
              <h2 className="mb-6 text-4xl font-bold leading-[1.1] tracking-tight text-text-primary lg:text-5xl">
                {th.teamTitle}
              </h2>
              <p className="mb-8 text-lg leading-relaxed text-text-secondary">
                {th.teamDesc}
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-lg bg-button-secondary px-6 py-3 text-base font-semibold text-brand-ink transition-colors duration-200 hover:bg-button-secondary-hover"
              >
                {th.teamCta}
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="pause-on-hover relative h-[600px] w-full overflow-hidden lg:w-1/2">
              <div className="pointer-events-none absolute left-0 top-0 z-10 h-24 w-full to-transparent opacity-70" />
              <div className="pointer-events-none absolute bottom-0 left-0 z-10 h-24 w-full to-transparent opacity-70" />

              <div className="animate-vertical-scroll mx-auto w-full max-w-[430px] space-y-6">
                {[...teamMembers, ...teamMembers].map((member, index) => (
                  <article
                    key={`${member.fullName}-${index}`}
                    className="group overflow-hidden rounded-2xl bg-white shadow-[0_14px_30px_rgba(15,23,42,0.14)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_40px_rgba(156,90,52,0.24)]"
                  >
                    <div className="relative h-64 w-full overflow-hidden">
                      <Image
                        src={member.image}
                        alt={member.fullName}
                        fill
                        sizes="(min-width: 1024px) 30vw, 100vw"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="text-xl font-bold text-text-primary">{member.fullName}</h3>
                      <p className="mt-1 text-sm font-semibold text-brand">{member.position}</p>
                      <p className="mt-3 text-sm leading-relaxed text-text-secondary">{member.experience}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-linear-to-br from-brand/20 via-brand/10 to-surface-base py-24">
        <div className="pointer-events-none absolute inset-0 opacity-[0.1] [background-image:linear-gradient(rgba(156,90,52,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(156,90,52,0.14)_1px,transparent_1px)] [background-size:34px_34px]" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 max-w-4xl">
            <span className="mb-2 block text-sm font-medium uppercase tracking-wide text-text-secondary">{th.industriesEyebrow}</span>
            <h2 className="mb-4 text-4xl font-bold leading-[1.1] tracking-tight text-text-primary lg:text-5xl">
              {th.industriesTitle}
            </h2>
            <p className="text-lg leading-relaxed text-text-secondary">
              {th.industriesDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {partnerIndustries.map((industry) => (
              <article
                key={industry.id}
                className="group rounded-2xl border border-border bg-surface-base/90 p-6 shadow-[0_6px_20px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-2 hover:scale-[1.01] hover:border-brand-ring hover:bg-surface-base hover:shadow-[0_22px_42px_rgba(156,90,52,0.2)] hover:ring-2 hover:ring-brand-soft-hover"
              >
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-soft text-brand transition-all duration-300 group-hover:scale-125 group-hover:rotate-3 group-hover:bg-brand-ring group-hover:text-brand-ink">
                  {industry.icon === "utensils" ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                      <path d="M4 3v7a2 2 0 0 0 2 2h2V3" />
                      <path d="M8 3v9" />
                      <path d="M14 3v18" />
                      <path d="M20 3v7a2 2 0 0 1-2 2h-2" />
                    </svg>
                  ) : industry.icon === "building" ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                      <path d="M3 21h18" />
                      <path d="M5 21V7l7-4l7 4v14" />
                      <path d="M9 21v-5h6v5" />
                    </svg>
                  ) : industry.icon === "code" ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                      <path d="m8 9-4 3 4 3" />
                      <path d="m16 9 4 3-4 3" />
                      <path d="m14 4-4 16" />
                    </svg>
                  ) : industry.icon === "store" ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                      <path d="M3 9h18" />
                      <path d="M5 9V5h14v4" />
                      <path d="M5 9v10h14V9" />
                      <path d="M9 19v-5h6v5" />
                    </svg>
                  ) : industry.icon === "factory" ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                      <path d="M3 21h18" />
                      <path d="M5 21V9l6 3V9l8-4v16" />
                      <path d="M9 21v-4" />
                      <path d="M13 21v-4" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                      <path d="M3 7h18" />
                      <path d="M5 7v13h14V7" />
                      <path d="M9 11h6" />
                      <path d="M9 15h6" />
                    </svg>
                  )}
                </div>
                <h3 className="mb-2 text-2xl font-semibold tracking-tight text-text-primary">{industry.name}</h3>
                <p className="text-base font-normal text-text-secondary">
                  <span className="text-2xl font-bold text-brand">{industry.companyCount}</span>{" "}
                  {th.companiesPartnered}
                </p>
                <Link
                  href="/stories"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand transition-all duration-300 group-hover:translate-x-1 hover:text-brand-strong"
                >
                  {th.connectBusinesses}
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </Link>
              </article>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <Link
              href="/stories"
              className="inline-flex items-center gap-2 rounded-lg bg-button-primary px-7 py-3 text-sm font-semibold text-button-text shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-button-primary-hover hover:shadow-md"
            >
              {th.learnMore}
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-surface-section pb-24 pt-24">
        <div className="pointer-events-none absolute inset-0 opacity-[0.1] [background-image:linear-gradient(rgba(156,90,52,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(156,90,52,0.16)_1px,transparent_1px)] [background-size:34px_34px]" />
        <div className="relative z-10 mx-auto mb-12 flex max-w-7xl flex-col items-end justify-between gap-6 px-4 sm:px-6 md:flex-row lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold leading-tight tracking-tight text-text-primary lg:text-4xl">
              {th.reviewsTitle}
            </h2>
          </div>
        </div>

        <div className="marquee-mask w-full overflow-hidden">
          <div className="animate-infinite-scroll flex gap-6 pl-4">
            {[...recentReviews, ...recentReviews].map((item, index) => (
              <div
                key={`${item.name}-${index}`}
                className="w-[420px] flex-shrink-0 rounded-2xl border border-border-soft bg-surface-base p-7 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="mb-5 flex items-start gap-4">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={56}
                    height={56}
                    className="h-14 w-14 rounded-full object-cover ring-2 ring-surface-section"
                  />
                  <div>
                    <h3 className="text-lg font-bold leading-snug text-text-primary">{item.name}</h3>
                    <p className="text-sm font-medium text-text-muted">{item.role}</p>
                    <p className="mt-0.5 text-xs text-text-muted">{item.firm}</p>
                  </div>
                </div>
                <div className="mb-1.5 flex items-center gap-2">
                  <div className="flex gap-0.5 text-state-success">★★★★★</div>
                  <span className="text-sm font-semibold text-state-success">5.0/5</span>
                </div>
                <p className="mb-4 text-xs font-medium text-text-muted">{item.reviewedAt}</p>
                <p className="text-[15px] leading-relaxed text-text-secondary">“{item.content}”</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="max-w-3xl">
              <h2 className="mb-4 text-3xl font-bold tracking-tight text-text-primary">{th.newsTitle}</h2>
              <p className="text-base text-text-secondary">
                {th.newsDesc}
              </p>
            </div>
            <Link
              href="/tin-tuc"
              className="inline-flex items-center gap-2 rounded-lg border border-brand px-4 py-2 text-sm font-semibold text-brand transition-all duration-200 hover:bg-brand-soft"
            >
              {th.viewAll}
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {newsArticles.slice(0, 8).map((article) => (
              <Link
                key={article.slug}
                href={`/tin-tuc/${article.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-border bg-surface-base p-4 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-brand-ring hover:shadow-[0_20px_38px_rgba(156,90,52,0.18)]"
              >
                <div className="relative mb-5 aspect-16/10 overflow-hidden rounded-xl bg-surface-section">
                  <Image
                    src={article.image || '/images/no-image-news.svg'}
                    alt={article.image ? article.title : `Không có ảnh - ${article.title}`}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-text-muted">
                  {new Intl.DateTimeFormat(lang === 'vi' ? 'vi-VN' : 'en-US', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date(article.publishedAt))}
                </p>
                <h3 className="text-lg font-bold leading-snug text-text-primary transition-colors duration-300 group-hover:text-brand">
                  {article.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-text-muted">{article.excerpt}</p>
                <span className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-semibold text-brand transition-all duration-300 group-hover:translate-x-1">
                  {th.readMore}
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-brand">
        <div className="pointer-events-none absolute inset-0 opacity-[0.14] [background-image:linear-gradient(rgba(255,255,255,0.24)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.24)_1px,transparent_1px)] [background-size:34px_34px]" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-20">
            <div className="w-full py-20 lg:w-1/2 lg:py-28">
              <span className="mb-6 inline-flex items-center rounded-full bg-state-success px-3 py-1 text-xs font-semibold tracking-wide text-text-inverse">
                SunPrime Consulting
              </span>
              <h2 className="mb-6 text-4xl font-semibold tracking-tight text-text-inverse lg:text-5xl">
                {th.ctaTitle}
              </h2>
              <p className="mb-10 text-lg font-normal text-text-inverse">
                {th.ctaDesc}
              </p>
              <a
                href="#"
                className="inline-flex items-center justify-center rounded-lg border border-transparent bg-button-text-dark px-8 py-3.5 text-base font-semibold text-text-inverse transition-all duration-200 hover:bg-text-primary hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-border-strong focus:ring-offset-2"
              >
                {th.ctaButton}
              </a>
            </div>

            <div className="relative w-full lg:w-1/2">
              <div className="rounded-2xl bg-transparent p-4 lg:p-5">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noreferrer"
                      className="mb-3 inline-flex items-center gap-2 text-base font-semibold text-white hover:text-white/80"
                    >
                      Follow Instagram
                      <span aria-hidden="true">↗</span>
                    </a>
                    <div className="grid grid-cols-3 gap-1.5">
                      {[
                        "https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?q=80&w=800&auto=format&fit=crop",
                        "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=800&auto=format&fit=crop",
                        "https://images.unsplash.com/photo-1543779503-664c37a21e7e?q=80&w=800&auto=format&fit=crop",
                        "https://images.unsplash.com/photo-1517433670267-08bbd4be890f?q=80&w=800&auto=format&fit=crop",
                        "https://images.unsplash.com/photo-1481833761820-0509d3217039?q=80&w=800&auto=format&fit=crop",
                        "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=800&auto=format&fit=crop",
                      ].map((src, index) => (
                        <div key={`insta-${index}`} className="relative aspect-square overflow-hidden rounded-sm">
                          <Image
                            src={src}
                            alt={`Instagram post ${index + 1}`}
                            fill
                            sizes="(min-width: 1024px) 16vw, 33vw"
                            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <a
                      href="https://facebook.com"
                      target="_blank"
                      rel="noreferrer"
                      className="mb-3 inline-flex items-center gap-2 text-base font-semibold text-white hover:text-white/80"
                    >
                      Follow Facebook
                      <span aria-hidden="true">↗</span>
                    </a>
                    <div className="grid grid-cols-3 gap-1.5">
                      {[
                        "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop",
                        "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=800&auto=format&fit=crop",
                        "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=800&auto=format&fit=crop",
                        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=800&auto=format&fit=crop",
                        "https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?q=80&w=800&auto=format&fit=crop",
                        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=800&auto=format&fit=crop",
                      ].map((src, index) => (
                        <div key={`facebook-${index}`} className="relative aspect-square overflow-hidden rounded-sm">
                          <Image
                            src={src}
                            alt={`Facebook post ${index + 1}`}
                            fill
                            sizes="(min-width: 1024px) 16vw, 33vw"
                            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <a
                    href="https://www.tiktok.com"
                    target="_blank"
                    rel="noreferrer"
                    className="mb-3 inline-flex items-center gap-2 text-base font-semibold text-white hover:text-white/80"
                  >
                    Follow TikTok
                    <span aria-hidden="true">↗</span>
                  </a>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      "https://images.unsplash.com/photo-1521302200778-33500795e128?q=80&w=900&auto=format&fit=crop",
                      "https://images.unsplash.com/photo-1530023367847-a683933f4172?q=80&w=900&auto=format&fit=crop",
                      "https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=900&auto=format&fit=crop",
                    ].map((src, index) => (
                      <div key={`tiktok-${index}`} className="group relative aspect-[9/16] overflow-hidden rounded-sm">
                        <Image
                          src={src}
                          alt={`TikTok video ${index + 1}`}
                          fill
                          sizes="(min-width: 1024px) 16vw, 32vw"
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/20 transition-colors duration-300 group-hover:bg-black/10" />
                        <span className="absolute inset-0 flex items-center justify-center">
                          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-slate-900 shadow-md">
                            ▶
                          </span>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx global>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes vertical-scroll {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-50%);
          }
        }

        .animate-vertical-scroll {
          animation: vertical-scroll 30s linear infinite;
        }

        .animate-infinite-scroll {
          animation: scroll-left 60s linear infinite;
          width: max-content;
        }

        .animate-infinite-scroll:hover {
          animation-play-state: paused;
        }

        .marquee-mask {
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }

        .pause-on-hover:hover .animate-vertical-scroll {
          animation-play-state: paused;
        }
      `}</style>
    </>
  );

}
