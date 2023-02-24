import isMobile from '@utils/isMobie';
console.log('isMobile', isMobile);
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    'postcss-px-to-viewport': {
      viewportWidth: isMobile ? 750 : 1440,
    },
  },
};
