const path = require('path');
const webpack = require('webpack');
const webpackNodeExternals = require('webpack-node-externals');
const base = require('./webpack.base');

module.exports = {
  entry: './src/server',
  output: {
    path: path.resolve(__dirname, '..', 'build', 'server'),
    filename: 'index.js',
  },
  target: 'node',
  node: {
    __dirname: false,
  },
  devtool: 'source-map',
  externals: [webpackNodeExternals()],
  ...base,
};
