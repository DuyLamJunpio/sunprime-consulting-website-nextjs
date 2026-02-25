export type NewsArticle = {
  slug: string;
  title: string;
  subtitle: string;
  image: string;
  date: string;
  content: string[];
};

export const newsArticles: NewsArticle[] = [
  {
    slug: "5-rui-ro-thue-doanh-nghiep-moi-thuong-gap",
    title: "5 rủi ro thuế doanh nghiệp mới thường gặp",
    subtitle:
      "Những sai sót phổ biến trong kê khai và quản lý hóa đơn có thể khiến doanh nghiệp bị phạt ngay từ năm đầu.",
    image:
      "https://images.unsplash.com/photo-1554224154-22dec7ec8818?q=80&w=1600&auto=format&fit=crop",
    date: "24/02/2026",
    content: [
      "Trong giai đoạn mới thành lập, phần lớn doanh nghiệp tập trung vào bán hàng và vận hành mà chưa xây dựng quy trình kế toán - thuế bài bản.",
      "Sai sót thường gặp gồm: kê khai chậm, sử dụng hóa đơn không đúng quy định, hạch toán thiếu chứng từ và chưa theo dõi công nợ đầy đủ.",
      "Để giảm rủi ro, doanh nghiệp cần có lịch nhắc hạn rõ ràng, kiểm tra chứng từ định kỳ và chuẩn hóa quy trình từ đầu.",
      "SunPrime khuyến nghị rà soát dữ liệu theo chu kỳ tháng để phát hiện sớm sai lệch và có phương án xử lý trước khi cơ quan thuế kiểm tra.",
    ],
  },
  {
    slug: "quy-trinh-thanh-lap-doanh-nghiep-tu-a-den-z",
    title: "Quy trình thành lập doanh nghiệp từ A đến Z",
    subtitle:
      "Toàn bộ các bước pháp lý, thuế và hồ sơ sau đăng ký kinh doanh mà doanh nghiệp cần hoàn tất để vận hành đúng luật.",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1600&auto=format&fit=crop",
    date: "20/02/2026",
    content: [
      "Thành lập doanh nghiệp không chỉ dừng ở giấy chứng nhận đăng ký kinh doanh, mà còn gồm nhiều thủ tục sau thành lập.",
      "Các đầu việc quan trọng gồm đăng ký thuế ban đầu, chữ ký số, hóa đơn điện tử, tài khoản ngân hàng và hồ sơ lao động cơ bản.",
      "Nếu thiếu một trong các bước này, doanh nghiệp có thể gặp vướng mắc trong xuất hóa đơn, kê khai thuế hoặc giao dịch tài chính.",
      "Một lộ trình triển khai rõ theo tuần sẽ giúp doanh nghiệp tiết kiệm thời gian và hạn chế chi phí phát sinh không cần thiết.",
    ],
  },
  {
    slug: "toi-uu-chi-phi-van-hanh-cho-doanh-nghiep-fnb",
    title: "Tối ưu chi phí vận hành cho doanh nghiệp F&B",
    subtitle:
      "Cách kiểm soát chi phí nguyên vật liệu, nhân sự và dòng tiền để tăng lợi nhuận bền vững trong ngành nhà hàng - cà phê.",
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1600&auto=format&fit=crop",
    date: "15/02/2026",
    content: [
      "Ngành F&B có biên lợi nhuận chịu áp lực lớn từ giá nguyên liệu, chi phí nhân sự và biến động nhu cầu thị trường.",
      "Doanh nghiệp cần thiết lập bộ chỉ số theo dõi theo ngày/tuần: giá vốn, tỷ lệ hao hụt, năng suất ca làm và dòng tiền thực nhận.",
      "Song song đó, báo cáo quản trị cần đơn giản, dễ đọc để chủ doanh nghiệp ra quyết định nhanh trong vận hành thực tế.",
      "Khi quy trình kế toán - vận hành được chuẩn hóa đồng bộ, doanh nghiệp có thể mở rộng quy mô mà vẫn giữ kiểm soát tài chính.",
    ],
  },
  {
    slug: "bo-chi-so-tai-chinh-quan-trong-cho-chu-doanh-nghiep",
    title: "Bộ chỉ số tài chính quan trọng cho chủ doanh nghiệp",
    subtitle:
      "Những chỉ số cần theo dõi định kỳ để đánh giá sức khỏe doanh nghiệp và đưa ra quyết định điều hành chính xác hơn.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1600&auto=format&fit=crop",
    date: "10/02/2026",
    content: [
      "Không phải chỉ số nào trong báo cáo tài chính cũng cần theo dõi hằng ngày, đặc biệt với doanh nghiệp vừa và nhỏ.",
      "Nhóm chỉ số cốt lõi nên ưu tiên gồm: doanh thu thuần, biên lợi nhuận gộp, chi phí vận hành, dòng tiền và điểm hòa vốn.",
      "Việc theo dõi chỉ số theo cùng một cấu trúc mỗi kỳ giúp doanh nghiệp nhìn ra xu hướng và phát hiện bất thường sớm.",
      "Khi có dashboard đơn giản và kỷ luật cập nhật số liệu, quá trình ra quyết định sẽ nhanh hơn và giảm rủi ro cảm tính.",
    ],
  },
  {
    slug: "chuan-hoa-ho-so-lao-dong-ngay-tu-dau",
    title: "Chuẩn hóa hồ sơ lao động ngay từ đầu",
    subtitle:
      "Những tài liệu lao động doanh nghiệp cần có để giảm tranh chấp và đảm bảo tuân thủ trong quá trình mở rộng nhân sự.",
    image:
      "https://images.unsplash.com/photo-1450101215322-bf5cd27642fc?q=80&w=1600&auto=format&fit=crop",
    date: "06/02/2026",
    content: [
      "Doanh nghiệp mới thường tập trung tuyển dụng nhanh mà chưa hoàn thiện bộ hồ sơ lao động theo đúng chuẩn.",
      "Các tài liệu cốt lõi gồm hợp đồng lao động, nội quy, thang bảng lương và quy trình theo dõi biến động nhân sự.",
      "Khi thiếu hồ sơ nền tảng, doanh nghiệp dễ gặp rủi ro pháp lý khi phát sinh kiểm tra hoặc tranh chấp lao động.",
      "Chuẩn hóa từ đầu giúp quản trị nhân sự bài bản, tiết kiệm thời gian xử lý về sau và tạo nền tảng mở rộng ổn định.",
    ],
  },
  {
    slug: "3-cach-kiem-soat-dong-tien-cho-doanh-nghiep-vua-va-nho",
    title: "3 cách kiểm soát dòng tiền cho doanh nghiệp vừa và nhỏ",
    subtitle:
      "Hướng dẫn đơn giản để quản trị dòng tiền theo tuần, tránh hụt vốn lưu động và chủ động kế hoạch chi trả.",
    image:
      "https://images.unsplash.com/photo-1554224155-1696413565d3?q=80&w=1600&auto=format&fit=crop",
    date: "02/02/2026",
    content: [
      "Dòng tiền là yếu tố sống còn với doanh nghiệp vừa và nhỏ, đặc biệt ở giai đoạn tăng trưởng nhanh.",
      "Doanh nghiệp cần theo dõi dòng tiền theo tuần thay vì chỉ theo tháng để phát hiện sớm điểm hụt vốn.",
      "Ba nhóm việc trọng tâm gồm quản lý công nợ, ưu tiên chi phí bắt buộc và xây dựng quỹ dự phòng vận hành.",
      "Khi có báo cáo dòng tiền rõ ràng, lãnh đạo sẽ ra quyết định nhanh hơn và hạn chế rủi ro thiếu hụt thanh khoản.",
    ],
  },
  {
    slug: "nhung-luu-y-khi-lam-viec-voi-co-quan-thue",
    title: "Những lưu ý khi làm việc với cơ quan thuế",
    subtitle:
      "Checklist giúp doanh nghiệp chuẩn bị hồ sơ đầy đủ, phản hồi đúng trọng tâm và giảm áp lực khi có thanh kiểm tra thuế.",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1600&auto=format&fit=crop",
    date: "29/01/2026",
    content: [
      "Khi nhận thông báo làm việc từ cơ quan thuế, doanh nghiệp cần bình tĩnh và rà soát hồ sơ theo từng nhóm dữ liệu.",
      "Việc chuẩn bị trước nội dung giải trình và đầu mối phụ trách sẽ giúp buổi làm việc hiệu quả hơn.",
      "Doanh nghiệp nên thống nhất thông tin trước khi phản hồi để tránh mâu thuẫn dữ liệu giữa các bộ phận.",
      "Một checklist chuẩn ngay từ đầu giúp giảm áp lực, tiết kiệm thời gian và nâng cao tính chủ động khi xử lý phát sinh.",
    ],
  },
  {
    slug: "cach-lap-ke-hoach-chi-phi-cho-giai-doan-mo-rong",
    title: "Cách lập kế hoạch chi phí cho giai đoạn mở rộng",
    subtitle:
      "Phương pháp xây dựng ngân sách thực tế để mở rộng quy mô mà vẫn kiểm soát tốt chi phí cố định và chi phí biến đổi.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop",
    date: "25/01/2026",
    content: [
      "Khi mở rộng chi nhánh hoặc tăng quy mô nhân sự, chi phí thường tăng nhanh hơn dự báo ban đầu.",
      "Doanh nghiệp cần phân tách rõ chi phí cố định và biến đổi để đánh giá đúng điểm hòa vốn cho từng giai đoạn.",
      "Kế hoạch ngân sách nên có kịch bản cơ sở, kịch bản thận trọng và kịch bản tăng trưởng để chủ động vận hành.",
      "Một kế hoạch chi phí tốt không chỉ giúp tiết kiệm ngân sách mà còn tạo dư địa đầu tư cho các hoạt động tạo doanh thu.",
    ],
  },
];
