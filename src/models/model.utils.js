const { ValidationError } = require('config/errors/errorTypes');

const validateInput = (schema, input) => {

  const { error } = schema.validate(input);

  if (error) {

    throw new ValidationError(error.details.message);

  }

};

module.exports = { validateInput };
