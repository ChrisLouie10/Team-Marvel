const Joi = require('joi');

const playlistValidation = Joi.object({
  playlistName: Joi.string().pattern(/[a-zA-Z0-9_]+/), 
  songs: Joi.array().items(Joi.object({
    songName: Joi.string(),
    songUrl: Joi.string()
  }))
});

module.exports ={
  playlistValidation
}