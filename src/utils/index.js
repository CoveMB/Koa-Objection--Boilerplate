const fs = require('fs');
const path = require('path');

const baseName = path.basename(__filename);
let allUtils = {};

fs.readdirSync(__dirname)
  .filter(file => file.indexOf('.') !== 0 && file !== baseName)
  .forEach(file => {

    const utils = require(path.join(__dirname, file)); // eslint-disable-line

    allUtils = {
      ...allUtils, ...utils
    };

  });

module.exports = allUtils;
