const joi = require('@hapi/joi');
const { ConfigError } = require('config/errors/error.types');

/**
 * Generate a validation schema using joi to check the type of your environment variables
 */
const envSchema = joi
  .object({
    JWT_SECRET         : joi.string().required(),
    SENDGRID_SECRET    : joi.string().required(),
    SENDGRID_EMAIL_FROM: joi.string()
      .allow('')
      .optional(),
    SENTRY_DNS: joi.string().uri()
      .allow('')
      .required(),
    SENTRY_ENVIRONMENT: joi.string()
      .allow('')
      .optional(),
  })
  .unknown()
  .required();

/**
 * Validate the env variables using joi.validate()
 */
const { error, value: envVars } = envSchema.validate(process.env);

if (error) {

  throw new ConfigError(error.message);

}

const secrets = {

  jwtSecret        : envVars.JWT_SECRET,
  sendGridSecret   : envVars.SENDGRID_SECRET,
  sentryDNS        : envVars.SENTRY_DNS,
  sentryEnv        : envVars.SENTRY_ENVIRONMENT,
  sendGridEmailFrom: envVars.SENDGRID_EMAIL_FROM

};

module.exports = secrets;
