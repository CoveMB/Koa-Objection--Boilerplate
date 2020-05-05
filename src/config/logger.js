const appRoot = require('app-root-path');
const winston = require('winston');
const { isDevelopment } = require('./variables');

const logger = winston.createLogger({
  datePattern: 'yyyy-MM-dd.',
  level      : 'info',
  format     : winston.format.json(),
  colorize   : false,
  defaultMeta: { service: 'api-service' },
});

// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (isDevelopment) {

  logger.add(new winston.transports.Console({

    format  : winston.format.simple(),
    colorize: true,
    level   : 'debug',
  }));

} else {

  //
  // - Write to all logs with level `info` and below to `combined.log`
  // - Write all logs error (and below) to `error.log`.
  //
  logger.add(new winston.transports.File({
    filename: `${appRoot}/logs/app.log`,
    level   : 'error'
  }));

  logger.add(winston.transports.File({ filename: `${appRoot}/logs/combined.log` }));

}

module.exports = logger;
