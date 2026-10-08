import type { ServiceCategory, ServiceOffering } from "@/data/services";

/**
 * Dịch vụ bổ sung theo SunPrime Company Profile (PROFILE.pdf), cả vi và en.
 * - Hạng mục bàn giao (deliverables) lấy nguyên từ profile; không thêm số liệu cam kết.
 * - Phần stats chỉ dùng số hạng mục và phạm vi hoạt động (Việt Nam) có trong profile.
 * - benefits/process là diễn giải chung, nên rà soát lại trước khi công bố.
 */

export type ExtraOfferings = Record<string, ServiceOffering[]>;

/** Gắn dịch vụ bổ sung vào danh mục có sẵn và nối thêm danh mục mới (không đổi dữ liệu gốc). */
export function mergeProfileServices(
  base: readonly ServiceCategory[],
  extraOfferings: ExtraOfferings,
  extraCategories: readonly ServiceCategory[]
): ServiceCategory[] {
  return [
    ...base.map((category) => ({
      ...category,
      services: [...category.services, ...(extraOfferings[category.id] ?? [])],
    })),
    ...extraCategories,
  ];
}

/* ------------------------------------------------------------------ */
/* Tiếng Việt                                                          */
/* ------------------------------------------------------------------ */

export const profileOfferingsVi: ExtraOfferings = {
  "ke-toan": [
    {
      slug: "tu-van-thue",
      title: "Tư vấn thuế",
      shortDescription: "Tư vấn tuân thủ, hoạch định và tối ưu thuế cho doanh nghiệp.",
      heroDescription: "Đồng hành cùng doanh nghiệp xử lý thuế đúng quy định, đồng thời hoạch định và tối ưu nghĩa vụ thuế.",
      excerpt: "Dịch vụ tư vấn thuế: tuân thủ, hoạch định, hướng dẫn xử lý thuế và rà soát hồ sơ báo cáo.",
      stats: [
        { label: "Hạng mục dịch vụ", value: "4" },
        { label: "Phạm vi", value: "Việt Nam" },
      ],
      benefits: ["Xử lý thuế đúng quy định", "Chủ động hoạch định nghĩa vụ thuế", "Hồ sơ, báo cáo thuế được rà soát kỹ"],
      deliverables: [
        "Tư vấn tuân thủ thuế",
        "Hoạch định và tối ưu thuế",
        "Hướng dẫn xử lý thuế và hạch toán",
        "Rà soát hồ sơ, báo cáo liên quan đến thuế",
      ],
      process: [
        { title: "Tiếp nhận", description: "Tìm hiểu hoạt động và nghĩa vụ thuế của doanh nghiệp." },
        { title: "Tư vấn", description: "Đưa ra phương án xử lý và hoạch định thuế phù hợp." },
        { title: "Rà soát", description: "Kiểm tra hồ sơ, báo cáo thuế trước khi thực hiện." },
      ],
    },
    {
      slug: "tu-van-tai-chinh",
      title: "Tư vấn tài chính",
      shortDescription: "Tư vấn cấu trúc tài chính, dòng tiền, chi phí, lợi nhuận và giá bán.",
      heroDescription: "Giúp doanh nghiệp nhìn rõ cấu trúc tài chính, kiểm soát dòng tiền và lập kế hoạch ngân sách.",
      excerpt: "Tư vấn cấu trúc tài chính, dòng tiền, chi phí - lợi nhuận - giá bán và lập kế hoạch tài chính.",
      stats: [
        { label: "Hạng mục dịch vụ", value: "5" },
        { label: "Phạm vi", value: "Việt Nam" },
      ],
      benefits: ["Hiểu rõ cấu trúc tài chính", "Chủ động kế hoạch dòng tiền", "Cơ sở để quyết định chi phí và giá bán"],
      deliverables: [
        "Tư vấn cấu trúc tài chính & dòng tiền",
        "Tư vấn chi phí, lợi nhuận & giá bán",
        "Lập ngân sách & kế hoạch tài chính",
        "Phân tích hiệu quả tài chính",
        "Hoạch định và quản lý dòng tiền",
      ],
      process: [
        { title: "Thu thập", description: "Tiếp nhận số liệu tài chính và mục tiêu của doanh nghiệp." },
        { title: "Phân tích", description: "Đánh giá cấu trúc, chi phí, lợi nhuận và dòng tiền." },
        { title: "Kế hoạch", description: "Đề xuất ngân sách và kế hoạch tài chính cụ thể." },
      ],
    },
  ],
  "thanh-lap": [
    {
      slug: "dang-ky-thay-doi-doanh-nghiep",
      title: "Đăng ký & thay đổi thông tin doanh nghiệp",
      shortDescription: "Thay đổi địa chỉ, ngành nghề, loại hình và các thông tin đăng ký kinh doanh.",
      heroDescription: "Thực hiện các thủ tục điều chỉnh đăng ký doanh nghiệp, tạm ngừng và khôi phục mã số thuế đúng quy định.",
      excerpt: "Thủ tục thay đổi đăng ký kinh doanh, tạm ngừng hoạt động và khôi phục mã số thuế.",
      stats: [
        { label: "Hạng mục dịch vụ", value: "8" },
        { label: "Phạm vi", value: "Việt Nam" },
      ],
      benefits: ["Hồ sơ thay đổi đúng quy định", "Giảm sai sót thủ tục", "Thông tin đăng ký luôn cập nhật"],
      deliverables: [
        "Thay đổi địa chỉ trụ sở - trong hoặc ngoài phạm vi quản lý của cơ quan thuế hiện tại",
        "Bổ sung, thay đổi ngành nghề kinh doanh",
        "Thay đổi loại hình doanh nghiệp",
        "Thay đổi thông tin đăng ký doanh nghiệp",
        "Cấp lại Giấy chứng nhận đăng ký doanh nghiệp",
        "Tạm ngừng hoạt động kinh doanh",
        "Hoạt động trở lại trước thời hạn tạm ngừng đã đăng ký",
        "Khôi phục mã số thuế",
      ],
      process: [
        { title: "Tư vấn", description: "Xác định nội dung cần thay đổi và hồ sơ liên quan." },
        { title: "Soạn hồ sơ", description: "Chuẩn bị và nộp hồ sơ theo đúng thủ tục." },
        { title: "Bàn giao", description: "Nhận kết quả và hướng dẫn các bước tiếp theo." },
      ],
    },
    {
      slug: "giai-the-dong-cua-doanh-nghiep",
      title: "Giải thể & đóng cửa doanh nghiệp",
      shortDescription: "Giải thể công ty, chi nhánh, văn phòng đại diện và đóng địa điểm kinh doanh.",
      heroDescription: "Hoàn tất thủ tục chấm dứt hoạt động của công ty, chi nhánh, văn phòng đại diện hoặc địa điểm kinh doanh.",
      excerpt: "Dịch vụ giải thể công ty, chi nhánh, văn phòng đại diện và đóng địa điểm kinh doanh.",
      stats: [
        { label: "Hạng mục dịch vụ", value: "4" },
        { label: "Phạm vi", value: "Việt Nam" },
      ],
      benefits: ["Thực hiện đúng trình tự thủ tục", "Hạn chế rủi ro tồn đọng nghĩa vụ", "Có người theo dõi hồ sơ đến khi hoàn tất"],
      deliverables: ["Giải thể công ty", "Giải thể chi nhánh", "Giải thể văn phòng đại diện", "Đóng địa điểm kinh doanh"],
      process: [
        { title: "Rà soát", description: "Kiểm tra tình trạng pháp lý, thuế và nghĩa vụ còn tồn." },
        { title: "Thực hiện", description: "Soạn và nộp hồ sơ giải thể hoặc đóng cửa." },
        { title: "Hoàn tất", description: "Theo dõi đến khi có kết quả xử lý." },
      ],
    },
  ],
};

