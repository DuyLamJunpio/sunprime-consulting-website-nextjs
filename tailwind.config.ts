import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        /**
         * Typography tokens
         * - Đổi font toàn site bằng cách đổi các biến phía dưới.
         * - `--font-body-token` và `--font-heading-token` được set ở globals.css
         */
        sans: ["var(--font-body-token)", "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        body: ["var(--font-body-token)", "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        heading: ["var(--font-heading-token)", "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        /**
         * ============================================================
         * SunPrime Design Tokens (Semantic)
         * Chỉ cần đổi màu ở đây để cập nhật toàn web:
         * - Màu thương hiệu: `brand.*`
         * - Màu chữ: `text.*`
         * - Màu nền/cấu trúc: `surface.*`, `section.*`
         * - Màu nút theo vai trò: `button.*`
         * - Màu viền theo vai trò: `border.*`
         * ============================================================
         */
        brand: {
          DEFAULT: "#4F46E5", // màu chủ đạo chính
          strong: "#4338CA", // hover/active cho màu chủ đạo
          soft: "#EEF2FF", // nền nhấn nhẹ
          "soft-hover": "#E0E7FF", // hover cho nền nhấn nhẹ
          ring: "#C7D2FE", // ring/focus/outline nhấn
          ink: "#3730A3", // chữ/biểu tượng trên nền brand mềm
        },
        text: {
          primary: "#0F172A", // heading/chữ quan trọng
          secondary: "#475569", // nội dung mặc định
          muted: "#64748B", // mô tả/chú thích
          inverse: "#FFFFFF", // chữ trên nền tối
          link: "#4F46E5", // màu link mặc định
          "link-hover": "#4338CA", // màu link hover
        },
        surface: {
          base: "#FFFFFF", // nền trang chính
          section: "#F8FAFC", // nền section trung tính
          card: "#FFFFFF", // nền card
          tint: "#F8FAFF", // nền card hover nhẹ
          elevated: "#FFFFFF", // nền khối nổi (modal/dropdown)
        },
        section: {
          primary: "#4F46E5", // section màu thương hiệu đậm
          alt: "#F8FAFC", // section màu thay thế trung tính
          "grad-start": "#DCD6FF", // gradient section sáng - điểm đầu
          "grad-mid": "#DCEBFF", // gradient section sáng - điểm giữa
          "grad-end": "#D1F2F2", // gradient section sáng - điểm cuối
        },
        button: {
          primary: "#4F46E5", // nút chính
          "primary-hover": "#4338CA",
          secondary: "#EEF2FF", // nút phụ
          "secondary-hover": "#E0E7FF",
          ghost: "#FFFFFF", // nền nút ghost trên nền trắng
          "ghost-hover": "#F8FAFC",
          text: "#FFFFFF", // chữ nút chính
          "text-dark": "#0F172A", // chữ nút nền sáng
        },
        border: {
          DEFAULT: "#E2E8F0", // viền chuẩn
          soft: "#EDF2F7", // viền nhẹ
          strong: "#CBD5E1", // viền nhấn
          brand: "#C7D2FE", // viền theo màu thương hiệu
        },
        state: {
          success: "#10B981",
          warning: "#F59E0B",
          danger: "#F43F5E",
        },

        /**
         * Legacy palette (giữ lại để tránh ảnh hưởng trang cũ).
         * Có thể dọn dần khi toàn bộ giao diện đã chuyển sang token mới.
         */
        process: {
          1: "#10B981",
          2: "#6366F1",
          3: "#F59E0B",
          4: "#F43F5E",
        },
        neutral: {
          50: "#FFFFFF",
          100: "#FFFCED",
          200: "#EBE7D5",
          300: "#D6CDB6",
          400: "#B0A290",
          500: "#8C7662",
          600: "#6E5640",
          700: "#4F2D08",
          800: "#4F2D08",
          900: "#4F2D08",
        },
        indigo: {
          50: "#FFF8F1",
          100: "#FDEADD",
          600: "#C77D45",
          900: "#4F2D08",
        },
        slate: {
          50: "#F8FAFC",
          100: "#F1F5F9",
          200: "#E2E8F0",
          400: "#94A3B8",
          500: "#64748B",
          600: "#475569",
          900: "#0F172A",
        },
        red: {
          50: "#FEF2F2",
          100: "#FEE2E2",
          600: "#DC2626",
        },
      },
      animation: {
        marquee: "marquee 40s linear infinite",
        "clip-in": "clipIn 1.2s cubic-bezier(0.25, 1, 0.5, 1) both",
        "fade-up": "fadeUp 0.8s ease-out forwards",
        "fade-in-up": "fadeInUp 0.5s ease-out forwards",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        clipIn: {
          "0%": { opacity: "0", clipPath: "inset(0 0 100% 0)" },
          "100%": { opacity: "1", clipPath: "inset(0 0 0 0)" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;