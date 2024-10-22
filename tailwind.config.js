/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,tsx}",, './public/index.html'],
  theme: {
     extend: {
      fontFamily: {
        sans: ['poppins', 'sans-serif']
      },
      colors: {
        primary: 'var(--gray)',
        secondary : 'var(--blue)'
      }
    },
  },
  plugins: [],
}

