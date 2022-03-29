module.exports = function modelToId(obj) {
  const newObj = {};
  newObj.id = obj._id;
  return newObj;
};