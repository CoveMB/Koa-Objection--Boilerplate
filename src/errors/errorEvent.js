const logger = require('config/logger');

const errorEvent = 'error';

const errorHandler = async(error, ctx) => {

  // Every error are logged
  logger.error(`${new Date()} | ${error.name} | ${error.message} | stack: ${error.stack} | `);

};

module.exports = {
  errorHandler, errorEvent
};
