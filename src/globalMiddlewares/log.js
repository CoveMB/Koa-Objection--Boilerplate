const logger = require('config/logger');

exports.log = async(ctx, next) => {

  logger.info(`${new Date()} | ${ctx.method} | ${ctx.path} | `);

  await next();

};
