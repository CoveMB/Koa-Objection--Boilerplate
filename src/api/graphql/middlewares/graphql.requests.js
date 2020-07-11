const Joi = require('@hapi/joi');
const { validateRequest } = require('globalMiddlewares');

exports.query = validateRequest(Joi.object({
  query: Joi
    .string()
    .required()
}));
