const Joi = require('joi');

const loginValidation = Joi.object({
  username: Joi.string().min(5).max(32).required().label('Username'),
  password: Joi.string().min(6).max(64).required().label('Password')
});

module.exports ={
    loginValidation
}