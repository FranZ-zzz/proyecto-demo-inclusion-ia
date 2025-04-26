module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      animation: {
        'fade-in': 'fade-in 0.5s ease-out',
      },
      keyframes: {
        'fade-in': {
          from: { opacity: 0, transform: 'translateY(-10px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};