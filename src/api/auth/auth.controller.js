
const { User } = require('models');

exports.logIn = async ctx => {

  try {

    const { validatedRequest } = ctx;

    // Find the user from the send credentials
    const user = await User.query().findByCredentials(ctx, validatedRequest);

    // Generate JWT token for authentication
    const token = await user.generateAuthToken();

    // Send back the token
    ctx.body = {
      status: 'success', user, token
    };

  } catch (error) {

    ctx.throw(error);

  }

};

// The user the the parameter comes back from the authenticated middleware
exports.logOut = async ctx => {

  try {

    const { userRequest, token } = ctx;

    await userRequest.revokeAuthToken(token);

    ctx.body = {
      status: 'success'
    };

  } catch (error) {

    ctx.throw(error);

  }

};

// The user the the parameter comes back from the authenticated middleware
exports.logOutAll = async ctx => {

  try {

    const { userRequest } = ctx;

    await userRequest.revokeAllAuthTokens();

    ctx.body = {
      status: 'success'
    };

  } catch (error) {

    ctx.throw(error);

  }

};
