const date = require('./date');
const stringFormater = require('./stringFormater');
const userAgent = require('./userAgent');

module.exports = {
  ...date,
  ...stringFormater,
  ...userAgent
};
