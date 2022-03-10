const Joi = require('joi');

const accountValidation = Joi.object({
  username: Joi.string().min(5).max(64).required(),
  password: Joi.string().min(6).max(64).required()
});

module.exports ={
  accountValidation
}