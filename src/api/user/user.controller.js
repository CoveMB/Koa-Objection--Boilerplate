const { User } = require('models');
const { NotFoundError } = require('config/errors/errorTypes');

// The user the the parameter comes from the authenticated middleware
exports.getProfile = async ctx => {

  try {

    // The authenticated middleware attache the user that made the request to the context
    const { userRequest } = ctx;

    ctx.body = {
      status: 'success',
      userRequest
    };

  } catch (error) {

    ctx.throw(error);

  }

};

// The id the the parameter comes from the isSelfOrAdmin middleware
exports.getOne = async ctx => {

  try {

    // The user has been fetch in the records middleware
    const { user } = ctx;

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

    // The users has been fetch in the records middleware
    const { users } = ctx;

    ctx.body = {
      status: 'success', users
    };

  } catch (error) {

    ctx.throw(error);

  }

};

exports.createOne = async ctx => {

  try {

    const { validatedRequest } = ctx;

    // Create new user
    const user = await User.query().insert(validatedRequest);

    // Generate JWT token
    const token = await user.generateAuthToken();

    // And send it back
    ctx.status = 201;
    ctx.body = {
      status: 'success', user, token
    };

  } catch (error) {

    ctx.throw(error);

  }

};

// The id the the parameter comes from the isSelfOrAdmin middleware
exports.updateOne = async ctx => {

  try {

    // The user has been fetch in the records middleware
    const { user, validatedRequest } = ctx;

    // Update the user
    const updatedUser = await user.$query()
      .patchAndFetch(validatedRequest);

    // And return it
    ctx.body = {
      status: 'success', user: updatedUser
    };

  } catch (error) {

    ctx.throw(error);

  }

};

// The id the the parameter comes from the isSelfOrAdmin middleware
exports.deleteOne = async ctx => {

  try {

    const { requestId } = ctx;

    // Find the user and delete it
    const user = await User.query().deleteById(requestId);

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
