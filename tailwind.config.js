/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          25: '#fefdf9',
          50: '#fefdf8',
          100: '#fdf9f0',
          200: '#faf1de',
          300: '#f6e8ca',
          400: '#f1ddb3',
          500: '#ebd199',
          600: '#d4b882',
          700: '#b89965',
          800: '#9a7c4d',
          900: '#7d6239',
        },
        brown: {
          50: '#faf8f6',
          100: '#f4f0ea',
          200: '#e6ddd2',
          300: '#d5c6b5',
          400: '#c0a893',
          500: '#a68b70',
          600: '#8d6f56',
          700: '#765a47',
          800: '#5f483a',
          900: '#4d3a2f',
        },
        accent: {
          50: '#f8f6f4',
          100: '#f0ebe6',
          200: '#ddd2c7',
          300: '#c7b4a3',
          400: '#ad9077',
          500: '#947054',
          600: '#7d5b44',
          700: '#664837',
          800: '#52392c',
          900: '#432e24',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'ui-serif', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}