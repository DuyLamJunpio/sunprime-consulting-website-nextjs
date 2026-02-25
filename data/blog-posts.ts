export type BlogSection = {
  heading: string;
  paragraphs: string[];
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  publishedAt: string;
  readTime: string;
  featured: boolean;
  pinnedOrder?: number;
  image?: string;
  coverGradient: string;
  tags: string[];
  highlights: string[];
  sections: BlogSection[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: 'doanh-nghiep-nen-bat-dau-chuan-hoa-tai-chinh-tu-dau',
    title: 'Doanh nghiệp nên bắt đầu chuẩn hóa tài chính từ đâu?',
    excerpt:
      'Nhìn đúng ba điểm nghẽn tài chính phổ biến trong 6 tháng đầu giúp doanh nghiệp tiết kiệm chi phí và hạn chế sai sót.',
    category: 'Tài chính doanh nghiệp',
    author: 'Ban biên tập SunPrime',
    publishedAt: '2026-02-01',
    readTime: '8 phút đọc',
    featured: true,
    pinnedOrder: 1,
    image: '/blog-tai-chinh.svg',
    coverGradient: 'from-amber-100 via-orange-50 to-neutral-100',
    tags: ['Tài chính', 'Vận hành', 'Khởi nghiệp'],
    highlights: [
      'Xác định quy trình đối soát dòng tiền ngay từ tuần đầu tiên.',
      'Xây dựng bộ KPI tài chính gọn nhẹ cho founder.',
      'Thiết lập lịch báo cáo định kỳ để ra quyết định nhanh.',
    ],
    sections: [
      {
        heading: 'Vì sao giai đoạn đầu dễ phát sinh sai sót?',
        paragraphs: [
          'Khi doanh nghiệp còn nhỏ, chủ doanh nghiệp thường ưu tiên bán hàng và marketing. Các đầu việc tài chính và kế toán bị đẩy xuống sau, dẫn đến dữ liệu không đồng nhất và khó tổng hợp.',
          'Nếu không có một khung theo dõi ngay từ đầu, chi phí vận hành dễ bị tràn ngân sách và không có căn cứ để tính toán lợi nhuận thật.',
        ],
      },
      {
        heading: 'Ba việc cần làm ngay trong 30 ngày đầu',
        paragraphs: [
          'Thứ nhất, thống nhất danh mục thu chi và cách ghi nhận giao dịch cho toàn bộ đội ngũ. Thứ hai, đặt lịch đối soát tiền vào cuối ngày hoặc cuối tuần. Thứ ba, lập dashboard tổng quan cho các chỉ số quan trọng.',
          'Ba bước này giúp doanh nghiệp tạo nền tảng dữ liệu sạch, từ đó dễ dàng lập kế hoạch tài chính cho quý tiếp theo.',
        ],
      },
    ],
  },
  {
    slug: '5-dau-hieu-he-thong-ke-toan-dang-qua-tai',
    title: '5 dấu hiệu hệ thống kế toán đang quá tải',
    excerpt:
      'Nếu bộ phận kế toán liên tục chạy deadline, đây là lúc doanh nghiệp cần tái cấu trúc quy trình và phân quyền rõ ràng.',
    category: 'Kế toán vận hành',
    author: 'Nhóm phân tích SunPrime',
    publishedAt: '2026-01-24',
    readTime: '6 phút đọc',
    featured: false,
    pinnedOrder: 2,
    image: '/blog-ke-toan.svg',
    coverGradient: 'from-slate-100 via-zinc-50 to-neutral-100',
    tags: ['Kế toán', 'Hệ thống', 'Năng suất'],
    highlights: [
      'Báo cáo nội bộ bị trễ lặp lại hơn 2 kỳ liên tiếp.',
      'Chứng từ đến trễ và không có người chịu trách nhiệm rõ ràng.',
      'Không có checklist cho các kỳ nhỏ thường xuyên.',
    ],
    sections: [
      {
        heading: 'Dấu hiệu 1 đến 3',
        paragraphs: [
          'Dấu hiệu đầu tiên là tồn đọng chứng từ tăng nhanh vào cuối tháng. Dấu hiệu thứ hai là bộ phận kế toán liên tục tăng ca để xử lý công việc lặp lại. Dấu hiệu thứ ba là số liệu giữa kế toán và vận hành không khớp.',
        ],
      },
      {
        heading: 'Dấu hiệu 4 đến 5',
        paragraphs: [
          'Dấu hiệu thứ tư là tỷ lệ điều chỉnh bút toán sau khi khóa sổ tăng cao. Dấu hiệu thứ năm là lãnh đạo không nhận được báo cáo đúng hạn để ra quyết định.',
          'Khi gặp các dấu hiệu trên, doanh nghiệp nên ưu tiên chuẩn hóa quy trình và xác lập người phụ trách theo từng nhóm việc.',
        ],
      },
    ],
  },
  {
    slug: 'huong-dan-doc-bao-cao-tai-chinh-cho-founder',
    title: 'Hướng dẫn đọc báo cáo tài chính cho founder không chuyên',
    excerpt:
      'Bạn không cần là kế toán vẫn có thể đọc nhanh tình hình doanh nghiệp qua 3 báo cáo cốt lõi và 6 chỉ số quan trọng.',
    category: 'Quản trị',
    author: 'Ban biên tập SunPrime',
    publishedAt: '2026-01-15',
    readTime: '10 phút đọc',
    featured: true,
    pinnedOrder: 3,
    image: '/blog-bao-cao.svg',
    coverGradient: 'from-emerald-100 via-teal-50 to-neutral-100',
    tags: ['Founder', 'Báo cáo', 'Quản trị'],
    highlights: [
      'Đọc bảng cân đối để nhìn sức khỏe tài sản và nợ.',
      'Đọc báo cáo kết quả kinh doanh để đánh giá biên lợi nhuận.',
      'Đọc lưu chuyển tiền tệ để xác nhận sức khỏe dòng tiền.',
    ],
    sections: [
      {
        heading: 'Ba báo cáo cốt lõi',
        paragraphs: [
          'Bảng cân đối cho thấy doanh nghiệp đang sở hữu gì và đang nợ bao nhiêu. Báo cáo kết quả kinh doanh cho thấy hiệu quả tạo lợi nhuận theo kỳ. Báo cáo lưu chuyển tiền tệ giúp nhìn rõ tiền đang vào ra như thế nào.',
        ],
      },
      {
        heading: 'Sáu chỉ số cần theo dõi',
        paragraphs: [
          'Founder nên theo dõi biên lợi nhuận gộp, biên lợi nhuận ròng, chu kỳ thu tiền, tỷ lệ nợ ngắn hạn, chi phí vận hành trên doanh thu và dòng tiền thuần.',
          'Đặt ngưỡng cảnh báo cho từng chỉ số sẽ giúp đội ngũ ra quyết định trước khi vấn đề trở nên nghiêm trọng.',
        ],
      },
    ],
  },
  {
    slug: 'toi-uu-chi-phi-nhan-su-ma-van-dung-luat',
    title: 'Tối ưu chi phí nhân sự mà vẫn đúng luật',
    excerpt:
      'Tối ưu không có nghĩa cắt giảm vô tội vạ. Cách đúng là tái thiết kế quy trình, hợp đồng và KPI theo mục tiêu kinh doanh.',
    category: 'Nhân sự',
    author: 'Bàn nhân sự SunPrime',
    publishedAt: '2026-01-06',
    readTime: '7 phút đọc',
    featured: false,
    pinnedOrder: 4,
    image: '/blog-nhan-su.svg',
    coverGradient: 'from-indigo-100 via-violet-50 to-neutral-100',
    tags: ['Nhân sự', 'Pháp lý lao động', 'Hiệu suất'],
    highlights: [
      'Rà soát cơ cấu lương thưởng theo vai trò và kết quả.',
      'Chuẩn hóa mẫu hợp đồng và phụ lục ngay từ đầu.',
      'Đồng bộ KPI giữa phòng ban và mục tiêu quý.',
    ],
    sections: [
      {
        heading: 'Tối ưu đúng cách',
        paragraphs: [
          'Doanh nghiệp nên bắt đầu bằng việc map lại các vai trò cốt lõi và bổ sung chỉ tiêu đánh giá kết quả rõ ràng. Việc này giúp trả lương theo hiệu suất thay vì cảm tính.',
          'Bên cạnh đó, hợp đồng và nội quy cần được cập nhật để hạn chế tranh chấp khi quy mô đội ngũ tăng nhanh.',
        ],
      },
      {
        heading: 'Kế hoạch 90 ngày',
        paragraphs: [
          'Trong 30 ngày đầu, rà soát hệ thống hợp đồng và lương thưởng. Từ ngày 31 đến 60, xây KPI cho các nhóm vai trò. Từ ngày 61 đến 90, đánh giá thử nghiệm và điều chỉnh theo dữ liệu thực tế.',
        ],
      },
    ],
  },
];

export const blogPostSlugs = blogPosts.map((post) => post.slug);

export const getBlogPostBySlug = (slug: string) => blogPosts.find((post) => post.slug === slug);
