import type { Lang } from "@/lib/i18n/messages";
import { siteConfig } from "@/lib/site";

/**
 * Nội dung trang pháp lý (bảo mật, điều khoản, cookie), song ngữ vi/en.
 * Bản soạn thảo dựa trên hiện trạng website (không form thu thập dữ liệu, không analytics/cookie theo dõi).
 * Cần rà soát lại bởi người có chuyên môn pháp lý và cập nhật khi website thay đổi (vd thêm form, analytics).
 */

export type LegalDocKey = "privacy" | "terms" | "cookies";

export type LegalSection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
};

export type LegalDoc = {
  title: string;
  intro: string;
  sections: LegalSection[];
};

export const LEGAL_UPDATED_AT = "2026-10-09";

const company = {
  vi: `${siteConfig.legalName} (Mã số thuế: ${siteConfig.taxId}), địa chỉ: Tầng 6, Toà nhà dầu khí, Số 2 đường 30-4, Phường Hòa Cường, TP Đà Nẵng, Việt Nam; điện thoại: 0914 699 877; email: ${siteConfig.email}.`,
  en: `${siteConfig.internationalName} (Tax code: ${siteConfig.taxId}), address: 6th Floor, Petroleum Building, 2 30-4 Street, Hoa Cuong Ward, Da Nang, Vietnam; phone: 0914 699 877; email: ${siteConfig.email}.`,
} as const;

