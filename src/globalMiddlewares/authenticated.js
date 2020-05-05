const jwt = require('jsonwebtoken');
const User = require('models/User/User');
const { NotAuthenticatedError } = require('errors/errorTypes');
const { jwtSecret } = require('config/variables');

exports.authenticated = async(ctx, next) => {

  try {

    // Get the bearer token
    const token = ctx.get('Authorization').replace('Bearer ', '');

    // Make sure it's valid and get the user id from it
    const decoded = await jwt.verify(token, jwtSecret);

    // Find the appropriate user
    const user = await User.findOne({
      _id: decoded.id, 'tokens.token': token
    });

    if (!user) {

      // If no user is found throw a NotAuthenticatedError user
      ctx.throw(new NotAuthenticatedError());

    }

    // Attach the found user and current token to the response
    ctx.userRequest = user;
    ctx.token = token;

  } catch {

    ctx.throw(new NotAuthenticatedError());

  }

  await next();

};
