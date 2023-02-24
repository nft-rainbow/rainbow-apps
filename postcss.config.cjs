import isMobile from '@utils/isMobie';
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    'postcss-px-to-viewport': {
      viewportWidth: isMobile ? 750 : 1440,
    },
  },
};
