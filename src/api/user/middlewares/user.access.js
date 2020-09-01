const { NotAuthorizeError } = require('config/errors/error.types');

exports.isSelfOrAdmin = async(ctx, next) => {

  try {

    const { params, state: { authenticated: { user } } } = ctx;

    if (user.uuid === params.uuid || user.admin) {

      ctx.requestUuid = params.uuid;

    } else {

      throw new NotAuthorizeError();

    }

  } catch (error) {

    ctx.throw(error);

  }

  await next();

};
