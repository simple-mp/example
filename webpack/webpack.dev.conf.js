const utils = require('./utils');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');

module.exports = merge(baseWebpackConfig, {
  mode: 'development',
  output: {
    path: utils.devOutputDir(),
    filename: '[name].js',
  },
  devtool: 'source-map'
});
