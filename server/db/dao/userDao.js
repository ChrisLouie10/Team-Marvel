const User = require('../models/usersModel');

async function createUser(name, email) {
  const user = new User({name, email});
  return user.save();
}

module.exports = {
  createUser
};