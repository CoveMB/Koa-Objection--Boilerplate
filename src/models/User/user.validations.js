const passwordComplexity = require('joi-password-complexity');
const { ValidationError } = require('errors/errorTypes');
const Joi = require('@hapi/joi');

const passwordValidation = password => {

  const complexityOptions = {
    min             : 8,
    max             : 80,
    lowerCase       : 1,
    upperCase       : 1,
    numeric         : 1,
    symbol          : 1,
    requirementCount: 6,
  };

  const { error } = passwordComplexity(complexityOptions).validate(password);

  if (error) {

    error.message = error.message.replace('value', 'password');

    throw new ValidationError(error.message);

  }

};

const emailValidation = email => {

  const emailSchema = Joi.string().email();

  const { error } = emailSchema.validate(email);

  if (error) {

    error.details.message = error.message.replace('value', 'email');

    throw new ValidationError(error.details.message);

  }

};

const validateUserInput = payload => {

  // Validate the password
  if (payload.password) {

    passwordValidation(payload.password);

  }

  // Validate email
  if (payload.email) {

    emailValidation(payload.email);

  }

};

module.exports = validateUserInput;
