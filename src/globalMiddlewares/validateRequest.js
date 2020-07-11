const { ValidationError } = require('config/errors/error.types');

exports.validateRequest = schema => async(ctx, next) => {

  try {

    const toValidate = ctx.request.body;

    await schema.validateAsync(toValidate);

    ctx.validatedRequest = toValidate;

  } catch (error) {

    const validationError = new ValidationError(error.details[0].message);

    ctx.throw(validationError);

  }

  await next();

};
