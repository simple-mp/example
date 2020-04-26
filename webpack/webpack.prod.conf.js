const utils = require('./utils');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const webpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  output: {
    path: utils.prodOutputIdr(),
    filename: '[name].js',
  },
  plugins: [
    new OptimizeCssAssetsPlugin(),
  ]
});

module.exports = webpackConfig;
