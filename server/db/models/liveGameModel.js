const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// const LiveGame = new Schema({
//   gamePin: Number,
//   playlist: Number,
//   host: Number,
//   players: Object,
//   createdAt: { type: Date, expires: 30, default: Date.now}
// });

// Test driver
const LiveGame = new Schema({
  gamePin: String,
  createdAt: { type: Date, expires: 3600, default: Date.now},
});

module.exports = mongoose.model("LiveGame", LiveGame)