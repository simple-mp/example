'use strict';
const path = require('path');
const utils = require('./utils');
const webpack = require('webpack');
const MiniCssExtractPlugin  = require('mini-css-extract-plugin');

function resolve (dir) {
  return path.join(__dirname, '..', dir);
}

module.exports = {
  devtool: "eval",
  context: path.resolve(__dirname, '../'),
  entry: utils.entries(),
  output: {
    filename: '[name].js',
    publicPath: '/react-ui/'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.scss'],
    alias: {
      '@': resolve('src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.css?$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /\.ttf$/,
        use: [{
          loader: 'file-loader',
          options: {
            publicPath: '/react-ui/',
            name: '[name].[ext]'
          }
        }]
      },
    ]
  },
  plugins: [
    new webpack.ProgressPlugin({
      entries: true,
      modules: true,
      modulesCount: 100,
      profile: true,
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],

};
