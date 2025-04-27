/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        neonBlue: '#00f3ff',
        deepBlue: '#0a192f',
        darkBlue: '#020c1b',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px #00f3ff' },
          '50%': { boxShadow: '0 0 10px #00f3ff' },
          '100%': { boxShadow: '0 0 5px #00f3ff' },
        },
      },
      animation: {
        glow: 'glow 1.5s infinite',
        'spin-slower': 'spin 2s linear infinite',
      },
    },
  },
  plugins: [],
}
