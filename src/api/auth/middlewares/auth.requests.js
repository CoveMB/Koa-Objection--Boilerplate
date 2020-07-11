const Joi = require('@hapi/joi');
const { validateRequest } = require('globalMiddlewares');

exports.loginSchema = validateRequest(Joi.object({
  email: Joi
    .string()
    .email()
    .required(),
  password: Joi
    .string()
    .required()
}));

exports.logoutSchema = validateRequest(Joi.object({
  token: Joi
    .string()
    .required()
}));

exports.logoutAllSchema = validateRequest(Joi.object({
}));

exports.setPasswordSchema = validateRequest(Joi.object({
  password: Joi
    .string()
    .required()
}));

exports.requestResetPasswordSchema = validateRequest(Joi.object({
  email: Joi
    .string()
    .email()
    .required()
}));
