const Joi = require('@hapi/joi');
const { ValidationError } = require('errors/errorTypes');

// Define schema to validate request body
const createOneSchema = Joi.object({
  email: Joi
    .string()
    .email()
    .required(),
  name: Joi
    .string()
    .required(),
  password: Joi
    .string()
    .required(),
  isAdmin: Joi
    .boolean()
});

// Validate the request body
const validateRequest = async(ctx, next) => {

  try {

    const body = ctx.request.body;

    await createOneSchema.validateAsync(body);

    ctx.requestBody = body;

  } catch (error) {

    const validationError = new ValidationError(error.details[0].message);

    ctx.throw(validationError);

  }

  await next();

};

module.exports = { validateRequest };
