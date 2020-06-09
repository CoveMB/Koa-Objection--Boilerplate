const server = require('config/server');
const request = require('supertest')(server.callback());
const { User } = require('models');
const { NotAuthenticatedError } = require('config/errors/errorTypes');
const { setUpDb, tearDownDb } = require('./fixtures/setup');
const {
  getFreshToken, getUserData, changeTestUser
} = require('./fixtures/helper');

beforeAll(setUpDb);
afterAll(tearDownDb);

test('Should login user, generating fresh token', async() => {

  const { credentials, email, password } = getUserData();

  const response = await request
    .post('/api/v1/login')
    .send(credentials);

  const userDb = await User.query()
    .findOne({ email })
    .withGraphFetched('tokens');

  expect(response.status).toBe(200);
  expect(userDb.password).not.toBe(password);
  expect(response.body)
    .toMatchObject({
      status: 'success',
      user  : {
        id   : userDb.id,
        email: userDb.email,
      },

      // Singing up a user a first token was generated so we compare to the second one
      token: userDb.tokens[0].token
    });

  changeTestUser({ token: response.body.token });

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

test('Canot access profile if  not authenticated', async() => {

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

test('Should logout user', async() => {

  const token = await getFreshToken(request);

  const response = await request
    .post('/api/v1/logout')
    .set('Authorization', `Bearer ${token}`);

  expect(response.status).toBe(200);

});

test('After logout the token should be revoked', async() => {

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
