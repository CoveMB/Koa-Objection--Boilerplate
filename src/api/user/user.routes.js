const controller = require('./user.controller');
const { authenticated, validate } = require('globalMiddlewares');
const { createUpdateSchema, isSelfOrAdmin } = require('./middlewares');

module.exports = Router => {

  const router = new Router({
    prefix: '/users',
  });

  router
    .post('/',
      validate(createUpdateSchema, 'body'),
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
      validate(createUpdateSchema, 'body'),
      authenticated,
      isSelfOrAdmin,
      controller.updateOne)
    .delete('/:id',
      authenticated,
      isSelfOrAdmin,
      controller.deleteOne);

  return router;

};
