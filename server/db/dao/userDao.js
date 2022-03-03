const mongoose= require('mongoose')
const User = require('../models/usersModel');

function createUser(name, email, password) {
  const user = new User({name, email, password});
  return user.save();
}

function findUserByEmail(email) {
  return User.findOne({email});
}

function findUserById(id) {
  if(!mongoose.isValidObjectId(id)) return null;
  return User.findOne({_id: id});
}

module.exports = {
  createUser,
  findUserByEmail,
  findUserById
};