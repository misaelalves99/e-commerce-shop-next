// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
    './src/shared/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#0000FF',
          soft: 'rgba(0,0,255,0.12)',
          strong: '#0000C8',
        },
        accent: {
          DEFAULT: '#FA003F',
          soft: 'rgba(250,0,63,0.12)',
        },
        secondary: {
          DEFAULT: '#EE6123',
        },
        success: '#00916E',
        warning: '#F5EE9E',
        gray: {
          900: '#0b0b10',
          800: '#15151f',
          700: '#1e1e2a',
          600: '#2b2b3a',
          500: '#4b4b5f',
          400: '#7a7a90',
          300: '#a5a5bd',
          200: '#d1d1e3',
          100: '#f3f3ff',
        },
      },
      boxShadow: {
        'brand-glow': '0 0 25px rgba(0,0,255,0.4)',
        'accent-glow': '0 0 30px rgba(250,0,63,0.5)',
      },
      borderRadius: {
        xs: '4px',
        sm: '6px',
        md: '10px',
        lg: '16px',
        xl: '24px',
        pill: '999px',
      },
      fontFamily: {
        sans: [
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          '"Noto Sans"',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
};

export default config;
