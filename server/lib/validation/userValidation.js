const Joi = require('joi');

const registerValidation = Joi.object({
  email: Joi.string().email().min(5).max(64).required(),
  name: Joi.string().min(2).max(32).required(),
  password: Joi.string().min(6).max(64).required()
});

const loginValidation = Joi.object({
  email: Joi.string().email().min(5).max(64).required(),
  password: Joi.string().min(6).max(64).required()
});

module.exports ={
  registerValidation,
  loginValidation
}