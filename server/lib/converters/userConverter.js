function userToId(user) {
  let obj = {}
  obj.id = user._id;
  return obj
}

function userToObject(user) {
  let obj = {}
  obj.name = user.name;
  obj.email = user.email;
  return obj;
}

module.exports = {
  userToId,
  userToObject
}