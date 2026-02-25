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
    title: 'Dịch vụ kế toán',
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
    title: 'Tư vấn & thành lập doanh nghiệp',
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
    title: 'Dịch vụ nhân sự',
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

export const getServiceBySlug = (slug: string) => allServices.find((service) => service.slug === slug);
