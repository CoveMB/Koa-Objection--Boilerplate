const logger = require('config/logger');
const utils = require('utils');

const errorEvent = 'error';

const errorHandler = async(error, ctx) => {

  // Every error are logged
  logger.error(`${utils.getFullDate()} | context:  ${ctx.method} ${ctx.path} ${JSON.stringify(ctx.request.body)} | ${error.name} | ${error.message} | stack: ${error.stack} | `);

};

module.exports = {
  errorHandler, errorEvent
};
