// const controller = require('./graphql.controller');
const { authenticated } = require('globalMiddlewares');
const controller = require('./graphql.controller');

module.exports = Router => {

  const router = new Router({
    prefix: '/graphql',
  });

  router
    .all(
      '/',

      // authenticated,
      controller.graphql);

  return router;

};
