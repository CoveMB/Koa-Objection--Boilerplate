const logger = require('config/logger');
const utils = require('utils');
const { sanitizeExposedBody } = require('utils/sanitizer');

const errorEvent = 'error';

const errorHandler = async(error, ctx) => {

  // Every error are logged
  logger.error(`${utils.getFullDate()} | context:  ${ctx.method} ${ctx.path} ${sanitizeExposedBody(ctx.request.body)} | ${error.name} | ${error.message} | stack: ${error.stack} | `);

};

module.exports = {
  errorHandler, errorEvent
};
