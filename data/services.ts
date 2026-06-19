import type { Lang } from "@/lib/i18n/messages";

export type ServiceStat = {
  label: string;
  value: string;
};

export type ServiceProcess = {
  title: string;
  description: string;
};

export type ServiceOffering = {
  slug: string;
  title: string;
  shortDescription: string;
  heroDescription: string;
  excerpt: string;
  stats: ServiceStat[];
  benefits: string[];
  deliverables: string[];
  process: ServiceProcess[];
  documents?: string[];
};

export type ServiceCategory = {
  id: string;
  title: string;
  summary: string;
  description: string;
  accent: string;
  icon: string;
  services: ServiceOffering[];
};

export const serviceCategories: ServiceCategory[] = [
  {
    id: 'ke-toan',
    title: 'Kế toán',
    summary: 'Vận hành phòng kế toán thuê ngoài có quy trình minh bạch.',
    description: 'Đồng hành từ hạch toán, kê khai thuế đến kiểm soát rủi ro kế toán.',
    accent: 'from-amber-200/70 via-orange-100/70 to-yellow-100/80',
    icon: 'solar:bill-list-bold-duotone',
    services: [
      {
        slug: 'ke-toan-tron-goi',
        title: 'Kế toán trọn gói cho hộ kinh doanh & doanh nghiệp',
        shortDescription: 'Thuê ngoài toàn bộ phòng kế toán với báo cáo định kỳ.',
        heroDescription: 'Triển khai phòng kế toán thuê ngoài theo chuẩn VAS và vận hành theo SLA rõ ràng.',
        excerpt: 'Giải pháp kế toán trọn gói giúp doanh nghiệp tối ưu chi phí và kiểm soát số liệu.',
        stats: [
          { label: 'Thời gian triển khai', value: '3-5 ngày' },
          { label: 'Chu kỳ báo cáo', value: 'Tuần / Tháng' },
        ],
        benefits: ['Tối ưu chi phí nhân sự kế toán', 'Báo cáo minh bạch theo kỳ', 'Chuẩn hóa quy trình chứng từ'],
        deliverables: ['Thiết lập hệ thống tài khoản', 'Hạch toán nghiệp vụ', 'Đối chiếu công nợ và ngân hàng'],
        process: [
          { title: 'Khảo sát', description: 'Đánh giá dữ liệu và nhu cầu vận hành.' },
          { title: 'Thiết lập', description: 'Chuẩn hóa quy trình và biểu mẫu chứng từ.' },
          { title: 'Vận hành', description: 'Hạch toán và báo cáo định kỳ theo SLA.' },
        ],
      },
      {
        slug: 'ke-khai-va-quyet-toan-thue',
        title: 'Kê khai & quyết toán thuế GTGT, TNCN, TNDN',
        shortDescription: 'Kê khai đúng hạn, chuẩn hồ sơ và hỗ trợ giải trình.',
        heroDescription: 'Đảm bảo doanh nghiệp kê khai đúng hạn và quyết toán chuẩn theo quy định hiện hành.',
        excerpt: 'Dịch vụ kê khai và quyết toán thuế giúp giảm rủi ro phạt chậm nộp.',
        stats: [
          { label: 'Nhắc hạn', value: '100%' },
          { label: 'Thời gian xử lý', value: '1-2 ngày/kỳ' },
        ],
        benefits: ['Không trễ hạn kê khai', 'Hỗ trợ giải trình khi thanh tra', 'Cập nhật chính sách thuế mới'],
        deliverables: ['Lập tờ khai GTGT/TNCN/TNDN', 'Nộp hồ sơ điện tử', 'Chuẩn bị hồ sơ quyết toán'],
        process: [
          { title: 'Rà soát', description: 'Kiểm tra dữ liệu hóa đơn và bút toán thuế.' },
          { title: 'Kê khai', description: 'Lập tờ khai và nộp đúng hạn.' },
          { title: 'Quyết toán', description: 'Hoàn thiện hồ sơ và giải trình khi cần.' },
        ],
      },
      {
        slug: 'lap-so-sach-chuan-muc',
        title: 'Lập sổ sách kế toán theo đúng chuẩn mực',
        shortDescription: 'Chuẩn hóa hệ thống sổ sách phục vụ kiểm toán và quản trị.',
        heroDescription: 'Dọn dữ liệu và lập sổ sách kế toán chuẩn để doanh nghiệp yên tâm vận hành.',
        excerpt: 'Lập sổ sách kế toán đầy đủ theo chuẩn mực và quy định hiện hành.',
        stats: [
          { label: 'Thời gian hoàn tất', value: '15-30 ngày' },
          { label: 'Phạm vi', value: '12-24 tháng dữ liệu' },
        ],
        benefits: ['Số liệu sạch, dễ kiểm soát', 'Sẵn sàng cho kiểm toán', 'Giảm rủi ro sai lệch'],
        deliverables: ['Phân loại chứng từ', 'Lập nhật ký và sổ chi tiết', 'Đối chiếu số liệu tổng hợp'],
        process: [
          { title: 'Thu thập', description: 'Tiếp nhận dữ liệu và chứng từ liên quan.' },
          { title: 'Hạch toán', description: 'Lập sổ chi tiết và sổ tổng hợp.' },
          { title: 'Bàn giao', description: 'Bàn giao bộ sổ và hướng dẫn sử dụng.' },
        ],
      },
      {
        slug: 'bao-cao-tai-chinh-dinh-ky',
        title: 'Báo cáo tài chính tháng / quý / năm',
        shortDescription: 'Bộ báo cáo tài chính và quản trị trực quan cho lãnh đạo.',
        heroDescription: 'Thiết lập báo cáo định kỳ rõ ràng để ra quyết định nhanh và chính xác.',
        excerpt: 'Báo cáo tài chính định kỳ theo chuẩn pháp lý và nhu cầu quản trị.',
        stats: [
          { label: 'Chu kỳ cập nhật', value: 'Tháng / Quý' },
          { label: 'Bàn giao', value: '72h sau chốt số liệu' },
        ],
        benefits: ['Dễ đọc, dễ hành động', 'Theo dõi KPI trọng yếu', 'Hỗ trợ kế hoạch tài chính'],
        deliverables: ['BCTC theo quy định', 'Dashboard quản trị', 'Báo cáo phân tích xu hướng'],
        process: [
          { title: 'Xác định KPI', description: 'Thống nhất chỉ số quản trị trọng tâm.' },
          { title: 'Lập báo cáo', description: 'Chuẩn hóa dữ liệu và dựng báo cáo.' },
          { title: 'Trình bày', description: 'Tư vấn hành động dựa trên số liệu.' },
        ],
      },
      {
        slug: 'dai-dien-co-quan-thue',
        title: 'Đại diện làm việc với cơ quan thuế',
        shortDescription: 'Đại diện doanh nghiệp khi làm việc, kiểm tra và giải trình thuế.',
        heroDescription: 'Đồng hành cùng doanh nghiệp trong các buổi làm việc với cơ quan thuế.',
        excerpt: 'Giảm áp lực và rủi ro khi thanh kiểm tra thuế.',
        stats: [
          { label: 'Tỷ lệ hồ sơ hoàn tất', value: '98%' },
          { label: 'Phản hồi', value: '<24h' },
        ],
        benefits: ['Chuẩn hồ sơ đầy đủ', 'Giải trình có chiến lược', 'Tiết kiệm thời gian lãnh đạo'],
        deliverables: ['Soạn công văn', 'Đại diện làm việc', 'Theo dõi kết quả xử lý'],
        process: [
          { title: 'Chuẩn bị', description: 'Rà soát yêu cầu và hồ sơ liên quan.' },
          { title: 'Làm việc', description: 'Đại diện doanh nghiệp trao đổi với cơ quan thuế.' },
          { title: 'Hoàn tất', description: 'Tổng hợp kết luận và khuyến nghị phòng ngừa.' },
        ],
      },
      {
        slug: 'ra-soat-rui-ro-ke-toan-thue',
        title: 'Rà soát - xử lý rủi ro kế toán & thuế',
        shortDescription: 'Đánh giá độc lập hệ thống kế toán và cảnh báo rủi ro sớm.',
        heroDescription: 'Kiểm tra toàn diện để phát hiện và xử lý sai lệch trước khi phát sinh truy thu.',
        excerpt: 'Rà soát rủi ro kế toán thuế bằng checklist chuyên sâu.',
        stats: [
          { label: 'Tiêu chí kiểm tra', value: '72 điểm' },
          { label: 'Thời gian', value: '7-12 ngày' },
        ],
        benefits: ['Phát hiện sớm sai sót', 'Có lộ trình khắc phục', 'Nâng chuẩn kiểm soát nội bộ'],
        deliverables: ['Báo cáo rủi ro', 'Danh mục bút toán điều chỉnh', 'Kế hoạch hành động 30-60-90'],
        process: [
          { title: 'Thu thập', description: 'Phỏng vấn và lấy mẫu dữ liệu.' },
          { title: 'Đánh giá', description: 'Chấm điểm rủi ro theo từng nhóm.' },
          { title: 'Khắc phục', description: 'Bàn giao kế hoạch và theo dõi thực hiện.' },
        ],
      },
    ],
  },
  {
    id: 'thanh-lap',
    title: 'Thành lập doanh nghiệp',
    summary: 'Thiết lập pháp lý chuẩn chỉnh từ ngày đầu vận hành.',
    description: 'Tư vấn loại hình, hồ sơ pháp lý và các thủ tục bắt buộc sau thành lập.',
    accent: 'from-neutral-200/70 via-stone-100/80 to-white',
    icon: 'solar:notebook-bookmark-bold-duotone',
    services: [
      {
        slug: 'tu-van-thanh-lap-doanh-nghiep',
        title: 'Tư vấn thành lập hộ kinh doanh / doanh nghiệp',
        shortDescription: 'Tư vấn mô hình pháp lý phù hợp và triển khai hồ sơ A-Z.',
        heroDescription: 'Đồng hành từ lựa chọn loại hình đến hoàn tất giấy phép kinh doanh.',
        excerpt: 'Dịch vụ tư vấn thành lập doanh nghiệp trọn gói.',
        stats: [
          { label: 'Thời gian xử lý', value: '3-5 ngày' },
          { label: 'Số lần ký', value: '01 bộ hồ sơ' },
        ],
        benefits: ['Chọn đúng loại hình', 'Rút ngắn thời gian xử lý', 'Giảm rủi ro thủ tục'],
        deliverables: ['Tư vấn loại hình', 'Soạn hồ sơ đăng ký', 'Nộp và theo dõi kết quả'],
        process: [
          { title: 'Tư vấn', description: 'Phân tích nhu cầu và lựa chọn mô hình phù hợp.' },
          { title: 'Soạn hồ sơ', description: 'Chuẩn bị hồ sơ pháp lý đầy đủ.' },
          { title: 'Bàn giao', description: 'Nhận kết quả và hướng dẫn các bước tiếp theo.' },
        ],
      },
      {
        slug: 'soan-thao-ho-so-phap-ly',
        title: 'Soạn thảo hồ sơ pháp lý đầy đủ',
        shortDescription: 'Chuẩn hóa bộ tài liệu pháp lý và biểu mẫu nội bộ.',
        heroDescription: 'Thiết kế bộ hồ sơ pháp lý nội bộ giúp doanh nghiệp vận hành an toàn.',
        excerpt: 'Soạn thảo hồ sơ pháp lý đầy đủ cho doanh nghiệp mới.',
        stats: [
          { label: 'Biểu mẫu bàn giao', value: '15+' },
          { label: 'Thời gian', value: '5 ngày làm việc' },
        ],
        benefits: ['Đủ hồ sơ làm việc với đối tác', 'Giảm rủi ro pháp lý', 'Dễ dùng trong vận hành'],
        deliverables: ['Điều lệ, quyết định', 'Biểu mẫu nội bộ', 'Checklist pháp lý 90 ngày'],
        process: [
          { title: 'Thu thập', description: 'Tiếp nhận thông tin doanh nghiệp.' },
          { title: 'Soạn thảo', description: 'Chuẩn hóa bộ tài liệu theo nhu cầu.' },
          { title: 'Bàn giao', description: 'Hướng dẫn sử dụng và cập nhật định kỳ.' },
        ],
      },
      {
        slug: 'tu-van-van-hanh-quan-tri-ban-dau',
        title: 'Tư vấn mô hình vận hành & quản trị ban đầu',
        shortDescription: 'Thiết kế sơ đồ tổ chức, quy trình và KPI nền tảng.',
        heroDescription: 'Thiết kế mô hình vận hành ban đầu để doanh nghiệp dễ mở rộng quy mô.',
        excerpt: 'Tư vấn vận hành và quản trị cho giai đoạn khởi tạo.',
        stats: [
          { label: 'Thời gian tư vấn', value: '2 tuần' },
          { label: 'Đầu ra', value: '8 quy trình lõi' },
        ],
        benefits: ['Rõ vai trò trách nhiệm', 'Quy trình chuẩn hóa', 'KPI dễ đo lường'],
        deliverables: ['Sơ đồ tổ chức', 'Ma trận RACI', 'Bộ quy trình vận hành'],
        process: [
          { title: 'Khảo sát', description: 'Đánh giá mô hình vận hành hiện tại.' },
          { title: 'Thiết kế', description: 'Đề xuất cấu trúc, quy trình và KPI.' },
          { title: 'Triển khai', description: 'Hướng dẫn áp dụng và cố vấn ban đầu.' },
        ],
      },
      {
        slug: 'dang-ky-thue-hoa-don-dien-tu-tai-khoan-ngan-hang',
        title: 'Đăng ký thuế, hóa đơn điện tử, tài khoản ngân hàng',
        shortDescription: 'Trọn gói các thủ tục bắt buộc sau khi thành lập.',
        heroDescription: 'Hoàn tất thủ tục thuế ban đầu và kích hoạt hệ thống giao dịch doanh nghiệp.',
        excerpt: 'Đăng ký thuế ban đầu, hóa đơn điện tử và tài khoản ngân hàng.',
        stats: [
          { label: 'Thời gian hoàn tất', value: '5-7 ngày' },
          { label: 'Thủ tục song song', value: '03 thủ tục' },
        ],
        benefits: ['Không bỏ sót nghĩa vụ ban đầu', 'Kích hoạt hóa đơn điện tử nhanh', 'Sẵn sàng giao dịch'],
        deliverables: ['Đăng ký thuế ban đầu', 'Thông báo phát hành hóa đơn', 'Hỗ trợ mở tài khoản ngân hàng'],
        process: [
          { title: 'Lập kế hoạch', description: 'Xác định lịch trình thủ tục theo mốc thời gian.' },
          { title: 'Nộp hồ sơ', description: 'Thực hiện nộp hồ sơ và theo dõi trạng thái.' },
          { title: 'Bàn giao', description: 'Bàn giao tài khoản, hóa đơn và hướng dẫn sử dụng.' },
        ],
      },
    ],
  },
  {
    id: 'nhan-su',
    title: 'Nhân sự',
    summary: 'Thiết lập nền tảng nhân sự, bảo hiểm và thuế thu nhập cá nhân.',
    description: 'Chuẩn hóa hồ sơ lao động và nghĩa vụ bảo hiểm, thuế cho người lao động.',
    accent: 'from-emerald-200/70 via-teal-100/80 to-green-100/70',
    icon: 'solar:users-group-two-rounded-bold-duotone',
    services: [
      {
        slug: 'tu-van-ke-khai-bhxh-bhyt-bhtn',
        title: 'Tư vấn & kê khai BHXH - BHYT - BHTN',
        shortDescription: 'Thiết lập và vận hành hồ sơ bảo hiểm cho nhân sự.',
        heroDescription: 'Kê khai bảo hiểm đúng hạn, đúng đối tượng và đồng bộ dữ liệu nhân sự.',
        excerpt: 'Quản lý hồ sơ BHXH - BHYT - BHTN trọn gói.',
        stats: [
          { label: 'Thời gian xử lý', value: '1-3 ngày' },
          { label: 'Đúng hạn', value: '100%' },
        ],
        benefits: ['Giảm rủi ro phạt nộp chậm', 'Theo dõi biến động lao động', 'Tối ưu quy trình BHXH'],
        deliverables: ['Kê khai tăng giảm lao động', 'Theo dõi đóng bảo hiểm', 'Hỗ trợ thủ tục chế độ'],
        process: [
          { title: 'Thiết lập', description: 'Đăng ký mã đơn vị và tài khoản giao dịch.' },
          { title: 'Kê khai', description: 'Lập hồ sơ tăng giảm theo tháng.' },
          { title: 'Theo dõi', description: 'Đối chiếu và xử lý phát sinh.' },
        ],
      },
      {
        slug: 'hop-dong-lao-dong-noi-quy-thang-luong',
        title: 'Hợp đồng lao động - nội quy - thang bảng lương',
        shortDescription: 'Xây dựng bộ tài liệu lao động chuẩn pháp lý.',
        heroDescription: 'Thiết kế khung pháp lý lao động đầy đủ để vận hành và đăng ký đúng quy định.',
        excerpt: 'Chuẩn hóa hợp đồng, nội quy và thang bảng lương.',
        stats: [
          { label: 'Thời gian triển khai', value: '7 ngày' },
          { label: 'Mẫu bàn giao', value: '10+' },
        ],
        benefits: ['Giảm tranh chấp lao động', 'Đáp ứng yêu cầu pháp lý', 'Dễ triển khai nội bộ'],
        deliverables: ['Mẫu hợp đồng', 'Nội quy lao động', 'Thang bảng lương và hồ sơ đăng ký'],
        process: [
          { title: 'Khảo sát', description: 'Đánh giá chính sách lao động hiện tại.' },
          { title: 'Soạn thảo', description: 'Xây dựng bộ tài liệu chuẩn hóa.' },
          { title: 'Áp dụng', description: 'Hướng dẫn triển khai và đăng ký.' },
        ],
      },
      {
        slug: 'quyet-toan-thue-tncn',
        title: 'Quyết toán thuế TNCN cho người lao động',
        shortDescription: 'Quyết toán TNCN đầy đủ cho doanh nghiệp và nhân viên.',
        heroDescription: 'Rà soát dữ liệu lương và quyết toán TNCN chính xác, đúng hạn.',
        excerpt: 'Quyết toán thuế TNCN trọn gói cho người lao động.',
        stats: [
          { label: 'Thời gian xử lý', value: '5-7 ngày/kỳ' },
          { label: 'Phạm vi', value: 'Không giới hạn nhân sự' },
        ],
        benefits: ['Giảm rủi ro truy thu', 'Đảm bảo quyền lợi giảm trừ', 'Hỗ trợ nộp hồ sơ online'],
        deliverables: ['Rà soát bảng lương', 'Lập tờ khai 05/QTT-TNCN', 'Theo dõi trạng thái xử lý'],
        process: [
          { title: 'Đối chiếu', description: 'Chuẩn hóa dữ liệu thu nhập và giảm trừ.' },
          { title: 'Kê khai', description: 'Lập tờ khai và gửi duyệt.' },
          { title: 'Hoàn tất', description: 'Nộp hồ sơ và cập nhật kết quả.' },
        ],
      },
    ],
  },
];