const vi: Record<LegalDocKey, LegalDoc> = {
  privacy: {
    title: "Chính sách bảo mật",
    intro:
      "Chính sách này giải thích cách SunPrime Consulting thu thập, sử dụng và bảo vệ thông tin của bạn khi truy cập website và liên hệ với chúng tôi.",
    sections: [
      {
        heading: "1. Đơn vị chịu trách nhiệm",
        paragraphs: [company.vi],
      },
      {
        heading: "2. Thông tin chúng tôi thu thập",
        bullets: [
          "Thông tin bạn chủ động cung cấp khi liên hệ qua điện thoại, Zalo, email hoặc mạng xã hội: họ tên, số điện thoại, email, tên doanh nghiệp và nội dung yêu cầu tư vấn.",
          "Dữ liệu kỹ thuật cơ bản do hạ tầng lưu trữ ghi nhận khi truy cập (địa chỉ IP, loại trình duyệt, thời gian truy cập) nhằm vận hành và bảo mật website.",
          "Tại thời điểm cập nhật, website không có biểu mẫu thu thập dữ liệu trực tiếp và không sử dụng công cụ phân tích hay quảng cáo theo dõi.",
        ],
      },
      {
        heading: "3. Mục đích sử dụng thông tin",
        bullets: [
          "Phản hồi yêu cầu tư vấn, báo giá và hỗ trợ bạn.",
          "Thực hiện dịch vụ mà bạn đã yêu cầu hoặc đã ký thỏa thuận với chúng tôi.",
          "Đảm bảo an toàn cho website và tuân thủ nghĩa vụ theo quy định pháp luật.",
        ],
      },
      {
        heading: "4. Chia sẻ thông tin",
        paragraphs: [
          "Chúng tôi không bán thông tin cá nhân của bạn. Thông tin chỉ được chia sẻ khi cần thiết để thực hiện dịch vụ theo yêu cầu của bạn (ví dụ nộp hồ sơ cho cơ quan nhà nước thay mặt bạn), cho nhà cung cấp hạ tầng hoặc dịch vụ hỗ trợ vận hành, hoặc khi pháp luật yêu cầu.",
        ],
      },
      {
        heading: "5. Lưu trữ và bảo mật",
        paragraphs: [
          "Chúng tôi áp dụng các biện pháp kỹ thuật và quản lý hợp lý để bảo vệ thông tin. Thông tin được lưu trong thời gian cần thiết cho mục đích thu thập hoặc theo quy định pháp luật. Không có phương thức truyền tải hay lưu trữ nào an toàn tuyệt đối.",
        ],
      },
      {
        heading: "6. Quyền của bạn",
        paragraphs: [
          `Theo quy định pháp luật Việt Nam về bảo vệ dữ liệu cá nhân, bạn có quyền yêu cầu truy cập, chỉnh sửa, xóa thông tin hoặc rút lại sự đồng ý. Vui lòng gửi yêu cầu đến ${siteConfig.email}.`,
        ],
      },
      {
        heading: "7. Liên kết bên thứ ba",
        paragraphs: [
          "Website có liên kết đến Facebook, Instagram, TikTok, Zalo và Google Maps. Các nền tảng này có chính sách bảo mật riêng mà chúng tôi không kiểm soát.",
        ],
      },
      {
        heading: "8. Thay đổi chính sách",
        paragraphs: [
          "Chúng tôi có thể cập nhật chính sách này khi cần. Phiên bản mới có hiệu lực từ thời điểm đăng tải và được ghi rõ ngày cập nhật ở đầu trang.",
        ],
      },
    ],
  },
  terms: {
    title: "Điều khoản sử dụng",
    intro:
      "Khi truy cập và sử dụng website này, bạn đồng ý với các điều khoản dưới đây. Nếu không đồng ý, vui lòng ngừng sử dụng website.",
    sections: [
      {
        heading: "1. Đơn vị vận hành",
        paragraphs: [company.vi],
      },
      {
        heading: "2. Tính chất thông tin trên website",
        paragraphs: [
          "Nội dung trên website mang tính giới thiệu và tham khảo chung. Nội dung không thay thế tư vấn pháp lý, kế toán hay thuế chính thức cho từng trường hợp cụ thể. Bạn nên liên hệ để được tư vấn trước khi ra quyết định dựa trên thông tin này.",
        ],
      },
      {
        heading: "3. Dịch vụ và thỏa thuận",
        paragraphs: [
          "Quyền và nghĩa vụ giữa SunPrime Consulting và khách hàng chỉ phát sinh khi hai bên có thỏa thuận hoặc hợp đồng bằng văn bản. Phạm vi, thời hạn và chi phí dịch vụ được quy định trong thỏa thuận đó.",
        ],
      },
      {
        heading: "4. Sở hữu trí tuệ",
        paragraphs: [
          "Nội dung, logo, hình ảnh và thiết kế trên website thuộc quyền của SunPrime Consulting hoặc bên cấp phép. Bạn không được sao chép, phân phối hoặc sử dụng cho mục đích thương mại khi chưa có sự đồng ý bằng văn bản của chúng tôi.",
        ],
      },
      {
        heading: "5. Giới hạn trách nhiệm",
        paragraphs: [
          "Chúng tôi nỗ lực giữ thông tin chính xác và cập nhật nhưng không bảo đảm tuyệt đối. Trong phạm vi pháp luật cho phép, chúng tôi không chịu trách nhiệm đối với thiệt hại phát sinh do chỉ dựa vào nội dung website. Điều khoản này không loại trừ trách nhiệm mà pháp luật không cho phép loại trừ.",
        ],
      },
      {
        heading: "6. Liên kết bên ngoài",
        paragraphs: [
          "Website có thể chứa liên kết đến trang của bên thứ ba. Chúng tôi không chịu trách nhiệm về nội dung hay chính sách của các trang đó.",
        ],
      },
      {
        heading: "7. Luật áp dụng",
        paragraphs: [
          "Điều khoản này được điều chỉnh bởi pháp luật Việt Nam. Tranh chấp phát sinh sẽ được ưu tiên giải quyết bằng thương lượng; nếu không đạt được, tranh chấp được giải quyết tại tòa án có thẩm quyền tại Việt Nam.",
        ],
      },
      {
        heading: "8. Thay đổi điều khoản",
        paragraphs: [
          "Chúng tôi có thể cập nhật điều khoản khi cần. Việc tiếp tục sử dụng website sau khi cập nhật được hiểu là bạn chấp nhận phiên bản mới.",
        ],
      },
    ],
  },
  cookies: {
    title: "Chính sách cookie",
    intro:
      "Chính sách này cho biết website sử dụng cookie và công nghệ lưu trữ tương tự như thế nào.",
    sections: [
      {
        heading: "1. Cookie là gì",
        paragraphs: [
          "Cookie là tệp nhỏ được lưu trên thiết bị khi bạn truy cập website, giúp ghi nhớ lựa chọn hoặc ghi nhận hoạt động. Các công nghệ tương tự gồm bộ nhớ cục bộ (localStorage) của trình duyệt.",
        ],
      },
      {
        heading: "2. Website của chúng tôi sử dụng gì",
        bullets: [
          "Không đặt cookie theo dõi hoặc quảng cáo và không dùng công cụ phân tích tại thời điểm cập nhật.",
          "Chỉ lưu lựa chọn ngôn ngữ (vi/en) trong bộ nhớ cục bộ của trình duyệt với khóa “sunprime-lang”. Dữ liệu này không được gửi đến máy chủ của chúng tôi.",
        ],
      },
      {
        heading: "3. Dịch vụ bên thứ ba",
        bullets: [
          "Trang Liên hệ nhúng bản đồ Google Maps; Google có thể đặt cookie hoặc ghi nhận dữ liệu truy cập theo chính sách của Google khi bạn tải bản đồ.",
          "Biểu tượng giao diện được tải từ mạng phân phối nội dung (CDN) của Iconify nên nhà cung cấp này có thể ghi nhận địa chỉ IP.",
          "Khi bạn nhấn vào liên kết mạng xã hội (Facebook, Instagram, TikTok, Zalo), các nền tảng đó áp dụng chính sách cookie riêng.",
        ],
      },
      {
        heading: "4. Quản lý cookie",
        paragraphs: [
          "Bạn có thể xóa cookie và dữ liệu lưu trữ hoặc chặn cookie trong phần cài đặt của trình duyệt. Việc xóa dữ liệu sẽ đặt lại lựa chọn ngôn ngữ về mặc định.",
        ],
      },
      {
        heading: "5. Thay đổi chính sách",
        paragraphs: [
          "Nếu website bổ sung công cụ phân tích hoặc quảng cáo, chúng tôi sẽ cập nhật chính sách này trước khi áp dụng.",
        ],
      },
    ],
  },
};

