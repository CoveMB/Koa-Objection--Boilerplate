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
      controller.logOut
    )
    .post(
      '/logoutAll',
      requests.logoutAllSchema,
      controller.logOutAll
    )
    .post(
      '/check-token',
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
      controller.setPassword
    )
    .post(
      '/register-third-party',
      requests.registerThirdPartySchema,
      records.registerThirdPartyRecords,
      controller.registerThirdParty

    );

  return router;

};
