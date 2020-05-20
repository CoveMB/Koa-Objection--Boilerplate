const jwt = require('jsonwebtoken');
const { Token } = require('models');
const { NotAuthenticatedError } = require('errors/errorTypes');
const { jwtSecret } = require('config/variables');

exports.authenticated = async(ctx, next) => {

  try {

    // Get the bearer token
    const token = ctx.get('Authorization').replace('Bearer ', '');

    let decoded = {};

    try {

      // Make sure it's valid and get the user id from it
      decoded = await jwt.verify(token, jwtSecret);

    } catch {

      ctx.throw(new NotAuthenticatedError());

    }

    // Find the appropriate user attached to the token
    const foundToken = await Token.query()
      .where('token', token)
      .first()
      .withGraphFetched('user');

    if (!foundToken || !foundToken.user) {

      // If no user is found throw a NotAuthenticatedError user
      ctx.throw(new NotAuthenticatedError());

    }

    // Attach the found user and current token to the response
    ctx.userRequest = foundToken.user;
    ctx.token = token;

  } catch (error) {

    ctx.throw(error);

  }

  await next();

};
