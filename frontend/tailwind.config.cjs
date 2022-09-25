/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    screens: {
      xs: '480px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1366px',
      '2xl': '1536px',
      '3xl': '1920px'
    }
  },
  darkMode: 'class',
  plugins: [require('daisyui')]
}
