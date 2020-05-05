const Joi = require('@hapi/joi');
const { ValidationError } = require('errors/errorTypes');

const loginSchema = Joi.object({
  email: Joi
    .string()
    .email()
    .required(),
  password: Joi
    .string()
    .required()
});

const validateLoginRequest = async(ctx, next) => {

  try {

    const body = ctx.request.body;

    await loginSchema.validateAsync(body);

    ctx.requestBody = body;

  } catch (error) {

    const validationError = new ValidationError(error.details[0].message);

    ctx.throw(validationError);

  }

  await next();

};

module.exports = { validateLoginRequest };
