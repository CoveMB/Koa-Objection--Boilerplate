require('dotenv').config();
const fs = require('fs');
const path = require('path');

const baseName = path.basename(__filename);
let allMiddlewares = {};

fs.readdirSync(__dirname)
  .filter(file => file.indexOf('.') !== 0 && file !== baseName)
  .forEach((file) => {

    const middlewares = require(path.join(__dirname, file)); // eslint-disable-line

    allMiddlewares = {
      ...allMiddlewares, ...middlewares
    };


  });

module.exports = allMiddlewares;
