/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      // Add reusable class for underline effect
      animation: {
        'underline-grow': 'underline-grow 0.3s ease-in-out forwards',
      },
      keyframes: {
        'underline-grow': {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
      },
    },
  },
  plugins: [],
};
