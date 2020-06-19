const jwt = require('jsonwebtoken');
const { jwtSecret } = require('config/variables');

const generateAuthToken = async(user, temporary) => {

  const token = await jwt.sign({ id: user.id }, jwtSecret);

  // If the token is temporary it will expire in one hour
  let date = null;

  if (temporary) {

    date = new Date();
    date.setHours(date.getHours() + 1);

  }

  await user
    .$relatedQuery('tokens')
    .insert({
      token, expiration: date
    });

  return token;

};

async function revokeAuthToken(user, token) {

  await user
    .$relatedQuery('tokens')
    .delete()
    .where('token', token);

  return true;

}

async function revokeAllAuthTokens(user) {

  await user
    .$relatedQuery('tokens')
    .delete();

  return true;

}

module.exports = {
  generateAuthToken, revokeAuthToken, revokeAllAuthTokens
};
