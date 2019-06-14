const path = require('path');
const fs = require('fs');

/**
 * Save the upload file
 * @param {file} file: the file to be saved
 * @param {string} filePath: the file path to be saved
 */
module.exports = function (file, filePath) {
  const reader = fs.createReadStream(file.path);
  const upStream = fs.createWriteStream(filePath);
  reader.pipe(upStream);
};