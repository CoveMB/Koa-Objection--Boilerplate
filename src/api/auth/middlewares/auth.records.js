const { User } = require('models');
const { validateFoundInstances } = require('models/model.utils');

exports.loginRecords = async(ctx, next) => {

  try {

    const { validatedRequest } = ctx;

    // Find the user from the send credentials
    const user = await User.query().findByCredentials(validatedRequest);

    ctx.records = { user };

  } catch (error) {

    ctx.throw(error);

  }

  await next();

};

exports.requestResetPasswordRecords = async(ctx, next) => {

  try {

    const { validatedRequest } = ctx;

    // Find the user from the email
    const user = await User.query().findOne(validatedRequest);

    // Validate that a user was found
    validateFoundInstances([
      {
        instance: user, type: 'User', search: 'email'
      }
    ]);

    // Attach it to the context
    ctx.records = { user };

  } catch (error) {

    ctx.throw(error);

  }

  await next();

};

exports.registerThirdPartyRecords = async (ctx, next
) => {

  try {

    const { validatedRequest } = ctx;

    // Find existing user with email or create it
    const user = await User
      .query()
      .findOrCreate({ email: validatedRequest.user.email });

    // Validate that a user was found
    validateFoundInstances([
      {
        instance: user, type: 'User', search: validatedRequest.user.email as string
      }
    ]);

    // Attach it to the context
    ctx.records = { user };

  } catch (error) {

    ctx.throw(error);

  }

  await next();

};