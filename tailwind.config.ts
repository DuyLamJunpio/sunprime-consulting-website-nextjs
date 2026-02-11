// tailwind.config.ts
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
        sans: ['var(--font-geist)', 'sans-serif'], // Sẽ setup font ở bước 2
      },
      colors: {
        neutral: {
          50: '#FFFFFF',
          100: '#FFFCED', /* Main Background */
          200: '#EBE7D5', /* Warm Border */
          300: '#D6CDB6',
          400: '#B0A290',
          500: '#8C7662', /* Muted Text */
          600: '#6E5640',
          700: '#4F2D08',
          800: '#4F2D08',
          900: '#4F2D08', /* Main Text */
        },
        indigo: {
          50: '#FFF8F1',
          100: '#FDEADD',
          600: '#C77D45', // Màu điểm nhấn (Link/Icon)
          900: '#4F2D08'
        },
        // Dùng trong modal Stories: overlay, text, border, background
        slate: {
          50: '#F8FAFC', // app/stories/page.tsx: modal surface bg
          100: '#F1F5F9', // app/stories/page.tsx: modal borders
          200: '#E2E8F0', // app/stories/page.tsx: modal dividers
          400: '#94A3B8', // app/stories/page.tsx: helper text
          500: '#64748B', // app/stories/page.tsx: body text
          600: '#475569', // app/stories/page.tsx: body text
          900: '#0F172A', // app/stories/page.tsx: headings/primary text
        },
        // Dùng trong modal Stories: icon highlight (challenge)
        red: {
          50: '#FEF2F2', // app/stories/page.tsx: icon bg
          100: '#FEE2E2', // app/stories/page.tsx: icon ring
          600: '#DC2626', // app/stories/page.tsx: icon color
        },
      },
      animation: {
        'marquee': 'marquee 40s linear infinite',
        'clip-in': 'clipIn 1.2s cubic-bezier(0.25, 1, 0.5, 1) both',
        'fade-up': 'fadeUp 0.8s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.5s ease-out forwards',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        clipIn: {
          '0%': { opacity: '0', clipPath: 'inset(0 0 100% 0)' },
          '100%': { opacity: '1', clipPath: 'inset(0 0 0 0)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
         fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
};
export default config;