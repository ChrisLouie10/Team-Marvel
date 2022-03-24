const LiveGame = require('../models/liveGameModel');

function createGame(pin) {
  let date = Date.now()
  const game = new LiveGame({pin, date});
  return game.save();
}

function findGameByPin(pin) {
  return LiveGame.findOne({pin});
}

module.exports = {
  createGame,
  findGameByPin
};