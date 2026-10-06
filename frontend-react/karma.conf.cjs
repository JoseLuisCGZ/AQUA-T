module.exports = function (config) {
  config.set({
    frameworks: ['jasmine', 'webpack'],
    files: ['src/**/*.spec.js', 'src/**/*.spec.jsx'],
    preprocessors: { 'src/**/*.spec.{js,jsx}': ['webpack'] },
    webpack: {
      mode: 'development',
      devtool: 'inline-source-map',
      resolve: { extensions: ['.js', '.jsx'] },
      module: {
        rules: [
          { test: /\.jsx?$/, exclude: /node_modules/, use: 'babel-loader' },
          { test: /\.css$/, use: ['style-loader', 'css-loader'] },
        ],
      },
    },
    browsers: ['ChromeHeadless'],
    reporters: ['progress'],
    singleRun: true,
  });
};