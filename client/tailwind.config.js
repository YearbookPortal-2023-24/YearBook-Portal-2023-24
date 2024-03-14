/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage:{
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'bg-white': "url('../public/images/global/bg-white.png')",
      },
      boxShadow: {
        '3xl': '60px 60px 60px 60px rgba(0, 0, 0, 0.3)',
      }
    },
  },
  plugins: [],
}