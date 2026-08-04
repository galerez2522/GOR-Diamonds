import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx,js,jsx,mdx}'],
  theme: {
    extend: {
      colors: {
        ivory: {
          DEFAULT: '#F7F2E8',
          50: '#FBF8F1',
          100: '#F7F2E8',
          200: '#EFE7D3',
        },
        charcoal: {
          DEFAULT: '#1A1613',
          800: '#231E19',
          700: '#3A322A',
          500: '#6E6259',
        },
        champagne: {
          DEFAULT: '#B08A47',
          light: '#D4B27A',
          dark: '#8E6C33',
        },
        diamond: '#E8F0F5',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Cinzel', 'Trajan Pro', 'Georgia', 'serif'],
        serif: ['var(--font-serif)', 'Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'Assistant', 'system-ui', 'sans-serif'],
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
