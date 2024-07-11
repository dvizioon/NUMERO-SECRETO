/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width: {
        '100p': '85%',
        '90p': '90%',
        '70p': '70%',
        '50p': '50%',
        '30p': '30%',
        '23p': '23%',
        '25p': '25%',
      },
      height: {
        '90p': '90%',
        '70p': '70%',
        '50p': '50%',
        '30p': '30%',
        '23p': '23%',
        '25p': '25%',
      },
      fontSize: {
        'h1': '72px',
        'h2': '30px',
        'h3': '30px',
        'h4': '24px',
        'h5': '20px',
        'h6': '16px',
      },
      fontFamily: {
        Inter: 'Inter',
        Chakra: 'Chakra Petch',
      }
    },
  },
  plugins: [],
}

