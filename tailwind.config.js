/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'warm-white': '#FEFDFB',
        'soft-beige': '#F5F1EB',
        'light-beige': '#E8E2D5',
        'muted-blush': '#F4F0ED',
        'light-sage': '#E8EDE6',
        'ivory': '#FEFCF8',
        'muted-sage': '#A8B5A0',
        'sage': '#9CAF88',
        'deep-sage': '#7A8A6E',
        'warm-gray': '#8B8680',
        'charcoal': '#4A4A4A',
      },
      fontFamily: {
        'serif': ['Playfair Display', 'serif'],
        'sans': ['Inter', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '28': '7rem',
        '32': '8rem',
        '36': '9rem',
        '44': '11rem',
        '52': '13rem',
      }
    },
  },
  plugins: [],
};