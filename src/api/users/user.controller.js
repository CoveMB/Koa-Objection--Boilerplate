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
    const users = await User.find();

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
    const newUser = await new User(requestBody).save();

    // Send welcome email
    sendWelcomeEmail(ctx, newUser.email, newUser.name);

    // And send it back
    ctx.status = 201;
    ctx.body = {
      status: 'success', newUser
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
    const user = await User.findById(id);

    if (!user) {

      // If no user is found return a 404
      throw new NotFoundError('User');

    }

    // Iterate through the user document to update it's fields
    Object.keys(requestBody).forEach(updateField => {

      user[updateField] = requestBody[updateField];

      return false;

    });

    // Save the user
    await user.save();

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
