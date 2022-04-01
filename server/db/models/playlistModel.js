const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Playlist = new Schema({
  playlistName: String,
  songs: [{
    songName: String,
    songUrl: String
  }]
});

module.exports = mongoose.model("Playlist", Playlist)