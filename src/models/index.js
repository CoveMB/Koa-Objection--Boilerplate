const User = require('./User/User');
const Token = require('./User/Token/Token');

module.exports = {
  ...User,
  ...Token,
};
