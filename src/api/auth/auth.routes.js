const { loginSchema } = require('./middlewares');
const { authenticated, validate } = require('globalMiddlewares');
const controller = require('./auth.controller');

module.exports = Router => {

  const router = new Router();

  router
    .post('/login', validate(loginSchema, 'body'), controller.logIn)
    .post('/logout', authenticated, controller.logOut)
    .post('/logoutAll', authenticated, controller.logOutAll);

  return router;

};
