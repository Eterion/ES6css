module.exports = {
  plugins: [
    require('autoprefixer')({
      browsers: ['last 10 versions'],
      cascade: false,
      grid: true,
    }),
  ],
};
