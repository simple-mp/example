'use strict';
const path = require('path');
const glob = require('fast-glob');
const ENTRY_PATH = path.resolve(__dirname, '..');

exports.entries = function () {
  let entryFiles = glob.sync(['*.entry.js'], {
    cwd: ENTRY_PATH
  });
  const map = {};
  entryFiles.forEach((filePath) => {
    let key = filePath.replace('.js', '');
    map[key] = path.resolve(ENTRY_PATH, filePath);
  });
  return map;
};

exports.devOutputDir = function () {
  return path.resolve(__dirname, '../dist');
};
exports.prodOutputIdr = function () {
  return path.resolve(__dirname, '../dist');
};

