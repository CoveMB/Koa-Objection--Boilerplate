const { NotAuthorizeError } = require('errors/errorTypes');

const isSelfOrAdmin = async(ctx, next) => {

  try {

    const { userRequest, params } = ctx;
    const { id } = params;

    if (userRequest.id === id || userRequest.isAdmin) {

      ctx.id = id;

      await next();

    } else {

      throw new NotAuthorizeError();

    }

  } catch (error) {

    ctx.throw(error);

  }

};

module.exports = { isSelfOrAdmin };
