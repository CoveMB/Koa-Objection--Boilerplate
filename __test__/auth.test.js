const server = require('config/server');
const request = require('supertest')(server.callback());
const { User, Token } = require('models');
const { NotAuthenticatedError } = require('config/errors/errorTypes');
const { setUpDb, tearDownDb } = require('./fixtures/setup');
const { getFreshToken, getUserData } = require('./fixtures/helper');

beforeAll(setUpDb);
afterAll(tearDownDb);

test('Should login user with correct authentication dont return plain password', async() => {

  const { credentials, email, password } = getUserData();

  const response = await request
    .post('/api/v1/login')
    .send(credentials);

  const userDb = await User.query()
    .findOne({ email });

  expect(response.status).toBe(200);
  expect(userDb.password).not.toBe(password);
  expect(response.body.user.email).toBe(userDb.email);

});

test('Should generate fresh valid 6 month token on logging', async() => {

  const { credentials } = getUserData();

  const response = await request
    .post('/api/v1/login')
    .send(credentials);

  const token = await Token.query()
    .findOne({ token: response.body.token.token })
    .withGraphFetched('user');

  const now = new Date();
  const tokenExpiration = new Date(response.body.token.expiration);

  expect(tokenExpiration.getMonth()).toBe(now.getMonth() + 6);
  expect(response.body.token.token).toBe(token.token);

});

test('Should not login user with wrong password', async() => {

  const { email, password } = getUserData();

  const response = await request
    .post('/api/v1/login')
    .send({
      email, password: `wong${password}`
    });

  expect(response.status).toBe(401);
  expect(response.body.token).toBeUndefined();

});

test('Canot access profile if not authenticated', async() => {

  const response = await request.get('/api/v1/users/1');

  expect(response.status).toBe(401);
  expect(response.body.message).toBe('You need to be authenticated to perform this action');
  expect(response.body.error).toBe(new NotAuthenticatedError().name);

});

test('Can access profile if authenticated', async() => {

  const token = await getFreshToken(request);

  const response = await request.get('/api/v1/users/profile')
    .set('Authorization', `Bearer ${token}`);

  expect(response.status).toBe(200);

});

test('Should logout user and revoke token', async() => {

  const token = await getFreshToken(request);

  const response = await request
    .post('/api/v1/logout')
    .set('Authorization', `Bearer ${token}`);

  const tokenDb = await Token.query()
    .findOne({ token });

  expect(response.status).toBe(200);
  expect(tokenDb).toBeUndefined();

});

test('Should not be able to logging with revoked token', async() => {

  const token = await getFreshToken(request);

  await request
    .post('/api/v1/logout')
    .set('Authorization', `Bearer ${token}`);

  const secondLogout = await request
    .post('/api/v1/logout')
    .set('Authorization', `Bearer ${token}`);

  expect(secondLogout.status).toBe(401);

});

test('Should revoke all tokens', async() => {

  const { email } = getUserData();
  const token = await getFreshToken(request);

  const logoutResponse = await request
    .post('/api/v1/logoutAll')
    .set('Authorization', `Bearer ${token}`);

  const dbUser = await User.query()
    .findOne({ email })
    .withGraphFetched('tokens');

  expect(logoutResponse.status).toBe(200);
  expect(dbUser.tokens.length).toBe(0);

});

test('Should validate existing token', async() => {

  const token = await getFreshToken(request);

  const response = await request
    .post('/api/v1/check-token')
    .set('Authorization', `Bearer ${token}`);

  expect(response.status).toBe(200);

});

test('Should not validate revoked tokens', async() => {

  const token = await getFreshToken(request);

  await request
    .post('/api/v1/logout')
    .set('Authorization', `Bearer ${token}`);

  const response = await request
    .post('/api/v1/check-token')
    .set('Authorization', `Bearer ${token}`);

  expect(response.status).toBe(401);
  expect(response.body.message).toBe('You need to be authenticated to perform this action');
  expect(response.body.error).toBe(new NotAuthenticatedError().name);

});

test('Should request a password reset generating a temporary 1h valid token', async() => {

  const { email } = getUserData();

  const response = await request
    .post('/api/v1/request-password-reset')
    .send({
      email
    });

  const userDb = await User.query()
    .findOne({ email })
    .withGraphFetched('tokens(orderByCreation)');

  const now = new Date();
  const tokenExpiration = new Date(userDb.tokens[0].expiration);

  expect(response.status).toBe(200);
  expect(response.body.token).toBeUndefined();
  expect(tokenExpiration.getHours()).toBeLessThanOrEqual(now.getHours() + 1);

});

test('Should reset the password of user and make it unable to log with old password', async() => {

  const { credentials, password, email } = getUserData();

  await request
    .post('/api/v1/request-password-reset')
    .send({
      email
    });

  const userDb = await User.query()
    .findOne({ email })
    .withGraphFetched('tokens(orderByCreation)');

  const response = await request
    .post('/api/v1/reset-password')
    .send({
      password: `${password}2`
    })
    .set('Authorization', `Bearer ${userDb.tokens[0].token}`);

  const responseOldPassword = await request
    .post('/api/v1/login')
    .send(credentials);

  const responseNewPassword = await request
    .post('/api/v1/login')
    .send({
      email, password: `${password}2`
    });

  expect(response.status).toBe(200);
  expect(response.body.user.email).toBe(userDb.email);

  expect(responseNewPassword.status).toBe(200);
  expect(responseOldPassword.status).toBe(401);

});

test('Should reset the password and generate a fresh token and revoke all other tokens', async() => {

  const { credentials, password, email } = getUserData();

  await request
    .post('/api/v1/login')
    .send(credentials);

  await request
    .post('/api/v1/request-password-reset')
    .send({
      email
    });

  const userDb = await User.query()
    .findOne({ email })
    .withGraphFetched('tokens(orderByCreation)');

  const response = await request
    .post('/api/v1/reset-password')
    .send({
      password: `${password}3`
    })
    .set('Authorization', `Bearer ${userDb.tokens[0].token}`);

  const userDbAfterReset = await User.query()
    .findOne({ email })
    .withGraphFetched('tokens(orderByCreation)');

  const userTokens = await Token.query().where({ user_id: userDb.id });

  const now = new Date();
  const tokenExpiration = new Date(userDbAfterReset.tokens[0].expiration);

  expect(response.body.token.token).toBe(userDbAfterReset.tokens[0].token);
  expect(tokenExpiration.getMonth()).toBe(now.getMonth() + 6);
  expect(userTokens.length).toBe(1);

});
