/**
 * Từ điển song ngữ VI/EN cho các chuỗi giao diện tĩnh.
 * Dùng ở client: `const { lang } = useI18n(); const t = messages[lang].<namespace>;`
 * Lưu ý: nội dung động (tin tức từ API) KHÔNG nằm ở đây.
 */
export type Lang = "vi" | "en";

export const messages = {
  vi: {
    common: {
      learnMore: "Tìm hiểu thêm",
      readMore: "Đọc tiếp",
      viewAll: "Xem tất cả",
      contactCta: "Nhận tư vấn miễn phí",
      backHome: "Về trang chủ",
    },
    footer: {
      tagline: "Kế toán - Pháp lý doanh nghiệp",
      description:
        "Đồng hành cùng doanh nghiệp về pháp lý, kế toán và vận hành với quy trình rõ ràng, chi phí minh bạch.",
      taxLabel: "Mã số thuế:",
      portalButton: "Cổng B2B SunPrime",
      contactInfo: "Thông tin liên hệ",
      workingHours: "Giờ làm việc",
      hours: ["Thứ 2 - Thứ 6: 08:00 - 17:30", "Thứ 7: 08:00 - 12:00", "Chủ nhật: Nghỉ"],
      links: "Liên kết",
      viewOnMap: "Xem vị trí trên bản đồ",
      privacy: "Chính sách bảo mật",
      terms: "Điều khoản sử dụng",
      cookie: "Chính sách cookie",
      follow: "Theo dõi chúng tôi",
      rights: "Mọi quyền được bảo lưu.",
    },
    about: {
      eyebrow: "Giới thiệu SunPrime",
      mottoTitle: "Châm ngôn",
      mottos: ["Thực chiến", "Đúng luật", "Vận hành bền vững"],
      heroDesc:
        "SunPrime không chỉ tư vấn trên giấy. Chúng tôi đi cùng doanh nghiệp trong từng bước triển khai để kết quả được tạo ra trong thực tế vận hành mỗi ngày.",
      ctaServices: "Tìm hiểu dịch vụ của chúng tôi",
      aboutTitle: "Về chúng tôi",
      aboutBody:
        "Sun Prime Consulting là đơn vị tư vấn doanh nghiệp chuyên về thành lập, pháp lý, kế toán và vận hành. Chúng tôi đồng hành cùng doanh nghiệp xây dựng nền tảng chuẩn luật - rõ số - vững hệ thống, đặc biệt trong lĩnh vực nhà hàng - khách sạn.",
      visionMissionTitle: "Tầm nhìn và sứ mệnh",
      visionTitle: "Tầm nhìn",
      visionBody:
        "Trở thành đơn vị tư vấn vận hành doanh nghiệp thực chiến, đáng tin cậy hàng đầu cho ngành nhà hàng - khách sạn.",
      missionTitle: "Sứ mệnh",
      missionBody:
        "Giúp doanh nghiệp vận hành minh bạch, kiểm soát rủi ro và tăng trưởng bền vững thông qua pháp lý, kế toán và hệ thống quản trị hiệu quả.",
      coreValuesTitle: "Giá trị cốt lõi",
      coreValuesDesc:
        "Hệ giá trị của SunPrime được thiết kế liên kết như một chuỗi vận hành: từ thực chiến, tuân thủ đến phát triển dài hạn và đồng hành cùng doanh nghiệp.",
      coreValues: [
        {
          title: "Thực chiến & hiệu quả thực tế",
          description:
            "Giải pháp bám sát tình huống vận hành thật, triển khai được ngay và tạo kết quả đo lường được.",
        },
        {
          title: "Tuân thủ pháp lý - chuẩn mực kế toán",
          description:
            "Mọi quy trình và hồ sơ đều đảm bảo đúng luật, đúng hạn và đúng chuẩn số liệu theo quy định hiện hành.",
        },
        {
          title: "Tư duy hệ thống & dài hạn",
          description:
            "Xây nền tảng vận hành bền vững để doanh nghiệp kiểm soát rủi ro tốt hơn và tăng trưởng lâu dài.",
        },
        {
          title: "Minh bạch - chính trực",
          description:
            "Thông tin rõ ràng, báo cáo nhất quán, cam kết trách nhiệm trong toàn bộ quá trình đồng hành.",
        },
        {
          title: "Đồng hành cùng doanh nghiệp",
          description:
            "Không dừng ở tư vấn, SunPrime theo sát khi triển khai và hỗ trợ xử lý phát sinh trong thực tế.",
        },
      ],
      ctaContact: "Liên hệ đội ngũ SunPrime",
    },
    partners: {
      heroEyebrow: "Câu chuyện khách hàng",
      heroTitle: "Đồng hành vận hành thực chiến cùng doanh nghiệp dịch vụ.",
      heroDesc:
        "Khám phá những thương hiệu đã tối ưu vận hành, quản trị số liệu và tăng trưởng bền vững với giải pháp từ SunPrime.",
      sectionTitle: "Những khách hàng của chúng tôi",
      sectionDesc:
        "Các case đồng hành thực tế với đầy đủ dữ liệu, ngành nghề và kết quả chuyển đổi trong vận hành.",
      filterAll: "Tất cả",
      loading: "Đang tải khách hàng...",
      viewCaseStudy: "Xem case study",
      overview: "Tổng quan",
      journey: "Hành trình chuyển đổi",
      before: "Hiện trạng",
      solution: "Giải pháp SunPrime",
      metrics: "Chỉ số tác động",
      detailCta: "Xem chi tiết case study",
      close: "Đóng",
    },
    contact: {
      heroEyebrow: "Liên hệ SunPrime",
      heroTitle: "Liên hệ nhanh, đồng hành thật",
      heroDesc:
        "SunPrime luôn sẵn sàng hỗ trợ doanh nghiệp qua nhiều kênh: Facebook, Instagram, TikTok, Zalo, WhatsApp, Telegram và Email. Chọn kênh phù hợp để nhận phản hồi nhanh từ đội ngũ chuyên môn.",
      mapBtn: "Xem địa chỉ trên Google Maps",
      emailBtn: "Gửi email ngay",
      officeInfo: "Thông tin văn phòng",
      directoryEyebrow: "Danh bạ liên hệ",
      directoryTitle: "Chọn kênh bạn muốn kết nối",
      connectNow: "Kết nối ngay",
      locationEyebrow: "Vị trí văn phòng",
      mapTitle: "Bản đồ chi tiết",
      openMaps: "Mở trên Google Maps",
      mapHint: "Nhấn để mở Google Maps và chỉ đường chi tiết",
      viewDirections: "Xem đường đi",
      socialEyebrow: "Mạng xã hội",
      socialTitle: "Theo dõi SunPrime trên mạng xã hội",
      socialDesc:
        "Theo dõi SunPrime trên Facebook, Instagram và TikTok để cập nhật kiến thức, case study và hoạt động mới nhất của đội ngũ.",
      visitNow: "Truy cập ngay",
    },
    services: {
      heroTitle:
        "Thiết kế lại toàn bộ nền tảng kế toán, pháp lý và nhân sự theo chuẩn tăng trưởng bền vững.",
      heroDesc:
        "Mỗi gói dịch vụ được đóng gói theo mục tiêu vận hành thực tế, có đầu ra rõ ràng, checklist bàn giao, và lộ trình triển khai minh bạch.",
      consultNow: "Nhận tư vấn ngay",
      viewCaseStudy: "Xem case study",
      statGroups: "Nhóm dịch vụ",
      statPackages: "Gói dịch vụ chi tiết",
      statDeliverables: "Đầu mục bàn giao",
      statSteps: "Bước triển khai",
      catalogEyebrow: "Danh mục dịch vụ",
      catalogTitle: "Chi tiết dịch vụ theo từng nhóm chuyên môn",
      catalogDesc:
        "Chúng tôi tổ chức dịch vụ thành các nhóm logic để doanh nghiệp dễ chọn đúng gói cần triển khai ngay, đồng thời vẫn có lộ trình mở rộng khi quy mô tăng lên.",
      group: "Nhóm",
      keyBenefits: "Lợi ích chính",
      deliverables: "Bàn giao",
      processLabel: "Quy trình triển khai",
      collabEyebrow: "Lộ trình hợp tác",
      collabTitle: "3 bước để bắt đầu triển khai",
      collabSteps: [
        { title: "Khảo sát & chẩn đoán", description: "Đánh giá hiện trạng dữ liệu, hồ sơ pháp lý và quy trình vận hành thực tế." },
        { title: "Thiết kế gói dịch vụ", description: "Đề xuất phạm vi, SLA, timeline và đầu ra bàn giao theo đúng nhu cầu." },
        { title: "Triển khai & đồng hành", description: "Thực thi theo sprint, báo cáo định kỳ và tối ưu liên tục." },
      ],
      readyEyebrow: "Sẵn sàng bắt đầu?",
      readyTitle: "Nhận bản đề xuất dịch vụ trong 24 giờ",
      readyDesc:
        "Gửi nhu cầu của doanh nghiệp, SunPrime sẽ phản hồi bằng gợi ý gói phù hợp và timeline triển khai chi tiết.",
      viewDetail: "Xem chi tiết",
      breadcrumb: "Dịch vụ",
      consultFree: "Nhận tư vấn miễn phí",
      getProposal: "Nhận proposal chi tiết",
      serviceMetrics: "Chỉ số dịch vụ",
      quickPoints: [
        "Không trễ deadline nộp hồ sơ",
        "Theo dõi tiến độ theo từng mốc",
        "Đầu mối chuyên gia cố định",
        "Báo cáo rõ ràng, dễ hành động",
      ],
      fitEyebrow: "Dịch vụ này phù hợp cho",
      fitTitle: "Những nhóm doanh nghiệp nào?",
      scopeEyebrow: "Phạm vi hỗ trợ",
      scopeTitle: "Những gì SunPrime sẽ thực hiện",
      valueTitle: "Giá trị mang lại",
      documentsTitle: "Hồ sơ cần chuẩn bị",
      processTitle: "Làm việc bài bản theo từng giai đoạn",
      processNote: "Mỗi bước đều có checklist và người phụ trách rõ ràng",
      faqEyebrow: "Câu hỏi thường gặp",
      faqTitle: "Bạn có thể đang quan tâm",
      bookingEyebrow: "Đặt lịch tư vấn",
      bookingDesc:
        "Chia sẻ nhu cầu, chúng tôi sẽ gửi đề xuất chi tiết (SLA, chi phí, nhân sự phụ trách) trong 24 giờ.",
      relatedTitle: "Dịch vụ liên quan",
    },
    news: {
      newsTitle: "Tin tức SunPrime",
      blogTitle: "Blog SunPrime",
      readArticle: "Đọc bài viết",
      readMore: "Đọc tiếp",
      viewAll: "Xem tất cả",
      featured: "Nổi bật",
      latest: "Mới nhất",
      relatedTitle: "Bài viết liên quan",
      backToNews: "Quay lại tin tức",
      searchResult: "Kết quả cho từ khóa",
      noResults: "Chưa có bài viết phù hợp.",
      prev: "Trước",
      next: "Sau",
      readTimeSuffix: "phút đọc",
      ctaTitle: "Cần tư vấn?",
      ctaDesc: "Đội ngũ SunPrime sẵn sàng hỗ trợ doanh nghiệp của bạn.",
    },
  },
  en: {
    common: {
      learnMore: "Learn more",
      readMore: "Read more",
      viewAll: "View all",
      contactCta: "Get a free consultation",
      backHome: "Back to home",
    },
    footer: {
      tagline: "Business Accounting & Legal Advisory",
      description:
        "We accompany businesses in legal, accounting and operations with clear processes and transparent costs.",
      taxLabel: "Tax code:",
      portalButton: "SunPrime B2B Portal",
      contactInfo: "Contact information",
      workingHours: "Working hours",
      hours: ["Mon - Fri: 08:00 - 17:30", "Saturday: 08:00 - 12:00", "Sunday: Closed"],
      links: "Links",
      viewOnMap: "View location on map",
      privacy: "Privacy Policy",
      terms: "Terms of Use",
      cookie: "Cookie Policy",
      follow: "Follow us",
      rights: "All rights reserved.",
    },
    about: {
      eyebrow: "About SunPrime",
      mottoTitle: "Our motto",
      mottos: ["Hands-on", "Compliant", "Sustainable operations"],
      heroDesc:
        "SunPrime does not just advise on paper. We walk with businesses through every step of execution so that results are created in real, day-to-day operations.",
      ctaServices: "Explore our services",
      aboutTitle: "About us",
      aboutBody:
        "Sun Prime Consulting is a business advisory firm specializing in company formation, legal, accounting and operations. We help businesses build a compliant, clearly-measured and well-structured foundation, especially in the restaurant and hospitality industry.",
      visionMissionTitle: "Vision and mission",
      visionTitle: "Vision",
      visionBody:
        "To become the most trusted, hands-on business operations advisory firm for the restaurant and hospitality industry.",
      missionTitle: "Mission",
      missionBody:
        "To help businesses operate transparently, control risks and grow sustainably through effective legal, accounting and management systems.",
      coreValuesTitle: "Core values",
      coreValuesDesc:
        "SunPrime's values are designed as a connected chain of operations: from hands-on execution and compliance to long-term growth and true partnership.",
      coreValues: [
        {
          title: "Hands-on & real results",
          description:
            "Solutions grounded in real operating situations, ready to deploy immediately and producing measurable results.",
        },
        {
          title: "Legal compliance - accounting standards",
          description:
            "Every process and document is accurate, on time and aligned with current regulations and accounting standards.",
        },
        {
          title: "Systems & long-term thinking",
          description:
            "Building a sustainable operating foundation so businesses can control risks better and grow over the long run.",
        },
        {
          title: "Transparency - integrity",
          description:
            "Clear information, consistent reporting and accountable commitment throughout the entire partnership.",
        },
        {
          title: "Partnering with businesses",
          description:
            "Beyond advice, SunPrime stays close during execution and supports handling issues as they arise in practice.",
        },
      ],
      ctaContact: "Contact the SunPrime team",
    },
    partners: {
      heroEyebrow: "Customer stories",
      heroTitle: "Hands-on operations partnership for service businesses.",
      heroDesc:
        "Discover the brands that have optimized operations, mastered their numbers and grown sustainably with solutions from SunPrime.",
      sectionTitle: "Our clients",
      sectionDesc:
        "Real partnership cases with full data, industries and operational transformation results.",
      filterAll: "All",
      loading: "Loading clients...",
      viewCaseStudy: "View case study",
      overview: "Overview",
      journey: "Transformation journey",
      before: "Before",
      solution: "SunPrime solution",
      metrics: "Impact metrics",
      detailCta: "View case study details",
      close: "Close",
    },
    contact: {
      heroEyebrow: "Contact SunPrime",
      heroTitle: "Quick to reach, real partnership",
      heroDesc:
        "SunPrime is always ready to support businesses across many channels: Facebook, Instagram, TikTok, Zalo, WhatsApp, Telegram and Email. Choose the channel that suits you for a fast response from our team.",
      mapBtn: "View address on Google Maps",
      emailBtn: "Send an email now",
      officeInfo: "Office information",
      directoryEyebrow: "Contact directory",
      directoryTitle: "Choose a channel to connect",
      connectNow: "Connect now",
      locationEyebrow: "Office location",
      mapTitle: "Detailed map",
      openMaps: "Open in Google Maps",
      mapHint: "Tap to open Google Maps for detailed directions",
      viewDirections: "View directions",
      socialEyebrow: "Social channels",
      socialTitle: "Follow SunPrime on social media",
      socialDesc:
        "Follow SunPrime on Facebook, Instagram and TikTok for the latest knowledge, case studies and team activities.",
      visitNow: "Visit now",
    },
    services: {
      heroTitle:
        "Redesign your entire accounting, legal and HR foundation to a standard built for sustainable growth.",
      heroDesc:
        "Each service package is built around real operational goals, with clear outputs, a delivery checklist and a transparent rollout roadmap.",
      consultNow: "Get advice now",
      viewCaseStudy: "View case studies",
      statGroups: "Service groups",
      statPackages: "Detailed packages",
      statDeliverables: "Deliverables",
      statSteps: "Rollout steps",
      catalogEyebrow: "Service catalog",
      catalogTitle: "Service details by area of expertise",
      catalogDesc:
        "We organize services into logical groups so businesses can easily pick the right package to deploy now, while keeping a roadmap to expand as they scale.",
      group: "Group",
      keyBenefits: "Key benefits",
      deliverables: "Deliverables",
      processLabel: "Rollout process",
      collabEyebrow: "Engagement roadmap",
      collabTitle: "3 steps to get started",
      collabSteps: [
        { title: "Survey & diagnose", description: "Assess the current state of data, legal dossiers and real operating processes." },
        { title: "Design the package", description: "Propose scope, SLA, timeline and deliverables to fit your needs." },
        { title: "Deploy & accompany", description: "Execute in sprints, report periodically and optimize continuously." },
      ],
      readyEyebrow: "Ready to start?",
      readyTitle: "Get a service proposal within 24 hours",
      readyDesc:
        "Share your needs and SunPrime will respond with a suitable package suggestion and a detailed rollout timeline.",
      viewDetail: "View details",
      breadcrumb: "Services",
      consultFree: "Get a free consultation",
      getProposal: "Get a detailed proposal",
      serviceMetrics: "Service metrics",
      quickPoints: [
        "No missed submission deadlines",
        "Progress tracked at every milestone",
        "A dedicated expert point of contact",
        "Clear, actionable reporting",
      ],
      fitEyebrow: "This service is right for",
      fitTitle: "Which types of businesses?",
      scopeEyebrow: "Scope of support",
      scopeTitle: "What SunPrime will do",
      valueTitle: "The value delivered",
      documentsTitle: "Documents to prepare",
      processTitle: "Working methodically, stage by stage",
      processNote: "Every step has a clear checklist and owner",
      faqEyebrow: "Frequently asked questions",
      faqTitle: "You might be wondering",
      bookingEyebrow: "Book a consultation",
      bookingDesc:
        "Share your needs and we will send a detailed proposal (SLA, cost, assigned team) within 24 hours.",
      relatedTitle: "Related services",
    },
    news: {
      newsTitle: "SunPrime News",
      blogTitle: "SunPrime Blog",
      readArticle: "Read article",
      readMore: "Read more",
      viewAll: "View all",
      featured: "Featured",
      latest: "Latest",
      relatedTitle: "Related articles",
      backToNews: "Back to news",
      searchResult: "Results for",
      noResults: "No matching articles yet.",
      prev: "Previous",
      next: "Next",
      readTimeSuffix: "min read",
      ctaTitle: "Need advice?",
      ctaDesc: "The SunPrime team is ready to support your business.",
    },
  },
} as const;

export const getMessages = (lang: Lang) => messages[lang];
