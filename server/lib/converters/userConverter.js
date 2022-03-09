function userToId(user) {
  let obj = {}
  obj.id = user._id;
  return obj
}

function userToObject(user) {
  let obj = {}
  obj.username = user.username;
  return obj;
}

module.exports = {
  userToId,
  userToObject
}