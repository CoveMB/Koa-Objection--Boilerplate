const controller = require('./user.controller');
const requests = require('./middlewares/user.requests');
const access = require('./middlewares/user.access');
const records = require('./middlewares/user.records');

module.exports = Router => {

  const router = new Router({
    prefix: '/users',
  });

  router
    .get(
      '/profile',
      controller.getProfile
    )
    .get(
      '/:uuid',
      access.isSelfOrAdmin,
      records.getByIdRecords,
      controller.getOne
    )
    .get(
      '/',
      access.isSelfOrAdmin,
      records.getAllRecords,
      controller.getAll
    )
    .post(
      '/',
      requests.createUpdateSchema,
      controller.createOne
    )
    .patch(
      '/:uuid',
      requests.createUpdateSchema,
      access.isSelfOrAdmin,
      records.getByIdRecords,
      controller.updateOne
    )
    .delete(
      '/:uuid',
      access.isSelfOrAdmin,
      records.getByIdRecords,
      controller.deleteOne
    );

  return router;

};
