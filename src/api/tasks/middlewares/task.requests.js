const Joi = require('@hapi/joi');
const { ValidationError } = require('errors/errorTypes');

const createOneSchema = Joi.object({
  description: Joi.string(),
  completed  : Joi.boolean()
});

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
