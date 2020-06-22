const { sendResetPasswordEmail } = require('models/User/user.emails');
const { Token } = require('models');

exports.logIn = async ctx => {

  try {

    const { user } = ctx.records;

    // Generate JWT token for authentication
    const token = await Token.query()
      .generateAuthToken(user);

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
    const { token } = ctx.authenticated;

    await Token.query().revokeAuthToken(token);

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
    const { user } = ctx.authenticated;

    await Token.query().revokeAllAuthTokens(user);

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
    const token = await Token.query()
      .generateAuthToken(user, temporary);

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

    const { validatedRequest } = ctx;
    const { user } = ctx.authenticated;

    // Update the user
    await user.$query()
      .patchAndFetch(validatedRequest);

    // Revoke other tokens
    await Token.query()
      .revokeAllAuthTokens(user);

    // Send fresh one
    const newToken = await Token.query()
      .generateAuthToken(user);

    ctx.body = {
      status: 'success',
      user,
      token : newToken
    };

  } catch (error) {

    ctx.throw(error);

  }

};
