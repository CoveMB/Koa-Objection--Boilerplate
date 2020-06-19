const { sendResetPasswordEmail } = require('models/User/emails/user.emails');

exports.logIn = async ctx => {

  try {

    const { user } = ctx.records;

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

// Check if the token sent is still valid
exports.checkToken = async ctx => {

  try {

    // The token is still valid
    ctx.body = {
      status: 'success'
    };

  } catch (error) {

    ctx.throw(error);

  }

};

exports.requestResetPassword = async ctx => {

  try {

    const { user } = ctx.records;

    // Generate JWT token for to send to the email to able password reset
    const temporary = true;
    const token = await user.generateAuthToken(temporary);

    sendResetPasswordEmail(ctx, user.email, token);

    ctx.body = {
      status: 'success'
    };

  } catch (error) {

    ctx.throw(error);

  }

};

exports.resetPassword = async ctx => {

  try {

    const { user } = ctx.records;

    ctx.body = {
      status: 'success'
    };

  } catch (error) {

    ctx.throw(error);

  }

};
