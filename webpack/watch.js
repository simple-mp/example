'use strict';

const chalk = require('chalk');
const ora = require('ora');
const webpack = require('webpack');
const fs = require('fs-extra');
const spinner = ora('building for dev...');
spinner.start();

const webpackConfig = require('./webpack.dev.conf');

async function run() {
  await fs.remove(webpackConfig.output.path);
  let compiler = webpack(webpackConfig);
  let watching = compiler.watch({}, function (err, stats) {
    spinner.stop();

    if (err) {
      throw err;
    }

    if (stats.hasErrors()) {
      const info = stats.toJson();
      console.log(chalk.red('  Build failed with errors.\n', info.errors));
    }
  });
}

run();

