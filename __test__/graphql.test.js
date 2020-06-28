const server = require('config/server');
const request = require('supertest')(server.callback());
const { setUpDb, tearDownDb } = require('./fixtures/setup');
const { getFreshToken, getUserData } = require('./fixtures/helper');
const { NotAuthenticatedError } = require('config/errors/errorTypes');
const { User } = require('models');

// Setup
beforeAll(setUpDb);
afterAll(tearDownDb);

test('Should only be able to make a post request to graphql endpoint', async() => {

  // Get fresh token
  const { token } = await getFreshToken(request);

  const query = `
    query {
        users(orderBy: id) {
          id
          email
          
          tokens {
            id
            token
          }
      
        }
    }`;

  // Access profile page sending the token
  const response = await request.get('/api/v1/graphql')
    .send({
      query
    })
    .set('Authorization', `Bearer ${token}`);

  //  Not authorized GET action
  expect(response.status).toBe(405);

});

test('Should be authenticated to make requests to graphql endpoint', async() => {

  const query = `
    query {
        users(orderBy: id) {
          id
          email
          
          tokens {
            id
            token
          }
      
        }
    }`;

  // Access profile page sending the token
  const response = await request.post('/api/v1/graphql')
    .send({
      query
    });

  //  Not authorized action
  expect(response.status).toBe(401);

  //  Not authorized error name
  expect(response.body.error).toBe(new NotAuthenticatedError().name);

});

test('Should only be able to query data related to authenticated user', async() => {

  // Get fresh token and related user from db
  const { token, user } = await getFreshToken(request);

  // Query all users and all tokens
  const query = `
    query {
        users(orderBy: id) {
          id
   
        }

        tokens(orderBy: id) {
          id
          device
          user {
            id
          }
        }
    }`;

  // Access profile page sending the token
  const response = await request.post('/api/v1/graphql')
    .send({
      query
    })
    .set('Authorization', `Bearer ${token}`);

  const responseData = response.body.data;

  // Make sure all the tokens return are only from the authenticated user
  const allTokenAreFromAuthenticatedUser = responseData.tokens.every(tokenFromGraphQl => tokenFromGraphQl.user.id === user.id);

  expect(responseData.users.length).toBe(1);
  expect(responseData.users[0].id).toBe(user.id);
  expect(allTokenAreFromAuthenticatedUser).toBe(true);

});
