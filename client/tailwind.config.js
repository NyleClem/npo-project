/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Primary brand accent
        brand: {
          50: '#f2f8ff',
          100: '#dceffd',
          200: '#bfe0fb',
          300: '#9ecff8',
          400: '#6fb7f3',
          500: '#1E90FF', // chosen primary accent
          600: '#1672d6',
          700: '#125aa9',
          800: '#0b3a6c'
        },
        // Secondary neutral for subtle borders
        neutralSoft: '#E5E7EB' // gray-200 like
      },
      fontFamily: {
        sans: ['ui-sans-serif', 'system-ui', 'Avenir', 'Helvetica', 'Arial']
      },
      maxWidth: {
        '5xl': '64rem' // ensure max-w-5xl exists
      },
      spacing: {
        'comfortable-1': '1rem', // 16px
        'comfortable-2': '1.5rem', // 24px
        'comfortable-3': '2rem' // 32px
      }
    }
  },
  plugins: []
};
