const { NotAuthorizeError } = require('config/errors/errorTypes');

exports.isSelfOrAdmin = async(ctx, next) => {

  try {

    const { userRequest, params } = ctx;
    const id  = Number(params.id);

    if (userRequest.id === id || userRequest.admin) {

      ctx.requestId = id;

    } else {

      throw new NotAuthorizeError();

    }

  } catch (error) {

    ctx.throw(error);

  }

  await next();

};
