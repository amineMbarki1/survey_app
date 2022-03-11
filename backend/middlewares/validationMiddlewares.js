'use strict';
const Joi = require('joi');

const HttpError = require('../utils/httpError');

const handleValidationErrors = (error) => {
  const field = error.details[0].context.key;
  const message = error.details[0].message;
  const httpCode = 400;

  return new HttpError(message, httpCode, field);
};

exports.validateRegistrationData = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(4).max(20).required().messages({
      'string.empty': 'Please provide a name',
      'string.min': 'name should have a minimum length of 5',
      'string.max': 'name should have a minimum length of 20',
    }),
    password: Joi.string().min(6).required().messages({
      'string.empty': 'Please provide a passowrd',
      'string.min': 'Password should have a minimum length of 5',
    }),
    email: Joi.string().email().required().messages({
      'string.email': 'Provide a valid email',
      'string.empty': 'Please Provide an email',
    }),
  });

  const { error } = schema.validate(req.body);

  if (error) return next(handleValidationErrors(error));
  next();
};

exports.validateSurveyData = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().min(4).max(30).required(),
    status: Joi.string().valid('draft', 'active').required(),
    description: Joi.string(),
    expireDate: Joi.date().required(),
    questions: Joi.array().items(
      Joi.object({
        type: Joi.string().valid('text', 'textarea', 'select', 'radio', 'checkbox').required(),
        question: Joi.string().required(),
        description: Joi.string(),
        options: Joi.array().items(Joi.object({ option: Joi.string().required() })),
      })
    ),
  });

  const { error } = schema.validate(req.body);

  if (error) return next(handleValidationErrors(error));
  next();
};
