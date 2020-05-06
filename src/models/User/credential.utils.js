// const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('config/variables');

const generateAuthToken = async user => {

  const token = await jwt.sign({ id: user.id }, jwtSecret);

  await user
    .$relatedQuery('tokens')
    .insert({ token });

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
