'use strict';

const ora = require('ora');
const fs = require('fs-extra');
const chalk = require('chalk');
const webpack = require('webpack');

const webpackConfig = require('./webpack.prod.conf');

const spinner = ora('building for production...');
spinner.start();

async function run() {
  let outputDir = webpackConfig.output.path;

  await fs.remove(outputDir);
  // let compiler = webpack(webpackConfig);
  let buildStats = await new Promise((resovle, reject) => {
    webpack(webpackConfig, (err, stats) => {
      spinner.stop();
      if (err) {
        reject(err)
      } else {
        resovle(stats)
      }
    });
  });
  console.log(`${buildStats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  })}\n\n`);
  if (buildStats.hasErrors()) {
    console.log(chalk.red('  Build failed with errors.\n'));
    process.exit(1);
  }
  console.log(chalk.cyan('  Build complete.\n'));
}

run();
