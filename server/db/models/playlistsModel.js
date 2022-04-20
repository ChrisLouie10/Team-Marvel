const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Playlist = new Schema({
  playlistId: String,
  playlistDescription: String,
  songs: [String]
});

module.exports = mongoose.model("Playlist", Playlist)