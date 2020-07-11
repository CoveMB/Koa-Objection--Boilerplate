const { authenticated } = require('globalMiddlewares');
const requests = require('./middlewares/auth.requests');
const records = require('./middlewares/auth.records');
const controller = require('./auth.controller');

module.exports = Router => {

  const router = new Router();

  router
    .post(
      '/login',
      requests.loginSchema,
      records.loginRecords,
      controller.logIn
    )
    .post(
      '/logout',
      requests.logoutSchema,
      authenticated,
      controller.logOut
    )
    .post(
      '/logoutAll',
      requests.logoutAllSchema,
      authenticated,
      controller.logOutAll
    )
    .post(
      '/check-token',
      authenticated,
      controller.checkToken
    )
    .post(
      '/request-password-reset',
      requests.requestResetPasswordSchema,
      records.requestResetPasswordRecords,
      controller.requestResetPassword
    )
    .post(
      '/set-password',
      requests.setPasswordSchema,
      authenticated,
      controller.setPassword
    );

  return router;

};
