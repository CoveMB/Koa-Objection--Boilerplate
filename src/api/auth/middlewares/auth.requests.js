const Joi = require('@hapi/joi');

const loginSchema = Joi.object({
  email: Joi
    .string()
    .email()
    .required(),
  password: Joi
    .string()
    .required()
});

const logoutSchema = Joi.object({
});

module.exports = {
  loginSchema, logoutSchema
};
