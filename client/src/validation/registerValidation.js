const Joi = require('joi');

const registerValidation = Joi.object({
  email: Joi.string().email({ tlds: {allow: false } }).min(5).max(64).required().label('Email'),
  name: Joi.string().min(2).max(32).required().label('Name'),
  password: Joi.string().min(6).max(64).required().label('Password')
});

module.exports ={
  registerValidation
}