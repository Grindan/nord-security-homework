/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
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
