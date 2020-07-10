const appRoot = require('app-root-path');
const winston = require('winston');
const Sentry = require('winston-sentry-log');
const { isDevelopment, sentryDNS, sentryEnv } = require('./variables');

// Base logger
const logger = winston.createLogger({
  level      : 'info',
  format     : winston.format.json(),
  defaultMeta: { service: 'api-service' },
});

// Log to the console
logger.add(new winston.transports.Console({
  format: winston.format.simple(),
  level : 'debug'
}));

if (!isDevelopment) {

  // Write to all logs with level `info` and below to `error.log`
  logger.add(new winston.transports.File({
    filename: `${appRoot}/logs/error.log`,
    level   : 'error'
  }));

  // Send errors to Sentry
  logger.add(new Sentry({
    config: {
      dsn        : sentryDNS,
      environment: sentryEnv
    },
    name : 'sentry',
    level: 'error'
  }));

}

module.exports = logger;
