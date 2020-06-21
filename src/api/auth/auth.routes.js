const requests = require('./middlewares/auth.requests');
const { authenticated, validate } = require('globalMiddlewares');
const records = require('./middlewares/auth.records');
const controller = require('./auth.controller');

module.exports = Router => {

  const router = new Router();

  router
    .post(
      '/login',
      validate(requests.loginSchema, 'body'),
      records.loginRecords,
      controller.logIn
    )
    .post(
      '/logout',
      validate(requests.logoutSchema, 'body'),
      authenticated,
      controller.logOut
    )
    .post(
      '/logoutAll',
      validate(requests.logoutSchema, 'body'),
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
      validate(requests.requestResetPasswordSchema, 'body'),
      records.requestResetPasswordRecords,
      controller.requestResetPassword
    )
    .post(
      '/reset-password',
      validate(requests.resetPasswordSchema, 'body'),
      authenticated,
      controller.resetPassword
    );

  return router;

};
