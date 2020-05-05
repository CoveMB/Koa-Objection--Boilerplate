require('dotenv').config();
const fs = require('fs');
const path = require('path');

const baseName = path.basename(__filename);
let allConfig = {};

fs.readdirSync(__dirname)
  .filter(file => file.indexOf('.') !== 0 && file !== baseName)
  .forEach(file => {

    const config = require(path.join(__dirname, file)); // eslint-disable-line

    allConfig = {
      ...allConfig, ...config
    };

  });

module.exports = allConfig;
