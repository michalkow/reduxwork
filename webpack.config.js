var resolve = require('path').resolve;
var webpack = require('webpack');

module.exports = {
  entry: [
    resolve(__dirname, 'src/reduxwork.js')
  ],
  output: {
    filename: 'reduxwork.js',
    path: resolve(__dirname, 'dist'),
  },
  context: resolve(__dirname, 'src'),
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          'babel-loader',
        ],
        exclude: /node_modules/
      }
    ],
  }
};