const Joi = require('@hapi/joi');

// Define schema to validate request body
const createUpdateSchema = Joi.object({
  email: Joi
    .string()
    .email(),
  password: Joi
    .string(),
  admin: Joi
    .boolean()
});

module.exports = { createUpdateSchema };
