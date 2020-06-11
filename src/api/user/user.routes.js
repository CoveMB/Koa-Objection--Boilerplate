const controller = require('./user.controller');
const { authenticated, validate } = require('globalMiddlewares');
const requests = require('./middlewares/user.requests');
const access = require('./middlewares/user.access');
const records = require('./middlewares/user.records');

module.exports = Router => {

  const router = new Router({
    prefix: '/users',
  });

  router
    .get('/profile',
      authenticated,
      controller.getProfile)
    .get('/:id',
      authenticated,
      access.isSelfOrAdmin,
      records.getByIdRecords,
      controller.getOne)
    .get('/',
      authenticated,
      access.isSelfOrAdmin,
      records.getAllRecords,
      controller.getAll)
    .post('/',
      validate(requests.createUpdateSchema, 'body'),
      controller.createOne)
    .patch('/:id',
      validate(requests.createUpdateSchema, 'body'),
      authenticated,
      access.isSelfOrAdmin,
      records.getByIdRecords,
      controller.updateOne)
    .delete('/:id',
      authenticated,
      access.isSelfOrAdmin,
      controller.deleteOne);

  return router;

};
