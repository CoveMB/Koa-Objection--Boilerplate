const Joi = require('@hapi/joi');
const { validateRequest } = require('globalMiddlewares');

// Define schema to validate request body
exports.createUpdateSchema = validateRequest(Joi.object({
  email: Joi
    .string()
    .email(),
  password: Joi
    .string()
}));
