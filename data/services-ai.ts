import type { ServiceDetailBlock, ServiceOffering } from "@/data/services";

/**
 * Dịch vụ "Giải pháp AI cho doanh nghiệp" thuộc nhóm giai-phap-so, cả vi và en (slug giống nhau).
 * - Nội dung theo brief của SunPrime; không thêm số liệu cam kết. stats chỉ nêu số hạng mục và phạm vi hoạt động.
 * - TRƯỚC KHI CÔNG BỐ, SunPrime cần xác nhận các nội dung sau đúng với thực tế vận hành và Chính sách bảo mật (data/legal.ts):
 *   (1) tự xây dựng và dùng các hệ thống này trong nội bộ trước khi tư vấn cho khách hàng;
 *   (2) cổng SunPrime Portal có chức năng như mô tả;
 *   (3) nội dung tư vấn do trợ lý AI đưa ra đều có chuyên gia rà soát;
 *   (4) người dùng luôn được biết khi nào đang trao đổi với trợ lý AI;
 *   (5) dữ liệu khách hàng không được dùng để huấn luyện mô hình của bên thứ ba.
 * - deliverables và số hạng mục trong stats được suy ra từ capabilities để không bị lệch nhau.
 * - Được gắn vào danh mục tại services-profile.ts.
 */

export const AI_SOLUTIONS_SLUG = "giai-phap-ai";

const capabilitiesVi: ServiceDetailBlock = {
  title: "Chúng tôi triển khai những gì",
  items: [
    {
      title: "Trợ lý AI tư vấn nghiệp vụ kế toán",
      description:
        "Chatbot trả lời câu hỏi về kế toán, thuế và hồ sơ pháp lý, được xây dựng dựa trên tài liệu và quy trình do đội ngũ chuyên gia của SunPrime biên soạn. Mọi nội dung tư vấn đều do chuyên gia rà soát; AI chỉ hỗ trợ phản hồi nhanh và tra cứu.",
    },
    {
      title: "Hệ thống quản lý vận hành nội bộ",
      description:
        "Cổng SunPrime Portal quản lý khách hàng, hồ sơ, tiến độ công việc và dữ liệu kế toán tập trung, thay thế cách làm thủ công trên các file rời rạc.",
    },
    {
      title: "Tự động hóa quy trình nghiệp vụ",
      description:
        "Số hóa và tự động hóa các bước lặp lại: tiếp nhận hồ sơ, nhắc hạn kê khai, tổng hợp báo cáo định kỳ và phân loại chứng từ.",
    },
    {
      title: "Tư vấn đưa AI vào doanh nghiệp",
      description:
        "Khảo sát quy trình hiện tại, xác định những điểm nghẽn phù hợp để tự động hóa và đề xuất lộ trình triển khai theo ngân sách thực tế của doanh nghiệp.",
    },
  ],
};

const capabilitiesEn: ServiceDetailBlock = {
  title: "What we deliver",
  items: [
    {
      title: "AI assistant for accounting advisory",
      description:
        "A chatbot that answers questions on accounting, tax and legal dossiers, built on documents and procedures written by SunPrime's experts. All advisory content is reviewed by experts; AI only supports fast responses and look-ups.",
    },
    {
      title: "Internal operations management system",
      description:
        "The SunPrime Portal manages clients, dossiers, task progress and accounting data in one place, replacing manual work across scattered files.",
    },
    {
      title: "Business process automation",
      description:
        "Digitizing and automating repetitive steps: receiving dossiers, reminding filing deadlines, compiling periodic reports and classifying documents.",
    },
    {
      title: "AI adoption advisory",
      description:
        "We survey your current processes, identify the bottlenecks worth automating and propose a rollout roadmap that fits your actual budget.",
    },
  ],
};

