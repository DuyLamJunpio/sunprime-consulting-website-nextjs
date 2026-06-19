import type { Metadata } from 'next';
import ServicesListContent from '@/components/services/services-list-content';

export const metadata: Metadata = {
  title: 'Dịch vụ SunPrime Consulting',
  description:
    'Hệ sinh thái dịch vụ kế toán, pháp lý và nhân sự giúp doanh nghiệp chuẩn chỉnh sổ sách – tuân thủ pháp luật – mở rộng bền vững.',
  alternates: { canonical: '/services' },
};

export default function ServicesPage() {
  return <ServicesListContent />;
}
