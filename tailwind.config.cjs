module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        scaleNode: {
          '0%': {
            transform: 'scale(0.3)',
            borderRadius: '100%',
          },
          '75%': {
            transform: 'scale(1.2)',
          },
          '100%': {
            transform: 'scale(1)',
          },
        },
      },
      animation: {
        visited: 'scaleNode 1.5s ease-out',
      },
    },
  },
  plugins: [],
};
