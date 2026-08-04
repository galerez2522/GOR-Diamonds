import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx,js,jsx,mdx}'],
  theme: {
    extend: {
      colors: {
        ivory: {
          DEFAULT: '#FAF7F2',
          50: '#FDFBF8',
          100: '#FAF7F2',
          200: '#F2ECE0',
        },
        charcoal: {
          DEFAULT: '#1A1A1A',
          800: '#242424',
          700: '#3A3A3A',
          500: '#6B6B6B',
        },
        champagne: {
          DEFAULT: '#B8956A',
          light: '#D4B896',
          dark: '#8F6F4A',
        },
        diamond: '#E8F0F5',
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'Inter', 'system-ui', 'sans-serif'],
        hebrew: ['var(--font-hebrew)', 'Frank Ruhl Libre', 'serif'],
      },
      letterSpacing: {
        luxe: '0.24em',
        wider: '0.18em',
      },
      spacing: {
        '18': '4.5rem',
        '30': '7.5rem',
      },
      transitionTimingFunction: {
        luxe: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      animation: {
        'fade-up': 'fadeUp 0.9s cubic-bezier(0.22, 1, 0.36, 1) both',
        shimmer: 'shimmer 6s linear infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-500px 0' },
          '100%': { backgroundPosition: '500px 0' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
