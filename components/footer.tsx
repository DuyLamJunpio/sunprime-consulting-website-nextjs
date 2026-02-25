import Image from "next/image";

export default function SiteFooter() {
  return (
    <footer className="border-t border-slate-100 bg-surface-base pb-12 pt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top Footer */}
        <div className="mb-20 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-5 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <a href="#" className="group mb-4 flex items-center gap-2">
              <Image src="/logo.png" alt="Sunprime Logo" width={36} height={36} className="h-9 w-9 object-contain" />
              <div className="flex flex-col">
                <span className="leading-none text-base font-bold tracking-tight text-text-primary">CÔNG TY TNHH SUNPRIME CONSULTING</span>
              </div>
            </a>
            <p className="mb-3 pl-1 text-xs font-medium text-text-muted">Kế toán - Pháp lý doanh nghiệp</p>
            <p className="mb-3 pl-1 text-sm text-text-muted">
              Đồng hành cùng doanh nghiệp về pháp lý, kế toán và vận hành với quy trình rõ ràng, chi phí minh bạch.
            </p>
            <p className="pl-1 text-sm font-medium text-text-secondary">
              <span className="font-semibold text-text-primary">Mã số thuế:</span> 0402296727
            </p>
          </div>

          {/* Column 1 */}
          <div>
            <h3 className="mb-6 font-semibold tracking-tight text-text-primary">Thông tin liên hệ</h3>
            <ul className="space-y-4 text-[15px] font-medium text-text-muted">
              <li>Tầng 6, Toà nhà dầu khí, Số 2 đường 30-4, Phường Hoà Cường, TP Đà Nẵng, Việt Nam</li>
              <li>
                <a href="tel:+84938168168" className="transition-colors hover:text-brand">
                  0938 168 168
                </a>
              </li>
              <li>
                <a href="mailto:hello@sunprime.consulting" className="transition-colors hover:text-brand">
                  hello@sunprime.consulting
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="mb-6 font-semibold tracking-tight text-text-primary">Giờ làm việc</h3>
            <ul className="space-y-4 text-[15px] font-medium text-text-muted">
              <li>Thứ 2 - Thứ 6: 08:00 - 17:30</li>
              <li>Thứ 7: 08:00 - 12:00</li>
              <li>Chủ nhật: Nghỉ</li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="mb-6 font-semibold tracking-tight text-text-primary">Liên kết</h3>
            <ul className="space-y-4 text-[15px] font-medium text-text-muted">
              <li>
                <a href="https://maps.google.com/?q=2+duong+30-4+da+nang" target="_blank" rel="noreferrer" className="transition-colors hover:text-brand">
                  Xem vị trí trên bản đồ
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-brand">
                  Chính sách bảo mật
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-brand">
                  Điều khoản sử dụng
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h3 className="mb-6 font-semibold tracking-tight text-text-primary">Theo dõi chúng tôi</h3>
            <div className="flex gap-4 text-slate-800">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="p-1 transition-colors hover:text-brand">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a href="https://www.tiktok.com" target="_blank" rel="noreferrer" className="p-1 transition-colors hover:text-brand">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16.7 3c.3 1.7 1.3 3 2.9 3.8V9c-1.3 0-2.6-.4-3.7-1.1v6.1a5.7 5.7 0 1 1-4.9-5.6v2.3a3.4 3.4 0 1 0 2.6 3.3V3z" />
                </svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="p-1 transition-colors hover:text-brand">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="flex flex-col items-start justify-between gap-8 border-t border-slate-100 pt-10 md:flex-row md:items-center">
          <div className="text-xs font-medium leading-relaxed text-slate-400">
            <p>© {new Date().getFullYear()} SUNPRIME CONSULTING. All rights reserved.</p>
            <p>MST: 0402296727</p>
          </div>

          <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm font-medium text-text-muted">
            <a href="#" className="transition-colors hover:text-text-primary">
              Chính sách bảo mật
            </a>
            <a href="#" className="transition-colors hover:text-text-primary">
              Điều khoản sử dụng
            </a>
            <a href="#" className="transition-colors hover:text-text-primary">
              Chính sách cookie
            </a>
          </div>

          <div className="flex items-center gap-6">
            <a href="#" className="flex items-center gap-1.5 opacity-90 transition-opacity hover:opacity-100">
              <span className="text-sm font-bold tracking-tight text-text-primary">SUNPRIME CONSULTING</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
