
const User = require('models/User/User');

exports.logIn = async ctx => {

  try {

    const { requestBody } = ctx;

    // Find the user from the send credentials
    const user = await User.findByCredentials(ctx, requestBody);

    // Generate JWT token
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

    userRequest.revokeAuthToken(token);

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

    userRequest.revokeAllAuthTokens();

    ctx.body = {
      status: 'success'
    };

  } catch (error) {

    ctx.throw(error);

  }

};
