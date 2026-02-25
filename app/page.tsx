'use client';
import { newsArticles } from "@/data/news";
import { allServices } from "@/data/services";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  // --- LOGIC STATES ---
  const featuredServiceCards = [
    ...allServices.filter((service) => service.categoryId === "ke-toan").slice(0, 3),
    ...allServices.filter((service) => service.categoryId === "thanh-lap").slice(0, 3),
  ];
  const serviceTopicItems = allServices.map((service) => ({
    title: service.title,
    desc: service.shortDescription,
    slug: service.slug,
    icon:
      service.categoryId === "ke-toan"
        ? "banknote"
        : service.categoryId === "thanh-lap"
          ? "building-2"
          : "users",
  }));

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


  const topLawyers = [
    {
      name: "Liv Russell",
      role: "Family law lawyer",
      reviews: 33,
      expertise: "Agreement and Contract Law, Family Law, Merger and Acquisitions, Company.",
      image:
        "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/917d6f93-fb36-439a-8c48-884b67b35381_1600w.jpg",
    },
    {
      name: "Magnus Lawsen",
      role: "Business, Merger & Acquisition",
      reviews: 19,
      expertise: "Labour law, Agreement and Contract Law, Business Law, Merger and Acquisitions, Company.",
      image:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200&h=200",
    },
    {
      name: "Emilie Lingson",
      role: "Start up lawyer",
      reviews: 16,
      expertise: "Start up, Fintech, Crypto, AI, Merger and Acquisitions, Design Agency, Digital marketing.",
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200&h=200",
    },
    {
      name: "Henry Twill",
      role: "Labour law lawyer",
      reviews: 52,
      expertise: "Labour law, Agreement and Contract Law, Business Law, Merger and Acquisitions.",
      image:
        "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/4734259a-bad7-422f-981e-ce01e79184f2_1600w.jpg",
    },
    {
      name: "Petter Ulfs",
      role: "Public Procurement",
      reviews: 27,
      expertise: "Labour law, Agreement and Contract Law, Business Law, Merger and Acquisitions.",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200&h=200",
    },
  ];

  const howItWorksSteps = [
    {
      title: "Tiếp nhận & đánh giá hiện trạng",
      image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1400&auto=format&fit=crop",
      content:
        "Lắng nghe mục tiêu, rà soát dữ liệu và đánh giá các vấn đề đang tồn tại trong mô hình vận hành hiện tại.",
    },
    {
      title: "Đề xuất giải pháp phù hợp",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1400&auto=format&fit=crop",
      content:
        "Xây dựng lộ trình triển khai theo nhu cầu thực tế, tối ưu chi phí và đảm bảo tuân thủ pháp lý ngay từ đầu.",
    },
    {
      title: "Triển khai - chuẩn hóa - bàn giao",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1400&auto=format&fit=crop",
      content:
        "Thiết lập hệ thống, chuẩn hóa quy trình và bàn giao đầy đủ tài liệu để đội ngũ có thể vận hành ngay.",
    },
    {
      title: "Theo dõi & hỗ trợ vận hành",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1400&auto=format&fit=crop",
      content:
        "Theo sát kết quả triển khai, hỗ trợ xử lý phát sinh và tối ưu liên tục để doanh nghiệp tăng trưởng bền vững.",
    },
  ];

  const teamMembers = [
    {
      fullName: "Nguyễn Minh Khoa",
      position: "Giám đốc tư vấn doanh nghiệp",
      experience: "12+ năm kinh nghiệm tư vấn kế toán - pháp lý",
      image:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=1200&h=900",
    },
    {
      fullName: "Trần Thu Hà",
      position: "Trưởng bộ phận kế toán dịch vụ",
      experience: "10+ năm triển khai chuẩn hóa sổ sách",
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=1200&h=900",
    },
    {
      fullName: "Lê Đức Anh",
      position: "Chuyên gia pháp lý doanh nghiệp",
      experience: "8+ năm xử lý hồ sơ thành lập và tuân thủ",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=1200&h=900",
    },
    {
      fullName: "Phạm Gia Hân",
      position: "Tư vấn vận hành & tối ưu quy trình",
      experience: "7+ năm đồng hành doanh nghiệp SME",
      image:
        "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=1200&h=900",
    },
  ];

  const serviceFeatures = [
    {
      title: "100% miễn phí tư vấn ban đầu",
      image: "https://www.advokatguiden.no/_nuxt/img/how-advokatguiden-search-works_hero.b59b87b.png",
      content:
        "Bạn nhận được tư vấn sơ bộ và định hướng giải pháp hoàn toàn miễn phí, không ràng buộc sử dụng dịch vụ.",
    },
    {
      title: "Thông tin bảo mật",
      image: "https://cdn.advokatguiden.no/public/no/articles/search/sKaOyfUXIS3rikREpUp2gisNYbdFTHa7DegvFNXf.jpg",
      content:
        "Toàn bộ dữ liệu doanh nghiệp được bảo mật trong suốt quá trình tư vấn, triển khai và bàn giao hồ sơ.",
    },
    {
      title: "Giải pháp theo nhu cầu thực tế",
      image: "https://www.advokatguiden.no/_nuxt/img/how-advokatguiden-leads-works_hero.790558f.png",
      content:
        "Mỗi phương án đều được đề xuất theo quy mô, mục tiêu và nguồn lực thực tế của doanh nghiệp, dễ áp dụng ngay.",
    },
  ];

  const partnerIndustries = [
    { id: "fnb", name: "F&B", companyCount: 126, icon: "utensils" },
    { id: "xay-dung", name: "Xây dựng", companyCount: 74, icon: "building" },
    { id: "cong-nghe", name: "Công nghệ", companyCount: 91, icon: "code" },
    { id: "ban-le", name: "Bán lẻ", companyCount: 88, icon: "store" },
    { id: "san-xuat", name: "Sản xuất", companyCount: 63, icon: "factory" },
    { id: "thuong-mai", name: "Thương mại", companyCount: 57, icon: "briefcase" },
  ];

  const recentReviews = [
    {
      name: "Kristoffer Botilsrud",
      role: "Real estate lawyer in Oslo",
      firm: "Oslo Advokatkontor AS",
      reviewedAt: "Reviewed 3 hours ago",
      content:
        "We received good help and guidance from lawyer Kristoffer B, he was very professional, I recommend him.",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=150&h=150",
    },
    {
      name: "Marie Hansen",
      role: "Family Law Specialist",
      firm: "Bergen Law Partners",
      reviewedAt: "Reviewed 5 hours ago",
      content:
        "Guided me through a difficult custody battle with empathy and expertise. I felt safe throughout the process.",
      image:
        "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/4734259a-bad7-422f-981e-ce01e79184f2_1600w.jpg",
    },
    {
      name: "Sarah Jensen",
      role: "Employment Law",
      firm: "Trondheim Advokatene",
      reviewedAt: "Reviewed 2 days ago",
      content:
        "Very detail-oriented and supportive. Sarah made sure I understood every clause in my new contract before signing.",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=150&h=150",
    },
    {
      name: "Anders Borg",
      role: "Property Law",
      firm: "Oslo Legal Group",
      reviewedAt: "Reviewed 3 days ago",
      content:
        "Anders handled our property dispute with great professionalism. He was always available to answer our questions.",
      image:
        "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/c543a9e1-f226-4ced-80b0-feb8445a75b9_1600w.jpg",
    },
    {
      name: "Erik Thorne",
      role: "Criminal Defense",
      firm: "Thorne & Partners",
      reviewedAt: "Reviewed 12 hours ago",
      content:
        "Erik was incredibly thorough. He explained every step of the process and achieved a better outcome than I expected.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150",
    },
    {
      name: "Lina Berg",
      role: "Contract Law",
      firm: "Nordic Legal Group",
      reviewedAt: "Reviewed 1 day ago",
      content:
        "Lina helped us review our vendor contracts. Her attention to detail saved us from potential liabilities. Highly recommended.",
      image:
        "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/5bab247f-35d9-400d-a82b-fd87cfe913d2_1600w.webp",
    },
  ];

  const legalTopics = [
    {
      title: "Family and personal life",
      desc: "Divorce, children, inheritance, personal disputes",
      icon: "user",
    },
    {
      title: "Work and employment",
      desc: "Contracts, termination, workplace conflicts",
      icon: "briefcase",
    },
    {
      title: "Money, tax and finance",
      desc: "Tax, debt, banking, insurance, compensation",
      icon: "banknote",
    },
    {
      title: "Buying, housing and property",
      desc: "Consumer rights, property purchases, construction",
      icon: "home",
    },
    {
      title: "Business and companies",
      desc: "Company law, contracts, disputes, competition",
      icon: "building-2",
    },
    {
      title: "Conflicts and court cases",
      desc: "Legal disputes, lawsuits, negotiations",
      icon: "gavel",
    },
    {
      title: "Criminal matters",
      desc: "Charges, investigations, defense",
      icon: "car",
    },
    {
      title: "Public authorities and permits",
      desc: "Decisions from authorities, permits, complaints",
      icon: "calendar",
    },
    {
      title: "Immigration and international matters",
      desc: "Residency, citizenship, cross border cases",
      icon: "contact-2",
    },
    {
      title: "Specialised industries and regulation",
      desc: "Energy, environment, shipping, tech, IP, health",
      icon: "factory",
    },
  ];

  const stateLinks = [
    "Lawyers in California",
    "Lawyers in Texas",
    "Lawyers in Florida",
    "Lawyers in New York State",
    "Lawyers in Pennsylvania",
    "Lawyers in Illinois",
    "Lawyers in Ohio",
    "Lawyers in Georgia",
    "Lawyers in North Carolina",
    "Lawyers in Michigan",
    "Lawyers in New Jersey",
    "Lawyers in Virginia",
    "Lawyers in Washington",
    "Lawyers in Arizona",
    "Lawyers in Massachusetts",
    "Lawyers in Tennessee",
  ];

  const legalCategories = [
    {
      title: "Company Law lawyer",
      icon: "building-2",
      links: ["Business Law lawyer", "Company lawyer", "Merger and Acquisitions lawyer"],
    },
    {
      title: "Economy and Finance lawyer",
      icon: "banknote",
      links: ["Agreement and Contract Law lawyer", "Bankruptcy lawyer", "Financial Crime lawyer"],
    },
    {
      title: "International Law lawyer",
      icon: "plane",
      links: ["EU Law lawyer", "Human Rights lawyer", "Immigration Law lawyer"],
    },
    {
      title: "Regulatory lawyer",
      icon: "file-text",
      links: ["Bank and Finance lawyer", "Competition lawyer", "Environmental Law lawyer"],
    },
    {
      title: "Family and personal life",
      icon: "users",
      links: ["Child custody lawyer", "Divorce lawyer", "Inheritance Law lawyer"],
    },
    {
      title: "Property and housing",
      icon: "home",
      links: ["Construction Law lawyer", "Consumer rights lawyer", "Housing Law lawyer"],
    },
    {
      title: "Criminal matters",
      icon: "shield",
      links: ["Criminal Defense lawyer", "Fraud and White Collar Crime", "Police investigations"],
    },
    {
      title: "Employment and work",
      icon: "briefcase",
      links: ["Employment contracts lawyer", "Labour Law lawyer", "Termination and dismissal"],
    },
  ];

  const renderTopicIcon = (icon: string) => {
    switch (icon) {
      case "user":
        return (
          <>
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </>
        );
      case "briefcase":
        return (
          <>
            <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
            <rect width="20" height="14" x="2" y="6" rx="2" />
          </>
        );
      case "banknote":
        return (
          <>
            <rect width="20" height="12" x="2" y="6" rx="2" />
            <circle cx="12" cy="12" r="2" />
            <path d="M6 12h.01M18 12h.01" />
          </>
        );
      case "home":
        return (
          <>
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </>
        );
      case "building-2":
        return (
          <>
            <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
            <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
            <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" />
            <path d="M10 6h4M10 10h4M10 14h4M10 18h4" />
          </>
        );
      case "gavel":
        return (
          <>
            <path d="m14.5 12.5-8 8a2.119 2.119 0 1 1-3-3l8-8" />
            <path d="m16 16 6-6" />
            <path d="m8 8 6-6" />
            <path d="m9 7 8 8" />
            <path d="m21 11-8-8" />
          </>
        );
      case "car":
        return (
          <>
            <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
            <circle cx="7" cy="17" r="2" />
            <path d="M9 17h6" />
            <circle cx="17" cy="17" r="2" />
          </>
        );
      case "calendar":
        return (
          <>
            <path d="M8 2v4M16 2v4" />
            <rect width="18" height="18" x="3" y="4" rx="2" />
            <path d="M3 10h18" />
          </>
        );
      case "contact-2":
        return (
          <>
            <path d="M16 2v2M17.915 22a6 6 0 0 0-12 0M8 2v2" />
            <circle cx="12" cy="12" r="4" />
            <rect x="3" y="4" width="18" height="18" rx="2" />
          </>
        );
      case "factory":
        return (
          <>
            <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
            <path d="M17 18h1M12 18h1M7 18h1" />
          </>
        );
      case "users":
        return (
          <>
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </>
        );
      case "plane":
        return (
          <>
            <path d="M2 12h20" />
            <path d="M13 2v20" />
            <path d="M4 11 2 9" />
            <path d="M16 11l5-5" />
            <path d="M16 13l5 5" />
            <path d="M4 13l-2 2" />
          </>
        );
      case "file-text":
        return (
          <>
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <path d="M14 2v6h6" />
            <path d="M10 9H8M16 13H8M16 17H8" />
          </>
        );
      case "shield":
        return <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />;
      default:
        return null;
    }
  };

  return (
    <>
      <main className="relative flex min-h-[calc(100vh-5rem)] w-full items-center overflow-hidden px-4 py-16 sm:px-6 lg:px-8">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1800&auto=format&fit=crop"
            alt="SunPrime background"
            fill
            sizes="100vw"
            className="h-full w-full object-cover"
            priority
          />
          <div className="absolute inset-0 bg-white/8" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl">
          {/* Headlines */}
          <div className="max-w-4xl">
          <h1 className="mb-6 text-4xl font-semibold leading-[1.15] tracking-tight text-white drop-shadow-[0_3px_14px_rgba(0,0,0,0.45)] lg:text-5xl">
            Kế toán – Pháp lý doanh nghiệp: Chuẩn ngay từ đầu
          </h1>
          <p className="mb-10 max-w-3xl text-lg font-normal leading-relaxed text-text-inverse drop-shadow-[0_2px_10px_rgba(0,0,0,0.35)]">
            Sun Prime Consulting là đơn vị tư vấn doanh nghiệp chuyên về thành lập, pháp lý, kế toán và vận hành.
            Chúng tôi đồng hành cùng doanh nghiệp xây dựng nền tảng chuẩn luật – rõ số – vững hệ thống, đặc biệt trong lĩnh vực nhà hàng – khách sạn.
          </p>
          </div>

          {/* Main CTA Bar */}
          <div className="flex max-w-xl flex-col gap-2 sm:flex-row">
            <Link
              href="/services"
              className="flex w-full items-center justify-center rounded-lg bg-brand px-5 py-2.5 text-base font-medium text-text-inverse shadow-sm transition-all duration-200 hover:bg-brand-strong hover:shadow-md active:scale-95"
            >
              Dịch vụ của chúng tôi
            </Link>
            <Link
              href="/contact"
              className="flex w-full items-center justify-center rounded-lg border border-brand bg-surface-base/75 px-5 py-2.5 text-base font-medium text-brand transition-all duration-200 hover:bg-brand-soft"
            >
              Liên hệ ngay
            </Link>
          </div>

          {/* Value Props */}
          <div className="mt-20 grid grid-cols-1 gap-12 text-center md:grid-cols-3">
            <div className="group rounded-2xl border border-white/30 bg-white/80 p-5 shadow-lg backdrop-blur-[1px]">
              <div className="flex cursor-default flex-col items-center">
            <div className="mb-4 rounded-full bg-surface-base px-3 py-3 text-brand transition-transform duration-300 group-hover:scale-110">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                data-lucide="calculator"
                className="h-8 w-8 stroke-[1.25]"
              >
                <rect x="4" y="2" width="16" height="20" rx="2" />
                <line x1="8" y1="6" x2="16" y2="6" />
                <line x1="8" y1="11" x2="10" y2="11" />
                <line x1="12" y1="11" x2="14" y2="11" />
                <line x1="8" y1="15" x2="10" y2="15" />
                <line x1="12" y1="15" x2="14" y2="15" />
              </svg>
            </div>
            <h3 className="mb-2 text-lg font-semibold tracking-tight text-text-primary">Dịch vụ kế toán</h3>
            <p className="text-base font-normal leading-relaxed text-text-secondary">
              Cung cấp giải pháp kế toán trọn gói, kê khai thuế và báo cáo định kỳ giúp doanh nghiệp vận hành
              minh bạch, đúng chuẩn.
            </p>
              </div>
          </div>

            <div className="group rounded-2xl border border-white/30 bg-white/80 p-5 shadow-lg backdrop-blur-[1px]">
              <div className="flex cursor-default flex-col items-center">
            <div className="mb-4 rounded-full bg-surface-base px-3 py-3 text-brand transition-transform duration-300 group-hover:scale-110">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                data-lucide="building-2"
                className="h-8 w-8 stroke-[1.25]"
              >
                <path d="M3 21h18" />
                <path d="M5 21V7l7-4l7 4v14" />
                <path d="M9 21v-6h6v6" />
              </svg>
            </div>
            <h3 className="mb-2 text-lg font-semibold tracking-tight text-text-primary">Tư vấn & thành lập doanh nghiệp</h3>
            <p className="text-base font-normal leading-relaxed text-text-secondary">
              Tư vấn mô hình phù hợp, hoàn thiện hồ sơ pháp lý và triển khai thủ tục thành lập nhanh, đúng quy
              định ngay từ đầu.
            </p>
              </div>
          </div>

            <div className="group rounded-2xl border border-white/30 bg-white/80 p-5 shadow-lg backdrop-blur-[1px]">
              <div className="flex cursor-default flex-col items-center">
            <div className="mb-4 rounded-full bg-surface-base px-3 py-3 text-brand transition-transform duration-300 group-hover:scale-110">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                data-lucide="megaphone"
                className="h-8 w-8 stroke-[1.25]"
              >
                <path d="M3 11v2a1 1 0 0 0 1 1h3l3 5h2l-2-5l8-4V8l-8-4l-3 5H4a1 1 0 0 0-1 1z" />
                <path d="M18 9v6" />
              </svg>
            </div>
            <h3 className="mb-2 text-lg font-semibold tracking-tight text-text-primary">Marketing</h3>
            <p className="text-base font-normal leading-relaxed text-text-secondary">
              Xây dựng chiến lược truyền thông, nội dung và nhận diện thương hiệu để tăng độ phủ, thu hút khách
              hàng và nâng cao doanh số.
            </p>
              </div>
          </div>
          </div>
        </div>
      </main>

      <section className="relative overflow-hidden bg-brand py-12">
        <div className="pointer-events-none absolute inset-0 opacity-[0.14] [background-image:linear-gradient(rgba(255,255,255,0.24)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.24)_1px,transparent_1px)] [background-size:34px_34px]" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6 text-center">
            <span className="mb-2 inline-flex rounded-full border border-white/30 bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
              Những khách hàng đã tin tưởng chúng tôi
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
                    className="group inline-flex h-18 min-w-[250px] items-center gap-3 rounded-2xl border border-white/60 bg-white/95 px-5 py-3 text-sm font-semibold tracking-wide text-slate-700 shadow-[0_10px_30px_rgba(15,23,42,0.20)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_36px_rgba(79,70,229,0.35)]"
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
              Dịch vụ của chúng tôi
            </h2>
            <p className="text-xl font-normal text-text-muted">Chúng tôi đồng hành cùng doanh nghiệp bạn thông qua những chiến lược tài chính và pháp lý tối ưu, được đo ni đóng giày cho từng mục tiêu cụ thể.</p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {featuredServiceCards.map((service) => (
              <div
                key={service.slug}
                className="group flex h-full flex-col rounded-2xl border border-border bg-surface-card p-8 shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-2 hover:border-brand-ring hover:bg-surface-tint hover:shadow-[0_20px_40px_rgba(79,70,229,0.15)]"
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
                  Tất cả dịch vụ
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-lg bg-brand px-7 py-3 text-sm font-semibold text-text-inverse shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-strong hover:shadow-md"
            >
              Tìm hiểu thêm
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-surface-section py-24">
        <div className="pointer-events-none absolute inset-0 opacity-[0.1] [background-image:linear-gradient(rgba(79,70,229,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(79,70,229,0.16)_1px,transparent_1px)] [background-size:34px_34px]" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-32">
            <div className="mb-12 max-w-4xl">
              <span className="mb-4 block text-base font-medium text-text-muted">Quy trình làm việc</span>
              <h2 className="text-4xl font-semibold leading-[1.1] tracking-tight text-text-primary lg:text-5xl">
                Chúng tôi triển khai theo 4 bước rõ ràng, minh bạch và đồng hành xuyên suốt cùng doanh nghiệp.
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4">
              {howItWorksSteps.map((step, index) => (
                <article
                  key={step.title}
                  className="group relative flex min-h-[320px] flex-col items-center rounded-3xl border border-border-strong bg-surface-tint px-6 pb-8 pt-12 text-center shadow-[0_6px_20px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-3 hover:scale-[1.01] hover:border-brand-ring hover:bg-surface-base hover:shadow-[0_24px_44px_rgba(79,70,229,0.22)] hover:ring-2 hover:ring-brand-ring"
                >
                  <span className="absolute -top-4 inline-flex rounded-full bg-brand px-4 py-1.5 text-sm font-semibold text-text-inverse shadow-md transition-all duration-300 group-hover:scale-105 group-hover:bg-brand-strong">
                    Bước {String(index + 1).padStart(2, "0")}
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
        <div className="pointer-events-none absolute inset-0 opacity-[0.1] [background-image:linear-gradient(rgba(79,70,229,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(79,70,229,0.14)_1px,transparent_1px)] [background-size:34px_34px]" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 max-w-4xl">
            <h2 className="text-3xl font-bold tracking-tight text-text-primary lg:text-4xl">
              Vì sao khách hàng chọn chúng tôi
            </h2>
            <p className="mt-3 text-base leading-relaxed text-text-secondary">
              Giải pháp của SunPrime tập trung vào tính thực tiễn, kết quả đo lường được và đồng hành dài hạn cùng doanh nghiệp.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
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
            ].map((reason, index) => (
              <article
                key={reason.title}
                className="rounded-2xl border border-border bg-surface-section p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-ring hover:bg-surface-base hover:shadow-[0_16px_30px_rgba(79,70,229,0.14)]"
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
              <h3 className="mb-4 text-xl font-bold text-text-primary">Cam kết trách nhiệm</h3>
              <ul className="space-y-3 text-text-secondary">
                {[
                  "Đúng luật - đúng hạn - đúng số liệu",
                  "Bảo mật tuyệt đối thông tin doanh nghiệp",
                  "Chịu trách nhiệm hồ sơ kế toán do Sun Prime thực hiện",
                  "Đồng hành và hỗ trợ khi phát sinh kiểm tra thuế",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-brand" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>

            <article className="rounded-2xl border border-border bg-surface-base p-6 shadow-sm">
              <h3 className="mb-4 text-xl font-bold text-text-primary">Cam kết chi phí</h3>
              <ul className="space-y-3 text-text-secondary">
                {[
                  "Báo giá trọn gói - rõ ràng - không phát sinh",
                  "Tư vấn đúng nhu cầu, không bán dư dịch vụ",
                  "Minh bạch ngay từ đầu",
                ].map((item) => (
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
                Đội ngũ của chúng tôi
              </span>
              <h2 className="mb-6 text-4xl font-bold leading-[1.1] tracking-tight text-text-primary lg:text-5xl">
                Đội ngũ chuyên gia đồng hành cùng doanh nghiệp tăng trưởng bền vững
              </h2>
              <p className="mb-8 text-lg leading-relaxed text-text-secondary">
                Mỗi thành viên tại SunPrime đều có kinh nghiệm thực chiến trong kế toán, pháp lý và vận hành
                doanh nghiệp. Chúng tôi phối hợp như một đội ngũ nội bộ mở rộng, giúp bạn giải quyết đúng vấn đề
                và triển khai hiệu quả ngay từ đầu.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-lg bg-button-secondary px-6 py-3 text-base font-semibold text-brand-ink transition-colors duration-200 hover:bg-button-secondary-hover"
              >
                Liên hệ đội ngũ tư vấn
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
                    className="group overflow-hidden rounded-2xl bg-white shadow-[0_14px_30px_rgba(15,23,42,0.14)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_40px_rgba(79,70,229,0.24)]"
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
        <div className="pointer-events-none absolute inset-0 opacity-[0.1] [background-image:linear-gradient(rgba(79,70,229,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(79,70,229,0.14)_1px,transparent_1px)] [background-size:34px_34px]" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 max-w-4xl">
            <span className="mb-2 block text-sm font-medium uppercase tracking-wide text-text-secondary">Ngành đã hợp tác</span>
            <h2 className="mb-4 text-4xl font-bold leading-[1.1] tracking-tight text-text-primary lg:text-5xl">
              Những lĩnh vực chúng tôi đã đồng hành
            </h2>
            <p className="text-lg leading-relaxed text-text-secondary">
              SunPrime đã tư vấn và triển khai cho doanh nghiệp ở nhiều lĩnh vực khác nhau, với giải pháp linh hoạt theo đặc thù từng ngành.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {partnerIndustries.map((industry) => (
              <article
                key={industry.id}
                className="group rounded-2xl border border-border bg-surface-base/90 p-6 shadow-[0_6px_20px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-2 hover:scale-[1.01] hover:border-brand-ring hover:bg-surface-base hover:shadow-[0_22px_42px_rgba(79,70,229,0.2)] hover:ring-2 hover:ring-brand-soft-hover"
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
                  doanh nghiệp đã hợp tác
                </p>
                <Link
                  href="/stories"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand transition-all duration-300 group-hover:translate-x-1 hover:text-brand-strong"
                >
                  Kết nối đến các doanh nghiệp
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
              Tìm hiểu thêm
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-surface-section pb-24 pt-24">
        <div className="pointer-events-none absolute inset-0 opacity-[0.1] [background-image:linear-gradient(rgba(79,70,229,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(79,70,229,0.16)_1px,transparent_1px)] [background-size:34px_34px]" />
        <div className="relative z-10 mx-auto mb-12 flex max-w-7xl flex-col items-end justify-between gap-6 px-4 sm:px-6 md:flex-row lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold leading-tight tracking-tight text-text-primary lg:text-4xl">
              Đánh giá của khách hàng dành cho chúng tôi
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
              <h2 className="mb-4 text-3xl font-bold tracking-tight text-text-primary">Bản tin SunPrime</h2>
              <p className="text-base text-text-secondary">
                Cập nhật các bài viết mới về kế toán, pháp lý và vận hành doanh nghiệp từ đội ngũ SunPrime.
              </p>
            </div>
            <Link
              href="/tin-tuc"
              className="inline-flex items-center gap-2 rounded-lg border border-brand px-4 py-2 text-sm font-semibold text-brand transition-all duration-200 hover:bg-brand-soft"
            >
              Xem tất cả
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {newsArticles.map((article) => (
              <Link
                key={article.slug}
                href={`/tin-tuc/${article.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-border bg-surface-base p-4 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-brand-ring hover:shadow-[0_20px_38px_rgba(79,70,229,0.18)]"
              >
                <div className="relative mb-5 aspect-16/10 overflow-hidden rounded-xl bg-surface-section">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-text-muted">{article.date}</p>
                <h3 className="text-lg font-bold leading-snug text-text-primary transition-colors duration-300 group-hover:text-brand">
                  {article.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">{article.subtitle}</p>
                <span className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-semibold text-brand transition-all duration-300 group-hover:translate-x-1">
                  Đọc tiếp
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
                Bạn cần tư vấn ngay?
              </h2>
              <p className="mb-10 text-lg font-normal text-text-inverse">
                Đội ngũ SunPrime sẵn sàng hỗ trợ doanh nghiệp về pháp lý, kế toán và vận hành với lộ trình rõ ràng, minh bạch ngay từ đầu.
              </p>
              <a
                href="#"
                className="inline-flex items-center justify-center rounded-lg border border-transparent bg-button-text-dark px-8 py-3.5 text-base font-semibold text-text-inverse transition-all duration-200 hover:bg-text-primary hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-border-strong focus:ring-offset-2"
              >
                Nhận tư vấn miễn phí
              </a>
            </div>

            <div className="relative w-full lg:w-1/2">
              <div className="relative aspect-[4/5] max-h-[600px] w-full overflow-hidden rounded-t-2xl lg:h-full lg:max-h-none lg:aspect-square lg:rounded-none">
                <Image
                  src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/d43228d9-eca2-4816-936c-17be2992b43e_1600w.png"
                  alt="Lawyer profile"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="h-full w-full object-cover object-top lg:scale-110"
                />
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
