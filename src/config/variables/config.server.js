const joi = require('@hapi/joi');
const { ConfigError } = require('config/errors/errorTypes');

/**
 * Generate a validation schema using joi to check the type of your environment variables
 */
const envSchema = joi
  .object({
    NODE_ENV: joi.string().allow(
      'development',
      'production',
      'test'
    ),
    ROOT_URL   : joi.string(),
    CLIENT_URL : joi.string(),
    PORT       : joi.number(),
    API_VERSION: joi.number(),
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

const server = {

  appName      : envVars.APP_NAME,
  clientUrl    : envVars.CLIENT_URL || 'http://localhost',
  env          : envVars.NODE_ENV,
  isTest       : envVars.NODE_ENV === 'test',
  isDevelopment: envVars.NODE_ENV === 'development',
  server       : {
    rootUrl   : envVars.ROOT_URL || 'http://localhost',
    port      : envVars.PORT || 5000,
    apiVersion: envVars.API_VERSION || 'v1',
  },

};

module.exports = server;
