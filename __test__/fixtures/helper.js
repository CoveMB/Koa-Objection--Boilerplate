let testUser = {
  credentials: {
    email   : 'greatemail@exemple.com',
    password: 'P@ssword2000'
  },
  id: 3,
};

const getUserData = () => ({
  ...testUser, ...testUser.credentials
});

const changeTestUser = newData => {

  const user = JSON.parse(JSON.stringify(getUserData()));

  Object.keys(newData).forEach(dataToChange => {

    user[dataToChange] = newData[dataToChange];

  });

  testUser = user;

  return user;

};

const getFreshToken = async request => {

  const { credentials } = getUserData();

  const loginResponse = await request
    .post('/api/v1/login')
    .send({ ...credentials });

  return loginResponse.body.token.token;

};

module.exports = {
  getFreshToken,
  getUserData,
  changeTestUser
};
