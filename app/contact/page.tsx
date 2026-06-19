import type { Metadata } from 'next';
import ContactContent from '@/components/contact/contact-content';

export const metadata: Metadata = {
  title: 'Liên hệ SunPrime Consulting',
  description:
    'Kết nối với SunPrime Consulting qua Facebook, Instagram, TikTok, Zalo, WhatsApp, Telegram và Email.',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return <ContactContent />;
}
