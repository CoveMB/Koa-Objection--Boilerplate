const { loginSchema, logoutSchema } = require('./middlewares');
const { authenticated, validate } = require('globalMiddlewares');
const controller = require('./auth.controller');

module.exports = Router => {

  const router = new Router();

  router
    .post('/login', validate(loginSchema, 'body'), controller.logIn)
    .post('/logout', validate(logoutSchema, 'body'), authenticated, controller.logOut)
    .post('/logoutAll', validate(logoutSchema, 'body'), authenticated, controller.logOutAll);

  return router;

};
