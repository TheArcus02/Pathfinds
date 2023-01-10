module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        scaleNode: {
          '0%': {
            transform: 'scale(0.3)',
            borderRadius: '100%',
            backgroundColor: 'rgb(202 138 4)',
          },
          '75%': {
            transform: 'scale(1.2)',
            backgroundColor: 'rgb(94 234 212)',
          },
          '100%': {
            transform: 'scale(1)',
            backgroundColor: 'rgb(16 185 129)',
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
