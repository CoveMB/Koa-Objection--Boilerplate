const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('config/variables');
const { LoginError } = require('errors/errorTypes');

async function hashPassword(next) {

  // Check if the user is modified on the user document
  if (this.isModified('password')) {

    this.password = await bcrypt.hash(this.password, 12);

  }

  next();

}

async function generateAuthToken() {

  const token = jwt.sign({ id: this.id }, jwtSecret);

  this.tokens = [ ...this.tokens, { token } ];
  await this.save();

  return token;

}

async function revokeAuthToken(token) {

  const updatedTokenList = this.tokens.filter(tokenFromList => tokenFromList.token !== token);

  this.tokens = [ ...updatedTokenList ];
  await this.save();

  return true;

}

async function revokeAllAuthTokens() {

  this.tokens = [];
  await this.save();

  return true;

}

async function findByCredentials(ctx, credentials) {

  const { email, password } = credentials;

  const user = await this.findOne({ email });

  if (!user) {

    ctx.throw(new LoginError());

  }

  const authenticated = await bcrypt.compare(password, user.password);

  if (!authenticated) {

    ctx.throw(new LoginError());

  }

  return user;

}

module.exports = {
  hashPassword, findByCredentials, generateAuthToken, revokeAuthToken, revokeAllAuthTokens
};
