const mongoose= require('mongoose')
const User = require('../models/usersModel');

function createUser(username, password) {
  const user = new User({username, password});
  return user.save();
}

function findUserByUsername(username) {
  return User.findOne({username});
}

function findUserById(id) {
  if(!mongoose.isValidObjectId(id)) return null;
  return User.findOne({_id: id});
}

module.exports = {
  createUser,
  findUserByUsername,
  findUserById
};