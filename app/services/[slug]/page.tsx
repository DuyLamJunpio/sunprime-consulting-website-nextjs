import { getServiceBySlug, serviceSlugs } from '@/data/services';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { absoluteUrl, siteConfig } from '@/lib/site';
import ServiceDetailContent from '@/components/services/service-detail-content';

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) {
    return {
      title: 'Dịch vụ SunPrime',
      description: 'Chi tiết dịch vụ SunPrime Consulting.',
    };
  }

  const canonical = `/services/${service.slug}`;
  return {
    title: service.title,
    description: service.excerpt,
    alternates: { canonical },
    openGraph: {
      title: service.title,
      description: service.excerpt,
      url: canonical,
      type: 'website',
    },
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  // Dữ liệu VN dùng cho SEO/JSON-LD (ổn định, không phụ thuộc ngôn ngữ client).
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const faqItems = [
    {
      question: `Dịch vụ "${service.title}" thường triển khai trong bao lâu?`,
      answer:
        'Sau buổi khảo sát đầu tiên, SunPrime sẽ gửi timeline chi tiết theo từng mốc công việc. Các đầu việc ưu tiên được triển khai trước để doanh nghiệp nhìn thấy kết quả sớm.',
    },
    {
      question: 'Có thể dùng riêng dịch vụ này mà không cần gói tổng thể không?',
      answer:
        'Có. Bạn có thể sử dụng độc lập từng dịch vụ hoặc kết hợp nhiều dịch vụ liên quan. Chúng tôi sẽ đề xuất phương án phù hợp với quy mô và giai đoạn của doanh nghiệp.',
    },
    {
      question: 'SunPrime có hỗ trợ làm việc với cơ quan nhà nước khi cần không?',
      answer:
        'Có. Tùy phạm vi hợp tác, chúng tôi hỗ trợ chuẩn bị hồ sơ, giải trình và đồng hành cùng doanh nghiệp trong các buổi làm việc cần thiết.',
    },
    {
      question: 'Tôi sẽ nhận được báo cáo theo hình thức nào?',
      answer:
        'Báo cáo được bàn giao định kỳ qua file và/hoặc dashboard theo nhu cầu, kèm phần giải thích ngắn gọn để đội ngũ nội bộ dễ theo dõi và hành động.',
    },
  ];

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: service.title,
      description: service.excerpt,
      serviceType: service.categoryTitle,
      provider: { '@type': 'Organization', name: siteConfig.name, url: siteConfig.url },
      areaServed: 'VN',
      url: absoluteUrl(`/services/${service.slug}`),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Trang chủ', item: siteConfig.url },
        { '@type': 'ListItem', position: 2, name: 'Dịch vụ', item: absoluteUrl('/services') },
        {
          '@type': 'ListItem',
          position: 3,
          name: service.title,
          item: absoluteUrl(`/services/${service.slug}`),
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqItems.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer },
      })),
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ServiceDetailContent slug={slug} />
    </>
  );
}