export const profileCategoriesVi: ServiceCategory[] = [
  {
    id: "giai-phap-so",
    title: "Giải pháp số cho doanh nghiệp",
    summary: "Công cụ số để doanh nghiệp vận hành và kê khai thuận tiện hơn.",
    description: "Chữ ký số, hóa đơn điện tử, phần mềm bán hàng, phần mềm kế toán và các công cụ vận hành.",
    accent: "from-stone-300/70 via-amber-100/70 to-orange-50",
    icon: "solar:monitor-smartphone-bold-duotone",
    services: [
      {
        slug: "chu-ky-so-hoa-don-dien-tu",
        title: "Chữ ký số & hóa đơn điện tử",
        shortDescription: "Cung cấp chữ ký số và giải pháp hóa đơn điện tử cho doanh nghiệp.",
        heroDescription: "Trang bị chữ ký số và hóa đơn điện tử để doanh nghiệp giao dịch, kê khai và phát hành hóa đơn đúng quy định.",
        excerpt: "Dịch vụ chữ ký số và giải pháp hóa đơn điện tử cho doanh nghiệp tại Việt Nam.",
        stats: [
          { label: "Hạng mục dịch vụ", value: "2" },
          { label: "Phạm vi", value: "Việt Nam" },
        ],
        benefits: ["Sẵn sàng giao dịch điện tử", "Phát hành hóa đơn đúng quy định", "Giảm thao tác thủ công"],
        deliverables: ["Dịch vụ chữ ký số", "Giải pháp hóa đơn điện tử"],
        process: [
          { title: "Tư vấn", description: "Xác định nhu cầu và giải pháp phù hợp." },
          { title: "Triển khai", description: "Đăng ký và cài đặt chữ ký số, hóa đơn điện tử." },
          { title: "Hướng dẫn", description: "Hướng dẫn sử dụng cho đội ngũ doanh nghiệp." },
        ],
      },
      {
        slug: "phan-mem-ban-hang-ke-toan",
        title: "Phần mềm bán hàng, kế toán & công cụ vận hành",
        shortDescription: "Giải pháp phần mềm POS, kế toán và công cụ số cho vận hành doanh nghiệp.",
        heroDescription: "Triển khai phần mềm quản lý bán hàng (POS), phần mềm kế toán và các hệ thống số hỗ trợ vận hành.",
        excerpt: "Phần mềm POS, phần mềm kế toán và công cụ số cho vận hành doanh nghiệp.",
        stats: [
          { label: "Hạng mục dịch vụ", value: "3" },
          { label: "Phạm vi", value: "Việt Nam" },
        ],
        benefits: ["Quản lý bán hàng tập trung", "Số liệu kế toán đồng bộ", "Công cụ số phù hợp quy mô doanh nghiệp"],
        deliverables: [
          "Phần mềm bán hàng / quản lý bán hàng (POS)",
          "Phần mềm kế toán",
          "Công cụ và hệ thống số cho vận hành doanh nghiệp",
        ],
        process: [
          { title: "Khảo sát", description: "Tìm hiểu quy trình bán hàng và kế toán hiện tại." },
          { title: "Triển khai", description: "Cài đặt và cấu hình giải pháp phù hợp." },
          { title: "Đồng hành", description: "Hướng dẫn sử dụng và hỗ trợ trong quá trình vận hành." },
        ],
      },
    ],
  },
  {
    id: "marketing",
    title: "Marketing & phát triển kinh doanh",
    summary: "Quản trị marketing và đào tạo để doanh nghiệp tăng trưởng.",
    description: "Từ mạng xã hội, quảng cáo số, website đến đào tạo marketing cho chủ doanh nghiệp và quản lý.",
    accent: "from-orange-200/70 via-amber-100/80 to-stone-100/80",
    icon: "solar:chart-2-bold-duotone",
    services: [
      {
        slug: "quan-tri-marketing",
        title: "Quản trị marketing",
        shortDescription: "Quản trị mạng xã hội, quảng cáo số, thương hiệu, website và dữ liệu marketing.",
        heroDescription: "Vận hành marketing từ nội dung, quảng cáo, hệ thống dữ liệu đến website để doanh nghiệp tăng trưởng.",
        excerpt: "Dịch vụ quản trị mạng xã hội, growth marketing, quảng cáo số, website và landing page.",
        stats: [
          { label: "Hạng mục dịch vụ", value: "6" },
          { label: "Phạm vi", value: "Việt Nam" },
        ],
        benefits: ["Marketing vận hành có hệ thống", "Quản lý quảng cáo và dữ liệu tập trung", "Thương hiệu nhất quán trên các kênh"],
        deliverables: [
          "Quản trị mạng xã hội & Product House",
          "Growth Marketing",
          "Hệ thống marketing, quảng cáo & quản lý dữ liệu",
          "Tư vấn vận hành thương hiệu & marketing",
          "Thiết kế website & landing page",
          "Quản lý quảng cáo số (Facebook, Instagram, TikTok, Google Maps)",
        ],
        process: [
          { title: "Khảo sát", description: "Đánh giá thương hiệu, kênh và mục tiêu tăng trưởng." },
          { title: "Thiết lập", description: "Xây dựng hệ thống nội dung, quảng cáo và dữ liệu." },
          { title: "Vận hành", description: "Triển khai, theo dõi và tối ưu theo kết quả." },
        ],
      },
      {
        slug: "dao-tao-marketing",
        title: "Đào tạo marketing",
        shortDescription: "Đào tạo marketing nền tảng cho chủ doanh nghiệp và quản lý.",
        heroDescription: "Trang bị kiến thức marketing nền tảng và tư vấn chiến lược, triển khai cho chủ doanh nghiệp, quản lý.",
        excerpt: "Đào tạo marketing nền tảng và tư vấn chiến lược - triển khai marketing.",
        stats: [
          { label: "Hạng mục dịch vụ", value: "2" },
          { label: "Phạm vi", value: "Việt Nam" },
        ],
        benefits: ["Nắm nền tảng marketing", "Đội ngũ quản lý cùng ngôn ngữ", "Định hướng chiến lược và triển khai rõ ràng"],
        deliverables: [
          "Đào tạo marketing nền tảng cho chủ doanh nghiệp & quản lý",
          "Tư vấn chiến lược & triển khai marketing",
        ],
        process: [
          { title: "Trao đổi", description: "Tìm hiểu nhu cầu và trình độ hiện tại của đội ngũ." },
          { title: "Đào tạo", description: "Truyền đạt nội dung phù hợp với doanh nghiệp." },
          { title: "Tư vấn", description: "Định hướng chiến lược và hỗ trợ triển khai." },
        ],
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* English                                                             */
/* ------------------------------------------------------------------ */

export const profileOfferingsEn: ExtraOfferings = {
  "ke-toan": [
    {
      slug: "tu-van-thue",
      title: "Tax advisory",
      shortDescription: "Tax compliance, planning and optimization advice for businesses.",
      heroDescription: "We help businesses handle tax in line with regulations while planning and optimizing their tax obligations.",
      excerpt: "Tax advisory: compliance, planning, tax treatment guidance and review of tax documentation.",
      stats: [
        { label: "Service items", value: "4" },
        { label: "Coverage", value: "Vietnam" },
      ],
      benefits: ["Tax handled in line with regulations", "Proactive tax planning", "Tax documents and reports carefully reviewed"],
      deliverables: [
        "Tax compliance advisory",
        "Tax planning and optimization",
        "Tax treatment and accounting guidance",
        "Review of tax-related documentation and reporting",
      ],
      process: [
        { title: "Intake", description: "Understand the business and its tax obligations." },
        { title: "Advise", description: "Propose suitable tax treatment and planning options." },
        { title: "Review", description: "Check documents and tax reports before execution." },
      ],
    },
    {
      slug: "tu-van-tai-chinh",
      title: "Financial advisory",
      shortDescription: "Advice on financial structure, cash flow, costs, profitability and pricing.",
      heroDescription: "We help businesses see their financial structure clearly, control cash flow and plan budgets.",
      excerpt: "Financial structure, cash flow, cost - profitability - pricing advice and financial planning.",
      stats: [
        { label: "Service items", value: "5" },
        { label: "Coverage", value: "Vietnam" },
      ],
      benefits: ["Clear view of financial structure", "Proactive cash flow planning", "A basis for cost and pricing decisions"],
      deliverables: [
        "Financial structure & cash flow advisory",
        "Cost, profitability & pricing advisory",
        "Budgeting & financial planning",
        "Financial performance analysis",
        "Cash flow planning and management",
      ],
      process: [
        { title: "Collect", description: "Gather financial data and the business's goals." },
        { title: "Analyze", description: "Assess structure, costs, profitability and cash flow." },
        { title: "Plan", description: "Propose a concrete budget and financial plan." },
      ],
    },
  ],
  "thanh-lap": [
    {
      slug: "dang-ky-thay-doi-doanh-nghiep",
      title: "Corporate registration & amendments",
      shortDescription: "Change address, business lines, legal form and other registration details.",
      heroDescription: "We handle business registration amendments, temporary suspension and Tax Identification Number restoration in line with regulations.",
      excerpt: "Registration amendments, temporary suspension and Tax Identification Number restoration.",
      stats: [
        { label: "Service items", value: "8" },
        { label: "Coverage", value: "Vietnam" },
      ],
      benefits: ["Amendment dossiers that comply with regulations", "Fewer procedural errors", "Registration details kept up to date"],
      deliverables: [
        "Change of registered business address - within or outside the current tax authority's jurisdiction",
        "Addition or amendment of business lines",
        "Change of company type / legal form",
        "Amendment of business registration information",
        "Re-issuance of Business Registration Certificate",
        "Temporary suspension of business operations",
        "Resumption of business operations before the registered suspension period ends",
        "Restoration of Tax Identification Number (TIN)",
      ],
      process: [
        { title: "Advise", description: "Identify what needs to change and the related dossiers." },
        { title: "Prepare", description: "Prepare and submit the dossier per the proper procedure." },
        { title: "Hand over", description: "Receive results and guidance on next steps." },
      ],
    },
    {
      slug: "giai-the-dong-cua-doanh-nghiep",
      title: "Business closure & dissolution",
      shortDescription: "Dissolve companies, branches and representative offices, or close business locations.",
      heroDescription: "We complete the procedures to end operations of a company, branch, representative office or business location.",
      excerpt: "Dissolution of companies, branches and representative offices, and closure of business locations.",
      stats: [
        { label: "Service items", value: "4" },
        { label: "Coverage", value: "Vietnam" },
      ],
      benefits: ["Procedures followed in the right order", "Lower risk of outstanding obligations", "Someone tracking the dossier until completion"],
      deliverables: ["Company dissolution", "Branch dissolution", "Representative Office dissolution", "Business Location closure"],
      process: [
        { title: "Review", description: "Check legal and tax status and any outstanding obligations." },
        { title: "Execute", description: "Prepare and submit the dissolution or closure dossier." },
        { title: "Complete", description: "Follow up until the result is issued." },
      ],
    },
  ],
};

export const profileCategoriesEn: ServiceCategory[] = [
  {
    id: "giai-phap-so",
    title: "Digital Business Solutions",
    summary: "Digital tools that make operations and tax filing easier.",
    description: "Digital signatures, e-invoicing, sales and accounting software, and operational tools.",
    accent: "from-stone-300/70 via-amber-100/70 to-orange-50",
    icon: "solar:monitor-smartphone-bold-duotone",
    services: [
      {
        slug: "chu-ky-so-hoa-don-dien-tu",
        title: "Digital signature & e-invoicing",
        shortDescription: "Digital signature services and electronic invoicing solutions for businesses.",
        heroDescription: "We equip businesses with digital signatures and e-invoicing so they can transact, file and issue invoices in line with regulations.",
        excerpt: "Digital signature services and electronic invoicing solutions for businesses in Vietnam.",
        stats: [
          { label: "Service items", value: "2" },
          { label: "Coverage", value: "Vietnam" },
        ],
        benefits: ["Ready for electronic transactions", "Invoices issued in line with regulations", "Less manual work"],
        deliverables: ["Digital signature services", "Electronic invoicing solutions"],
        process: [
          { title: "Advise", description: "Identify needs and the right solution." },
          { title: "Deploy", description: "Register and set up digital signatures and e-invoicing." },
          { title: "Guide", description: "Train your team to use the tools." },
        ],
      },
      {
        slug: "phan-mem-ban-hang-ke-toan",
        title: "Sales & accounting software and operational tools",
        shortDescription: "POS, accounting software and digital tools for business operations.",
        heroDescription: "We deploy Point-of-Sale (POS) / sales management software, accounting software and digital systems that support operations.",
        excerpt: "POS software, accounting software and digital tools for business operations.",
        stats: [
          { label: "Service items", value: "3" },
          { label: "Coverage", value: "Vietnam" },
        ],
        benefits: ["Centralized sales management", "Accounting data kept in sync", "Digital tools that fit your scale"],
        deliverables: [
          "Point-of-Sale (POS) / sales management software",
          "Accounting software",
          "Digital tools and systems for business operations",
        ],
        process: [
          { title: "Survey", description: "Understand your current sales and accounting workflow." },
          { title: "Deploy", description: "Install and configure the right solution." },
          { title: "Support", description: "Guide usage and support you during operation." },
        ],
      },
    ],
  },
  {
    id: "marketing",
    title: "Marketing & Business Growth",
    summary: "Marketing management and training to help businesses grow.",
    description: "From social media, digital advertising and websites to marketing training for owners and managers.",
    accent: "from-orange-200/70 via-amber-100/80 to-stone-100/80",
    icon: "solar:chart-2-bold-duotone",
    services: [
      {
        slug: "quan-tri-marketing",
        title: "Marketing management",
        shortDescription: "Social media, digital advertising, brand, website and marketing data management.",
        heroDescription: "We run marketing from content and advertising to data systems and websites to help businesses grow.",
        excerpt: "Social media management, growth marketing, digital advertising, websites and landing pages.",
        stats: [
          { label: "Service items", value: "6" },
          { label: "Coverage", value: "Vietnam" },
        ],
        benefits: ["Marketing run as a system", "Advertising and data managed in one place", "Consistent brand across channels"],
        deliverables: [
          "Social Media Management & Product House",
          "Growth Marketing",
          "Marketing Systems, Advertising & Data Management",
          "Brand & Marketing Operations Advisory",
          "Website & Landing Page Development",
          "Digital Advertising Management (Facebook, Instagram, TikTok, Google Maps)",
        ],
        process: [
          { title: "Survey", description: "Assess the brand, channels and growth goals." },
          { title: "Set up", description: "Build the content, advertising and data systems." },
          { title: "Operate", description: "Execute, track and optimize based on results." },
        ],
      },
      {
        slug: "dao-tao-marketing",
        title: "Marketing training",
        shortDescription: "Fundamental marketing training for business owners and managers.",
        heroDescription: "We give business owners and managers fundamental marketing knowledge, plus strategy and execution advisory.",
        excerpt: "Fundamental marketing training and marketing strategy & execution advisory.",
        stats: [
          { label: "Service items", value: "2" },
          { label: "Coverage", value: "Vietnam" },
        ],
        benefits: ["Solid marketing fundamentals", "Managers speaking the same language", "Clear strategy and execution direction"],
        deliverables: [
          "Fundamental Marketing Training for Business Owners & Managers",
          "Marketing Strategy & Execution Advisory",
        ],
        process: [
          { title: "Discuss", description: "Understand your team's needs and current level." },
          { title: "Train", description: "Deliver content tailored to your business." },
          { title: "Advise", description: "Set strategic direction and support execution." },
        ],
      },
    ],
  },
];
