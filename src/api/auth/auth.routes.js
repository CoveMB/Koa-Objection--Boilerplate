const { validateLoginRequest } = require('./middlewares');
const { authenticated } = require('globalMiddlewares');
const controller = require('./auth.controller');

module.exports = Router => {

  const router = new Router();

  router
    .post('/login', validateLoginRequest, controller.logIn)
    .post('/logout', authenticated, controller.logOut)
    .post('/logoutAll', authenticated, controller.logOutAll);

  return router;

};
