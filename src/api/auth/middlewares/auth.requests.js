const Joi = require('@hapi/joi');

exports.loginSchema = Joi.object({
  email: Joi
    .string()
    .email()
    .required(),
  password: Joi
    .string()
    .required()
});

exports.logoutSchema = Joi.object({
});
