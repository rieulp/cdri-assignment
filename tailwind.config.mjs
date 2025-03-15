import { utilities, theme } from './styles/theme';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './app/styles/globals.css',
  ],
  theme,
  plugins: [
    function ({ addUtilities }) {
      addUtilities(utilities);
    },
  ],
};
