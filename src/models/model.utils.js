const { ValidationError, NotFoundError } = require('config/errors/errorTypes');

const validateInput = (schema, input) => {

  const { error } = schema.validate(input);

  if (error) {

    throw new ValidationError(error.details.message);

  }

};

const validateFoundInstances = instancesToCheck => {

  instancesToCheck.forEach(instanceToCheck => {

    const { instance, type, search } = instanceToCheck;

    if (instance === undefined) {

      throw new NotFoundError(`${type}${search ? `, Requested: ${search}` : ''}`);

    }

  });

};

module.exports = {
  validateInput, validateFoundInstances
};