export type FlattenedService = ServiceOffering & {
  categoryId: string;
  categoryTitle: string;
  categorySummary: string;
  categoryAccent: string;
};

export const allServices: FlattenedService[] = serviceCategories.flatMap((category) =>
  category.services.map((service) => ({
    ...service,
    categoryId: category.id,
    categoryTitle: category.title,
    categorySummary: category.description,
    categoryAccent: category.accent,
  }))
);

export const serviceSlugs = allServices.map((service) => service.slug);

/**
 * Bản tiếng Anh — giữ NGUYÊN id/slug/accent/icon, chỉ dịch nội dung.
 * Dùng qua getServiceCategories(lang)/getServiceBySlug(slug, lang).
 */
export const serviceCategoriesEn: ServiceCategory[] = [
  {
    id: 'ke-toan',
    title: 'Accounting',
    summary: 'Run an outsourced accounting department with transparent processes.',
    description: 'From bookkeeping and tax filing to accounting risk control.',
    accent: 'from-amber-200/70 via-orange-100/70 to-yellow-100/80',
    icon: 'solar:bill-list-bold-duotone',
    services: [
      {
        slug: 'ke-toan-tron-goi',
        title: 'Full-service accounting for households & businesses',
        shortDescription: 'Outsource your entire accounting department with periodic reporting.',
        heroDescription: 'Deploy an outsourced accounting department to VAS standards, operated under a clear SLA.',
        excerpt: 'A full-service accounting solution that helps businesses optimize costs and control their numbers.',
        stats: [
          { label: 'Setup time', value: '3-5 days' },
          { label: 'Reporting cycle', value: 'Weekly / Monthly' },
        ],
        benefits: ['Optimize accounting staff costs', 'Transparent periodic reporting', 'Standardized document workflow'],
        deliverables: ['Set up the chart of accounts', 'Record transactions', 'Reconcile payables and bank accounts'],
        process: [
          { title: 'Survey', description: 'Assess data and operational needs.' },
          { title: 'Setup', description: 'Standardize processes and document templates.' },
          { title: 'Operate', description: 'Bookkeeping and periodic reporting per the SLA.' },
        ],
      },
      {
        slug: 'ke-khai-va-quyet-toan-thue',
        title: 'VAT, PIT & CIT filing and finalization',
        shortDescription: 'On-time filing, compliant dossiers and explanation support.',
        heroDescription: 'Ensure your business files on time and finalizes correctly under current regulations.',
        excerpt: 'Tax filing and finalization services that reduce the risk of late-payment penalties.',
        stats: [
          { label: 'Deadline reminders', value: '100%' },
          { label: 'Processing time', value: '1-2 days/period' },
        ],
        benefits: ['Never miss a filing deadline', 'Support during inspections', 'Stay updated on new tax policies'],
        deliverables: ['Prepare VAT/PIT/CIT returns', 'Submit dossiers electronically', 'Prepare finalization files'],
        process: [
          { title: 'Review', description: 'Check invoice data and tax entries.' },
          { title: 'File', description: 'Prepare and submit returns on time.' },
          { title: 'Finalize', description: 'Complete dossiers and provide explanations when needed.' },
        ],
      },
      {
        slug: 'lap-so-sach-chuan-muc',
        title: 'Bookkeeping to accounting standards',
        shortDescription: 'Standardize your books for audit and management purposes.',
        heroDescription: 'Clean up data and build standard accounting books so your business can operate with confidence.',
        excerpt: 'Complete bookkeeping in line with standards and current regulations.',
        stats: [
          { label: 'Completion time', value: '15-30 days' },
          { label: 'Scope', value: '12-24 months of data' },
        ],
        benefits: ['Clean, controllable figures', 'Audit-ready', 'Reduced risk of discrepancies'],
        deliverables: ['Classify documents', 'Prepare journals and detailed ledgers', 'Reconcile consolidated figures'],
        process: [
          { title: 'Collect', description: 'Receive related data and documents.' },
          { title: 'Record', description: 'Prepare detailed and general ledgers.' },
          { title: 'Hand over', description: 'Deliver the books and provide usage guidance.' },
        ],
      },
      {
        slug: 'bao-cao-tai-chinh-dinh-ky',
        title: 'Monthly / quarterly / annual financial statements',
        shortDescription: 'Clear financial and management reports for leadership.',
        heroDescription: 'Set up clear periodic reporting for fast, accurate decision-making.',
        excerpt: 'Periodic financial statements meeting both legal and management needs.',
        stats: [
          { label: 'Update cycle', value: 'Monthly / Quarterly' },
          { label: 'Delivery', value: '72h after closing' },
        ],
        benefits: ['Easy to read and act on', 'Track key KPIs', 'Support financial planning'],
        deliverables: ['Statutory financial statements', 'Management dashboard', 'Trend analysis report'],
        process: [
          { title: 'Define KPIs', description: 'Agree on the key management metrics.' },
          { title: 'Build reports', description: 'Standardize data and build the reports.' },
          { title: 'Present', description: 'Advise on actions based on the numbers.' },
        ],
      },
      {
        slug: 'dai-dien-co-quan-thue',
        title: 'Representation before tax authorities',
        shortDescription: 'Represent your business in tax meetings, inspections and explanations.',
        heroDescription: 'Stand with your business during working sessions with the tax authorities.',
        excerpt: 'Reduce pressure and risk during tax inspections.',
        stats: [
          { label: 'Dossier completion rate', value: '98%' },
          { label: 'Response time', value: '<24h' },
        ],
        benefits: ['Complete, compliant dossiers', 'Strategic explanations', 'Save leadership time'],
        deliverables: ['Draft official letters', 'Represent in meetings', 'Track resolution outcomes'],
        process: [
          { title: 'Prepare', description: 'Review requirements and related dossiers.' },
          { title: 'Engage', description: 'Represent the business with the tax authority.' },
          { title: 'Complete', description: 'Summarize conclusions and preventive recommendations.' },
        ],
      },
      {
        slug: 'ra-soat-rui-ro-ke-toan-thue',
        title: 'Accounting & tax risk review and remediation',
        shortDescription: 'Independent assessment of your accounting system with early risk alerts.',
        heroDescription: 'A comprehensive review to detect and fix discrepancies before they trigger back-taxes.',
        excerpt: 'Review accounting and tax risks with an in-depth checklist.',
        stats: [
          { label: 'Review criteria', value: '72 points' },
          { label: 'Duration', value: '7-12 days' },
        ],
        benefits: ['Detect errors early', 'A clear remediation roadmap', 'Stronger internal controls'],
        deliverables: ['Risk report', 'List of adjusting entries', '30-60-90 action plan'],
        process: [
          { title: 'Collect', description: 'Interview and sample data.' },
          { title: 'Assess', description: 'Score risks by group.' },
          { title: 'Remediate', description: 'Hand over the plan and monitor execution.' },
        ],
      },
    ],
  },
  {
    id: 'thanh-lap',
    title: 'Company formation',
    summary: 'Set up a proper legal foundation from day one of operations.',
    description: 'Advice on entity type, legal dossiers and mandatory post-formation procedures.',
    accent: 'from-neutral-200/70 via-stone-100/80 to-white',
    icon: 'solar:notebook-bookmark-bold-duotone',
    services: [
      {
        slug: 'tu-van-thanh-lap-doanh-nghiep',
        title: 'Advisory on forming a household business / company',
        shortDescription: 'Advice on the right legal model and end-to-end dossier handling.',
        heroDescription: 'From choosing the entity type to obtaining the business license.',
        excerpt: 'Full-service company formation advisory.',
        stats: [
          { label: 'Processing time', value: '3-5 days' },
          { label: 'Signing', value: '01 dossier set' },
        ],
        benefits: ['Choose the right entity type', 'Shorten processing time', 'Reduce procedural risk'],
        deliverables: ['Entity-type advice', 'Draft registration dossier', 'Submit and track results'],
        process: [
          { title: 'Advise', description: 'Analyze needs and select the right model.' },
          { title: 'Draft dossier', description: 'Prepare the complete legal dossier.' },
          { title: 'Hand over', description: 'Receive results and guide the next steps.' },
        ],
      },
      {
        slug: 'soan-thao-ho-so-phap-ly',
        title: 'Drafting complete legal dossiers',
        shortDescription: 'Standardize your legal documents and internal templates.',
        heroDescription: 'Design an internal legal document set so your business operates safely.',
        excerpt: 'Drafting complete legal dossiers for new businesses.',
        stats: [
          { label: 'Templates delivered', value: '15+' },
          { label: 'Duration', value: '5 working days' },
        ],
        benefits: ['Enough documents to work with partners', 'Reduce legal risk', 'Easy to use in operations'],
        deliverables: ['Charter and resolutions', 'Internal templates', '90-day legal checklist'],
        process: [
          { title: 'Collect', description: 'Receive business information.' },
          { title: 'Draft', description: 'Standardize the document set to your needs.' },
          { title: 'Hand over', description: 'Guide usage and provide periodic updates.' },
        ],
      },
      {
        slug: 'tu-van-van-hanh-quan-tri-ban-dau',
        title: 'Initial operating model & management advisory',
        shortDescription: 'Design the org chart, processes and foundational KPIs.',
        heroDescription: 'Design an initial operating model so your business can scale easily.',
        excerpt: 'Operations and management advisory for the startup stage.',
        stats: [
          { label: 'Advisory time', value: '2 weeks' },
          { label: 'Output', value: '8 core processes' },
        ],
        benefits: ['Clear roles and responsibilities', 'Standardized processes', 'Measurable KPIs'],
        deliverables: ['Org chart', 'RACI matrix', 'Set of operating processes'],
        process: [
          { title: 'Survey', description: 'Assess the current operating model.' },
          { title: 'Design', description: 'Propose structure, processes and KPIs.' },
          { title: 'Deploy', description: 'Guide adoption and provide initial advisory.' },
        ],
      },
      {
        slug: 'dang-ky-thue-hoa-don-dien-tu-tai-khoan-ngan-hang',
        title: 'Tax registration, e-invoices and bank accounts',
        shortDescription: 'A full package of mandatory post-formation procedures.',
        heroDescription: 'Complete initial tax procedures and activate your business transaction systems.',
        excerpt: 'Initial tax registration, e-invoices and bank accounts.',
        stats: [
          { label: 'Completion time', value: '5-7 days' },
          { label: 'Parallel procedures', value: '03 procedures' },
        ],
        benefits: ['No missed initial obligations', 'Fast e-invoice activation', 'Ready to transact'],
        deliverables: ['Initial tax registration', 'Invoice issuance notice', 'Bank account opening support'],
        process: [
          { title: 'Plan', description: 'Set the procedure timeline by milestone.' },
          { title: 'Submit', description: 'Submit dossiers and track their status.' },
          { title: 'Hand over', description: 'Deliver accounts, invoices and usage guidance.' },
        ],
      },
    ],
  },
  {
    id: 'nhan-su',
    title: 'Human resources',
    summary: 'Set up the foundation for HR, insurance and personal income tax.',
    description: 'Standardize labor records and insurance and tax obligations for employees.',
    accent: 'from-emerald-200/70 via-teal-100/80 to-green-100/70',
    icon: 'solar:users-group-two-rounded-bold-duotone',
    services: [
      {
        slug: 'tu-van-ke-khai-bhxh-bhyt-bhtn',
        title: 'Social, health & unemployment insurance advisory and filing',
        shortDescription: 'Set up and run insurance records for your staff.',
        heroDescription: 'File insurance on time, for the right people, in sync with your HR data.',
        excerpt: 'Full-service management of social, health and unemployment insurance records.',
        stats: [
          { label: 'Processing time', value: '1-3 days' },
          { label: 'On time', value: '100%' },
        ],
        benefits: ['Reduce late-filing penalties', 'Track workforce changes', 'Optimize the insurance process'],
        deliverables: ['File headcount increases/decreases', 'Track insurance contributions', 'Support benefit procedures'],
        process: [
          { title: 'Setup', description: 'Register the unit code and transaction account.' },
          { title: 'File', description: 'Prepare monthly increase/decrease dossiers.' },
          { title: 'Monitor', description: 'Reconcile and handle issues that arise.' },
        ],
      },
      {
        slug: 'hop-dong-lao-dong-noi-quy-thang-luong',
        title: 'Labor contracts - work rules - salary scales',
        shortDescription: 'Build a legally compliant labor document set.',
        heroDescription: 'Design a complete labor legal framework for operations and proper registration.',
        excerpt: 'Standardize contracts, work rules and salary scales.',
        stats: [
          { label: 'Setup time', value: '7 days' },
          { label: 'Templates delivered', value: '10+' },
        ],
        benefits: ['Fewer labor disputes', 'Meet legal requirements', 'Easy internal rollout'],
        deliverables: ['Contract templates', 'Labor work rules', 'Salary scale and registration dossier'],
        process: [
          { title: 'Survey', description: 'Assess current labor policies.' },
          { title: 'Draft', description: 'Build the standardized document set.' },
          { title: 'Apply', description: 'Guide rollout and registration.' },
        ],
      },
      {
        slug: 'quyet-toan-thue-tncn',
        title: 'Personal income tax finalization for employees',
        shortDescription: 'Complete PIT finalization for the company and its employees.',
        heroDescription: 'Review payroll data and finalize PIT accurately and on time.',
        excerpt: 'Full-service personal income tax finalization for employees.',
        stats: [
          { label: 'Processing time', value: '5-7 days/period' },
          { label: 'Scope', value: 'Unlimited headcount' },
        ],
        benefits: ['Reduce back-tax risk', 'Secure deduction entitlements', 'Online submission support'],
        deliverables: ['Review payroll', 'Prepare form 05/QTT-TNCN', 'Track processing status'],
        process: [
          { title: 'Reconcile', description: 'Standardize income and deduction data.' },
          { title: 'File', description: 'Prepare returns and submit for approval.' },
          { title: 'Complete', description: 'Submit dossiers and update results.' },
        ],
      },
    ],
  },
];

const allServicesEn: FlattenedService[] = serviceCategoriesEn.flatMap((category) =>
  category.services.map((service) => ({
    ...service,
    categoryId: category.id,
    categoryTitle: category.title,
    categorySummary: category.description,
    categoryAccent: category.accent,
  }))
);

/** Trả về danh mục dịch vụ theo ngôn ngữ. */
export const getServiceCategories = (lang: Lang = 'vi') =>
  lang === 'en' ? serviceCategoriesEn : serviceCategories;

/** Trả về danh sách dịch vụ phẳng theo ngôn ngữ. */
export const getAllServices = (lang: Lang = 'vi') => (lang === 'en' ? allServicesEn : allServices);

export const getServiceBySlug = (slug: string, lang: Lang = 'vi') =>
  getAllServices(lang).find((service) => service.slug === slug);