export const aiSolutionsVi: ServiceOffering = {
  slug: AI_SOLUTIONS_SLUG,
  title: "Giải pháp AI cho doanh nghiệp",
  shortDescription: "Ứng dụng AI vào vận hành: trợ lý nghiệp vụ, hệ thống quản lý nội bộ và tự động hóa quy trình.",
  heroDescription:
    "SunPrime không chỉ tư vấn kế toán - pháp lý, mà còn tự xây dựng và triển khai các hệ thống ứng dụng AI vào vận hành. Những giải pháp này được SunPrime sử dụng trong chính nội bộ trước khi tư vấn cho khách hàng.",
  excerpt:
    "Giải pháp AI cho doanh nghiệp từ SunPrime: trợ lý AI nghiệp vụ kế toán, hệ thống quản lý vận hành nội bộ, tự động hóa quy trình và tư vấn triển khai AI.",
  stats: [
    { label: "Hạng mục dịch vụ", value: String(capabilitiesVi.items.length) },
    { label: "Phạm vi", value: "Việt Nam" },
  ],
  benefits: [
    "Giảm các thao tác lặp lại trong vận hành",
    "Nội dung tư vấn luôn có chuyên gia rà soát",
    "Lộ trình phù hợp ngân sách thực tế",
  ],
  deliverables: capabilitiesVi.items.map((item) => item.title),
  process: [
    { title: "Khảo sát", description: "Tìm hiểu quy trình hiện tại và các điểm nghẽn trong vận hành." },
    {
      title: "Đề xuất lộ trình",
      description: "Chọn hạng mục phù hợp để tự động hóa và lập lộ trình theo ngân sách thực tế.",
    },
    { title: "Triển khai", description: "Triển khai từng hạng mục theo lộ trình đã thống nhất." },
  ],
  capabilities: capabilitiesVi,
  principles: {
    title: "Nguyên tắc triển khai",
    items: [
      {
        title: "Con người quyết định, AI hỗ trợ",
        description: "Mọi nội dung tư vấn chuyên môn đều có người chịu trách nhiệm cuối cùng.",
      },
      {
        title: "Minh bạch với khách hàng",
        description: "Người dùng luôn biết khi nào đang trao đổi với trợ lý AI.",
      },
      {
        title: "Bảo mật dữ liệu doanh nghiệp",
        description: "Dữ liệu khách hàng không được dùng để huấn luyện mô hình của bên thứ ba.",
      },
    ],
  },
  fitSegments: [
    "Doanh nghiệp muốn ứng dụng AI vào vận hành nhưng chưa rõ nên bắt đầu từ đâu.",
    "Đội ngũ đang dành nhiều thời gian cho các việc lặp lại như tiếp nhận hồ sơ, theo dõi hạn kê khai hay phân loại chứng từ.",
    "Chủ doanh nghiệp cần giải pháp phù hợp ngân sách thực tế, có chuyên gia chịu trách nhiệm về nội dung chuyên môn.",
  ],
  hasConsultationCta: true,
};

export const aiSolutionsEn: ServiceOffering = {
  slug: AI_SOLUTIONS_SLUG,
  title: "AI solutions for businesses",
  shortDescription:
    "Applying AI to operations: an accounting-advisory assistant, an internal management system and process automation.",
  heroDescription:
    "SunPrime does more than accounting and legal advisory: we build and deploy our own AI systems into daily operations. These solutions run inside SunPrime first, before we advise clients on them.",
  excerpt:
    "AI solutions for businesses from SunPrime: an accounting-advisory AI assistant, an internal operations system, process automation and advice on adopting AI.",
  stats: [
    { label: "Service items", value: String(capabilitiesEn.items.length) },
    { label: "Coverage", value: "Vietnam" },
  ],
  benefits: [
    "Fewer repetitive tasks in daily operations",
    "Advisory content always reviewed by an expert",
    "A roadmap that fits your real budget",
  ],
  deliverables: capabilitiesEn.items.map((item) => item.title),
  process: [
    { title: "Survey", description: "Understand your current processes and operational bottlenecks." },
    {
      title: "Propose a roadmap",
      description: "Choose the items worth automating and plan a roadmap that fits your real budget.",
    },
    { title: "Deploy", description: "Deploy each item following the agreed roadmap." },
  ],
  capabilities: capabilitiesEn,
  principles: {
    title: "Implementation principles",
    items: [
      {
        title: "People decide, AI assists",
        description: "Every piece of professional advice has a person who is ultimately accountable.",
      },
      {
        title: "Transparent to clients",
        description: "Users always know when they are talking to an AI assistant.",
      },
      {
        title: "Business data security",
        description: "Client data is not used to train third-party models.",
      },
    ],
  },
  fitSegments: [
    "Businesses that want to apply AI to operations but are unsure where to start.",
    "Teams spending a lot of time on repetitive work such as receiving dossiers, tracking filing deadlines or classifying documents.",
    "Owners who need a solution that fits their actual budget, with experts accountable for the professional content.",
  ],
  hasConsultationCta: true,
};
