/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
      extend: {
        fontFamily: {
          // richgold: ['Richgold', 'sans-serif'],
          serotiva: ['Serotiva','sans-serif'],
        },
        
      },
    },
    plugins: [],
  };