const { errorEvent } = require('errors/errorEvent');
const { ForeignKeyViolationError, ValidationError } = require('objection');

exports.error = async(ctx, next) => {

  try {

    await next();

  } catch (error) {

    // Emit the error at the app level
    ctx.app.emit(errorEvent, error, ctx);

    // Return errors from objection orm
    if (error instanceof ValidationError) {

      ctx.status = 400;
      ctx.body = {
        status: 'failed',
        error : 'ValidationError',
        errors: error.data
      };

      // Return errors from objection orm

    } else if (error instanceof ForeignKeyViolationError) {

      ctx.status = 409;
      ctx.body = {
        status: 'failed',
        error : 'ForeignKeyViolationError'
      };

    } else {

      // Return other errors
      ctx.status = error.status || 500;
      ctx.body = {
        status : 'failed',
        message: error.expose ? error.message : 'Internal server error',
      };

    }

  }

};
