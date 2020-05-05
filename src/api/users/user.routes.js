const controller = require('./user.controller');
const { authenticated } = require('globalMiddlewares');
const { validateRequest, isSelfOrAdmin } = require('./middlewares');

module.exports = Router => {

  const router = new Router({
    prefix: '/users',
  });

  router
    .post('/',
      validateRequest,
      controller.createOne)
    .get('/',
      authenticated,
      isSelfOrAdmin,
      controller.getAll)
    .get('/profile',
      authenticated,
      controller.getProfile)
    .get('/:id',
      authenticated,
      isSelfOrAdmin,
      controller.getOne)
    .patch('/:id',
      validateRequest,
      authenticated,
      isSelfOrAdmin,
      controller.updateOne)
    .delete('/:id',
      authenticated,
      isSelfOrAdmin,
      controller.deleteOne);

  return router;

};
