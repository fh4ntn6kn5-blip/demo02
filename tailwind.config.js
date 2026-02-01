/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        accent: {
          purple: '#7C3AED',
          'purple-dark': '#6D28D9',
        },
      },
    },
  },
  plugins: [],
}
