const plugin = () => {
  return {
    tailwindcss: {},
    autoprefixer: {},
    'postcss-px-to-viewport': {
      viewportWidth: 750,
    }
  }
}
plugin.postcss = true
module.exports = plugin