
exports.logIn = async ctx => {

  try {

    const { user } = ctx;

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

    // The authenticated middleware attache the user that made the request to the context
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

    // The authenticated middleware attache the user that made the request to the context
    const { userRequest } = ctx;

    await userRequest.revokeAllAuthTokens();

    ctx.body = {
      status: 'success'
    };

  } catch (error) {

    ctx.throw(error);

  }

};
