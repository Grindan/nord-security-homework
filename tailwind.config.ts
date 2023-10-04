import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'nord-bg-image':
          'url(https://res.cloudinary.com/nordsec/image/upload/q_auto,f_auto/v1/nord-security-web/test/key-numbers.png)',
        // 'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        // 'gradient-conic':
        //   'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      backgroundPosition: {
        'mobile-bg-position': '40px',
        'desktop-bg-position': 'left 350px center',
      },
      animation: {
        spin: 'spin 1s infinite linear',
      },
      keyframes: {
        spin: {
          to: { transform: 'rotate(360deg)' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
