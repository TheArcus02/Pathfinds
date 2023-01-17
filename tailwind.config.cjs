module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        scaleColorNode: {
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
        visited: 'scaleColorNode 1.5s ease-out',
        place: 'scaleNode .3s ease-out',
      },
    },
  },
  plugins: [],
};
