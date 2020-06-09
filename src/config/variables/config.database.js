const joi = require('@hapi/joi');
const { ConfigError } = require('config/errors/errorTypes');

/**
 * Generate a validation schema using joi to check the type of your environment variables
 */
const envSchema = joi
  .object({
    DB_USER    : joi.string(),
    DB_HOST    : joi.string(),
    DB_PASSWORD: joi
      .string()
      .optional()
      .empty(''),
    DB_NAME: joi.string(),
    DB_PORT: joi.number(),
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

const config = {

  dbName    : envVars.DB_NAME,
  dbHost    : envVars.DB_HOST,
  dbPort    : envVars.DB_PORT,
  dbUser    : envVars.DB_USER,
  dbPassword: envVars.DB_PASSWORD

};

module.exports = config;
