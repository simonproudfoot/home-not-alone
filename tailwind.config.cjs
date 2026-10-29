/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.mjs', './static/assets/js/*.js'],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FFFEFC',
          100: '#FBF6F2',
          200: '#F3E9E2',
          300: '#E8D6CC',
        },
        red: {
          400: 'var(--primary-400)',
          500: 'var(--primary-500)',
          600: 'var(--primary-600)',
          700: 'var(--primary-700)',
        },
        ink: {
          900: '#2A1E18',
          700: '#4A382F',
          500: '#7A6A60',
          300: '#B8A99F',
        },
      },
      fontFamily: {
        serif: ['var(--font-heading)', 'Georgia', 'serif'],
        sans: ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 6px 24px -8px rgba(75, 40, 30, 0.16)',
        card: '0 18px 48px -20px rgba(75, 40, 30, 0.26)',
      },
    },
  },
};
