const constants = require('./config.constants');
const secrets = require('./config.secrets');
const server = require('./config.server');
const database = require('./config.database');

module.exports = {
  ...constants,
  ...secrets,
  ...server,
  ...database
};
