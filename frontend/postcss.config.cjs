// postcss.config.cjs
module.exports = {
  plugins: [
    require('@tailwindcss/postcss'), // Add this line
    require('autoprefixer'),
  ],
};
