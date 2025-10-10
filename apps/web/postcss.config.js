const path = require('path')

/** @type {import('postcss').ProcessOptions} */
module.exports = {
  plugins: {
    tailwindcss: {
      config: path.join(__dirname, 'tailwind.config.js'),
    },
    autoprefixer: {},
  },
}