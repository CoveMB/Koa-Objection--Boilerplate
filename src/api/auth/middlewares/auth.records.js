const { User } = require('models');

exports.loginRecords = async(ctx, next) => {

  try {

    const { validatedRequest } = ctx;

    // Find the user from the send credentials
    const user = await User.query().findByCredentials(ctx, validatedRequest);

    ctx.records = { user };

  } catch (error) {

    ctx.throw(error);

  }

  await next();

};
