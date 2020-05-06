const User = require('models/User/User');
const { NotFoundError } = require('errors/errorTypes');
const { sendWelcomeEmail, sendCancellationEmail } = require('emails/user.emails');

// The user the the parameter comes from the authenticated middleware
exports.getProfile = async ctx => {

  const { userRequest } = ctx;

  ctx.body = {
    status: 'success',
    userRequest
  };

};

// The id the the parameter comes from the isSelfOrAdmin middleware
exports.getOne = async ctx => {

  try {

    const { id } = ctx.params;

    // Get the user
    const user = await User.findById(id);

    if (!user) {

      // If no user is found throw a NotFoundError
      throw new NotFoundError('User');

    }

    // Send it
    ctx.body = {
      status: 'success', user
    };

  } catch (error) {

    ctx.throw(error);

  }

};

exports.getAll = async ctx => {

  try {

    // Get all the users
    const users = await User.query();

    ctx.body = {
      status: 'success', users
    };

  } catch (error) {

    ctx.throw(error);

  }

};

exports.createOne = async ctx => {

  try {

    const { requestBody } = ctx;

    // Create new user
    const user = await User.query().insert(requestBody);

    // Send welcome email
    // sendWelcomeEmail(ctx, user.email, user.name);

    // And send it back
    ctx.status = 201;
    ctx.body = {
      status: 'success', user
    };

  } catch (error) {

    ctx.throw(error);

  }

};

// The id the the parameter comes from the isSelfOrAdmin middleware
exports.updateOne = async ctx => {

  try {

    const { requestBody, params } = ctx;
    const { id } = params;

    // Find the appropriate user
    const userToUpdate = await User.query().findById(id);

    if (!userToUpdate) {

      // If no user is found return a 404
      throw new NotFoundError('User');

    }

    // Update the user
    const user = await userToUpdate.$query()
      .update(requestBody);

    // And return it
    ctx.body = {
      status: 'success', user
    };

  } catch (error) {

    ctx.throw(error);

  }

};

// The id the the parameter comes from the isSelfOrAdmin middleware
exports.deleteOne = async ctx => {

  try {

    const { id } = ctx.params;

    // Find the user and delete it
    const user = await User.findByIdAndDelete(id);

    // Send cancellation email
    sendCancellationEmail(ctx, user.email, user.name);

    if (!user) {

      throw new NotFoundError('User');

    }

    ctx.body = {
      status: 'success'
    };

  } catch (error) {

    ctx.throw(error);

  }

};
