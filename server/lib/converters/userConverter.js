function userToObject(user) {
  let obj = {}
  obj.username = user.username;
  obj.id = user.id;
  return obj;
}

module.exports = {
  userToObject
}