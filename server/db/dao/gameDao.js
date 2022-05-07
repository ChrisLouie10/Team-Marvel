const mongoose = require('mongoose');
const Game = require('../models/GameModel');
const { gameToObject } = require('../../lib/converters/gameConverter');

function createGame(game) {
  const newGame = new Game(gameToObject(game));
  return newGame.save();
}

function findAllGames() {
  return Game.find();
}

function findGameById(id) {
  if(!mongoose.isValidObjectId(id)) return null;
  return Game.findOne({_id: id});
}

function findGamesByPlayerId(playerId) {
  if(!mongoose.isValidObjectId(playerId)) return null;
  return Game.find({ 'players.playerId' : playerId })
}

module.exports = {
  createGame,
  findAllGames,
  findGameById,
  findGamesByPlayerId
};