const en: Record<LegalDocKey, LegalDoc> = {
  privacy: {
    title: "Privacy Policy",
    intro:
      "This policy explains how SunPrime Consulting collects, uses and protects your information when you visit this website and contact us.",
    sections: [
      {
        heading: "1. Who is responsible",
        paragraphs: [company.en],
      },
      {
        heading: "2. Information we collect",
        bullets: [
          "Information you choose to provide when you contact us by phone, Zalo, email or social media: name, phone number, email, business name and the content of your request.",
          "Basic technical data recorded by our hosting infrastructure when you visit (IP address, browser type, access time) to operate and secure the website.",
          "As of the last update, the website has no forms that collect data directly and does not use analytics or advertising trackers.",
        ],
      },
      {
        heading: "3. How we use information",
        bullets: [
          "To respond to your advisory and quotation requests and to support you.",
          "To deliver services you have requested or agreed with us.",
          "To keep the website safe and to comply with legal obligations.",
        ],
      },
      {
        heading: "4. Sharing",
        paragraphs: [
          "We do not sell your personal information. We share it only when necessary to deliver a service you requested (for example filing dossiers with government authorities on your behalf), with infrastructure or operational support providers, or when required by law.",
        ],
      },
      {
        heading: "5. Storage and security",
        paragraphs: [
          "We apply reasonable technical and organizational measures to protect information. Information is kept for as long as needed for the purpose it was collected or as required by law. No method of transmission or storage is completely secure.",
        ],
      },
      {
        heading: "6. Your rights",
        paragraphs: [
          `Under Vietnamese law on personal data protection, you may request access to, correction or deletion of your information, or withdraw your consent. Please send your request to ${siteConfig.email}.`,
        ],
      },
      {
        heading: "7. Third-party links",
        paragraphs: [
          "The website links to Facebook, Instagram, TikTok, Zalo and Google Maps. These platforms have their own privacy policies that we do not control.",
        ],
      },
      {
        heading: "8. Changes to this policy",
        paragraphs: [
          "We may update this policy when needed. A new version takes effect when published and the update date is shown at the top of the page.",
        ],
      },
    ],
  },
  terms: {
    title: "Terms of Use",
    intro:
      "By accessing and using this website you agree to the terms below. If you do not agree, please stop using the website.",
    sections: [
      {
        heading: "1. Operator",
        paragraphs: [company.en],
      },
      {
        heading: "2. Nature of the information",
        paragraphs: [
          "Content on this website is for general introduction and reference. It is not a substitute for formal legal, accounting or tax advice for a specific case. Please contact us for advice before making decisions based on this information.",
        ],
      },
      {
        heading: "3. Services and agreements",
        paragraphs: [
          "Rights and obligations between SunPrime Consulting and a client arise only when both parties have a written agreement or contract. The scope, term and fees of the service are set out in that agreement.",
        ],
      },
      {
        heading: "4. Intellectual property",
        paragraphs: [
          "Content, logos, images and design on this website belong to SunPrime Consulting or its licensors. You may not copy, distribute or use them commercially without our written consent.",
        ],
      },
      {
        heading: "5. Limitation of liability",
        paragraphs: [
          "We strive to keep information accurate and current but do not guarantee it. To the extent permitted by law, we are not liable for loss arising from relying solely on website content. These terms do not exclude liability that cannot be excluded by law.",
        ],
      },
      {
        heading: "6. External links",
        paragraphs: [
          "The website may contain links to third-party sites. We are not responsible for their content or policies.",
        ],
      },
      {
        heading: "7. Governing law",
        paragraphs: [
          "These terms are governed by the laws of Vietnam. Disputes will first be resolved through negotiation; if that fails, they will be resolved by a competent court in Vietnam.",
        ],
      },
      {
        heading: "8. Changes to the terms",
        paragraphs: [
          "We may update these terms when needed. Continued use of the website after an update means you accept the new version.",
        ],
      },
    ],
  },
  cookies: {
    title: "Cookie Policy",
    intro: "This policy explains how this website uses cookies and similar storage technologies.",
    sections: [
      {
        heading: "1. What cookies are",
        paragraphs: [
          "Cookies are small files stored on your device when you visit a website, used to remember choices or record activity. Similar technologies include the browser's local storage (localStorage).",
        ],
      },
      {
        heading: "2. What this website uses",
        bullets: [
          "It does not set tracking or advertising cookies and uses no analytics tools as of the last update.",
          "It only stores your language choice (vi/en) in the browser's local storage under the key “sunprime-lang”. This data is not sent to our servers.",
        ],
      },
      {
        heading: "3. Third-party services",
        bullets: [
          "The Contact page embeds a Google Maps map; Google may set cookies or record access data under Google's policies when you load the map.",
          "Interface icons are loaded from Iconify's content delivery network (CDN), so that provider may record your IP address.",
          "When you click social links (Facebook, Instagram, TikTok, Zalo), those platforms apply their own cookie policies.",
        ],
      },
      {
        heading: "4. Managing cookies",
        paragraphs: [
          "You can delete cookies and stored data or block cookies in your browser settings. Clearing data resets your language choice to the default.",
        ],
      },
      {
        heading: "5. Changes to this policy",
        paragraphs: [
          "If the website adds analytics or advertising tools, we will update this policy before they are applied.",
        ],
      },
    ],
  },
};

export const legalDocs: Record<Lang, Record<LegalDocKey, LegalDoc>> = { vi, en };
