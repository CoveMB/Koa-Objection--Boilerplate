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

// Get hooks argument from the query and return is the query comes from a graphql query
const isFromGraphqlQuery = hooksArguments => {

  const { context } = hooksArguments;
  const { isGraphqlQuery } = context;

  return isGraphqlQuery;

};

module.exports = {
  validateInput, validateFoundInstances, isFromGraphqlQuery
};
