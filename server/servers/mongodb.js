const mongoose = require('mongoose');

const mongodb_uri = process.env.MONGO_URI || 'mongodb://localhost/team-marvel';

mongoose.connect(mongodb_uri,  {
  useUnifiedTopology: true,
  useNewUrlParser: true
})
  .then(() => console.log('Connected to db'))
  .catch((error) => console.log(error));

const mongo = mongoose.connection
module.exports = mongo;