const { NotAuthorizeError } = require('config/errors/errorTypes');

exports.isSelfOrAdmin = async(ctx, next) => {

  try {

    const { params, authenticated } = ctx;
    const { user } = authenticated;
    const id = Number(params.id);

    if (user.id === id || user.admin) {

      ctx.requestId = id;

    } else {

      throw new NotAuthorizeError();

    }

  } catch (error) {

    ctx.throw(error);

  }

  await next();

};
