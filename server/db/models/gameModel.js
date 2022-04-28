const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Game = new Schema({
  playlistName: String,
  players: [
    {
      playerId: String, 
      playerName: String,
      score: Number
    }
  ],
  date: Date
});

module.exports = mongoose.model("Game", Game)