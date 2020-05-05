const { validateRequest } = require('./middlewares');
const { authenticated } = require('globalMiddlewares');
const controller = require('./task.controller');

module.exports = Router => {

  const router = new Router({
    prefix: '/tasks',
  });

  // The validateBody middleware validate the request body
  router
    .post('/', authenticated, validateRequest, controller.createOne)
    .get('/', authenticated, controller.getAll)
    .get('/:id', authenticated, controller.getOne)
    .patch('/:id', authenticated, validateRequest, controller.updateOne)
    .delete('/:id', authenticated, controller.deleteOne);

  return router;

};
