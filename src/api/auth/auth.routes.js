const requests = require('./middlewares/auth.requests');
const { authenticated, validate } = require('globalMiddlewares');
const records = require('./middlewares/auth.records');
const controller = require('./auth.controller');

module.exports = Router => {

  const router = new Router();

  router
    .post('/login',
      validate(requests.loginSchema, 'body'),
      records.loginRecords,
      controller.logIn)
    .post('/logout',
      validate(requests.logoutSchema, 'body'),
      authenticated,
      controller.logOut)
    .post('/logoutAll',
      validate(requests.logoutSchema, 'body'),
      authenticated,
      controller.logOutAll);

  return router;

};
