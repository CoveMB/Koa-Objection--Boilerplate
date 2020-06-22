const server = require('config/server');
const request = require('supertest')(server.callback());
const { User } = require('models');
const { setUpDb, tearDownDb } = require('./fixtures/setup');
const { ValidationError } = require('config/errors/errorTypes');
const { getFreshToken, getUserData } = require('./fixtures/helper');

beforeAll(setUpDb);
afterAll(tearDownDb);

test('Should sign up new user, generating fresh token', async() => {

  const newUser = {
    email: 'nezuser@email.com', password: 'P@ssword2000'
  };

  // Create user
  const response = await request
    .post('/api/v1/users')
    .send(newUser);

  // Query the new user
  const newUserDB = await User.query()
    .findById(response.body.user.id)
    .withGraphFetched('tokens');

  expect(response.status).toBe(201);

  // New user should exist in db
  expect(newUserDB).not.toBeUndefined();

  // The right user should be returned
  expect(response.body.user.email).toBe(newUserDB.email);

  // The right token should be returned
  expect(response.body.token.token).toBe(newUserDB.tokens[0].token);

});

test('Should update user', async() => {

  const newUser = {
    email: 'nezuser2@email.com', password: 'P@ssword2000'
  };

  // Create user
  const responseNewUser = await request
    .post('/api/v1/users')
    .send(newUser);

  const { user, token } = responseNewUser.body;

  // Request a user update with the fresh token
  const response = await request
    .patch(`/api/v1/users/${user.id}`)
    .send({
      email: `changed${user.email}`
    })
    .set('Authorization', `Bearer ${token.token}`);

  // Query the updated user
  const updatedUser = await User.query()
    .findOne({ id: user.id });

  expect(response.status).toBe(200);

  // The email should be different
  expect(updatedUser.email).toBe(`changed${user.email}`);

});

test('Should not update user if invalid field is sent', async() => {

  const { id } = getUserData();

  // Get fresh token
  const token = await getFreshToken(request);

  // Send request with invalid field
  const response = await request
    .patch(`/api/v1/users/${id}`)
    .send({
      'favorite-color': 'purple'
    })
    .set('Authorization', `Bearer ${token}`);

  // A validation error is triggered
  expect(response.status).toBe(422);
  expect(response.body.error).toBe(new ValidationError().name);

});

test('Can access users if authenticated admin', async() => {

  const newAdmin = {
    email: 'testadmin@email.com', password: 'P@ssword2000', admin: true
  };

  // Create new admin
  const createAdminResponse = await request
    .post('/api/v1/users')
    .send(newAdmin);

  // Access users
  const response = await request
    .get('/api/v1/users')
    .set('Authorization', `Bearer ${createAdminResponse.body.token.token}`);

  expect(response.status).toBe(200);

});

test('Should delete user', async() => {

  const newUser = {
    email: 'nezuser2@email.com', password: 'P@ssword2000'
  };

  // Create user
  const responseNewUser = await request
    .post('/api/v1/users')
    .send(newUser);

  const { user, token } = responseNewUser.body;

  // Request user delete
  const response = await request
    .delete(`/api/v1/users/${user.id}`)
    .set('Authorization', `Bearer ${token.token}`);

  // Query user
  const updatedUser = await User.query()
    .findOne({ id: user.id });

  expect(response.status).toBe(200);

  // User should not been found in database
  expect(updatedUser).toBeUndefined();

});
