const { ValidationError } = require('config/errors/errorTypes');

exports.validate = (schema, property) => async(ctx, next) => {

  try {

    const toValidate = ctx.request[property];

    await schema.validateAsync(toValidate);

    ctx.validatedRequest = toValidate;

  } catch (error) {

    const validationError = new ValidationError(error.details[0].message);

    ctx.throw(validationError);

  }

  await next();

};
