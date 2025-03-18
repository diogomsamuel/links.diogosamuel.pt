/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-primary': '#FF8A00',
        'brand-secondary': '#FF5F00',
        'background-dark': '#0A0A0A',
        'background-dark-lighter': '#141414',
        'card-bg': 'rgba(20, 20, 20, 0.5)',
        'border-light': 'rgba(255, 255, 255, 0.06)',
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)'],
        mono: ['var(--font-geist-mono)'],
      },
      boxShadow: {
        'premium': '0 8px 30px rgba(0, 0, 0, 0.25)',
        'glow': '0 0 15px rgba(255, 138, 0, 0.15)',
      },
    },
  },
  plugins: [],
}; 