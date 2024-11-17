/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        uhGreen: '#49CC68',
        uhGrey: '#8594A5',
        uhAliceBlue: '#F5F9FC',
      },
    },
  },
  plugins: [],
};
