const passwordComplexity = require('joi-password-complexity');
const Joi = require('@hapi/joi');

const passwordValidation = (password) => {

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

    throw new Error(error);

  }

};

const emailValidation = (email) => {

  const emailSchema = Joi.string().email();

  const { error } = emailSchema.validate(email);

  if (error) {

    throw new Error(error.details.message);

  }

};

module.exports = {
  passwordValidation, emailValidation
};
