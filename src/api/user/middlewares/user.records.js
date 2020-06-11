const { NotFoundError } = require('config/errors/errorTypes');
const { User } = require('models');

exports.getByIdRecords = async(ctx, next) => {

  try {

    const { requestId } = ctx;

    // Get the user
    const user = await User.query().findById(requestId);

    if (!user) {

      // If no user is found throw a NotFoundError
      throw new NotFoundError('User');

    }

    ctx.user = user;

  } catch (error) {

    ctx.throw(error);

  }

  await next();

};

exports.getAllRecords = async(ctx, next) => {

  try {

    // Get all the users
    const users = await User.query();

    ctx.users = users;

  } catch (error) {

    ctx.throw(error);

  }

  await next();

};
