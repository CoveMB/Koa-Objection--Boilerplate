const logger = require('config/logger');
const { getFullDate } = require('utils');

exports.log = async(ctx, next) => {

  logger.info(`${getFullDate()} | ${ctx.method} | ${ctx.path} | ${JSON.stringify(ctx.request.body)} |`);

  await next();

};
