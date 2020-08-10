const path = require('path');
const base = require('./webpack.base');

module.exports = {
  entry: ['./src/client'],
  output: {
    path: path.resolve(__dirname, '..', 'build', 'client'),
    filename: 'index.js',
  },
  devtool: 'source-map',
  ...base,
};
