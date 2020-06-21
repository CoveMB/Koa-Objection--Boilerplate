const server = require('config/server');
const request = require('supertest')(server.callback());
const { User } = require('models');
const { setUpDb, tearDownDb } = require('./fixtures/setup');
const { countInstances } = require('./fixtures/database');
const { ValidationError } = require('config/errors/errorTypes');
const {
  getFreshToken, getUserData, changeTestUser
} = require('./fixtures/helper');

beforeAll(setUpDb);
afterAll(tearDownDb);

test('Should sign up new user, generating fresh token', async() => {

  const nbUsersBefore = await countInstances(User);

  const newUser = {
    email: 'nezuser@email.com', password: 'P@ssword2000'
  };

  const response = await request
    .post('/api/v1/users')
    .send(newUser);

  const nbUsersAfter = await countInstances(User);

  const newUserDB = await User.query()
    .findById(response.body.user.id)
    .withGraphFetched('tokens');

  expect(response.status).toBe(201);
  expect(newUserDB).not.toBeNull();
  expect(nbUsersAfter).toBe(nbUsersBefore + 1);
  expect(response.body.user.email).toBe(newUserDB.email);
  expect(response.body.token.token).toBe(newUserDB.tokens[0].token);

});

test('Should update user', async() => {

  const { credentials, id } = getUserData();
  const { email } = credentials;

  const token = await getFreshToken(request);

  const response = await request
    .patch(`/api/v1/users/${id}`)
    .send({
      email: `changed${email}`
    })
    .set('Authorization', `Bearer ${token}`);

  const updatedUser = await User.query()
    .findOne({ id });

  expect(response.status).toBe(200);
  expect(updatedUser.email).toBe(`changed${email}`);

  changeTestUser({
    credentials: {
      ...credentials, email: `changed${email}`
    }
  });

});

test('Should not update user if invalid field is sent', async() => {

  const { id } = getUserData();

  const token = await getFreshToken(request);

  const response = await request
    .patch(`/api/v1/users/${id}`)
    .send({
      'favorite-color': 'purple'
    })
    .set('Authorization', `Bearer ${token}`);

  expect(response.status).toBe(422);
  expect(response.body.error).toBe(new ValidationError().name);

});

test('Can access users if authenticated admin', async() => {

  const newAdmin = {
    email: 'testadmin@email.com', password: 'P@ssword2000', admin: true
  };

  const createAdminResponse = await request
    .post('/api/v1/users')
    .send(newAdmin);

  const response = await request
    .get('/api/v1/users')
    .set('Authorization', `Bearer ${createAdminResponse.body.token.token}`);

  expect(response.status).toBe(200);

});

test('Should delete user', async() => {

  const { id } = getUserData();

  const token = await getFreshToken(request);

  const response = await request
    .delete(`/api/v1/users/${id}`)
    .set('Authorization', `Bearer ${token}`);

  const updatedUser = await User.query()
    .findOne({ id });

  expect(response.status).toBe(200);
  expect(updatedUser).toBeUndefined();

});
