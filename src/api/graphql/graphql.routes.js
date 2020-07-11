const { authenticated } = require('globalMiddlewares');
const requests = require('./middlewares/graphql.requests');
const controller = require('./graphql.controller');

module.exports = Router => {

  const router = new Router({
    prefix: '/graphql',
  });

  router
    .post(
      '/',
      requests.query,
      authenticated,
      controller.graphql
    );

  return router;

};
