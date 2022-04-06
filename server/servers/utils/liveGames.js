class LiveGames {

  constructor () {
    this.games = {};
  }

  addGame(gameData){
    this.games[gameData.gamePin] = gameData;
    return this.games[gameData.gamePin];
  }

  removeGame(gamePin){
    var game = this.getGame(gamePin);
    
    // if game exists, remove from live games
    if(game){
      delete this.games[gamePin]
    }
    return game;
  }

  getGame(gamePin){
    return this.games[gamePin];
  }

  // getNewSongFromGame(gamePin) {
  //   const 
  // }

  addPlayer(gamePin, playerData) {
    // find the game
    const game = this.getGame(gamePin)
    if (game) {
      game.players.push(playerData)
    }

    return game
  }

  removePlayer(socketId) {
    // find the game the player is in
    let game = null;
    for(let gamePin in this.games) {
      if(this.games[gamePin].players.filter((player) => player.playerSocketId == socketId)) {
        game = this.games[gamePin];
        break;
      }
    }
    if (game) {
      // remove player from the game
      game.players = game.players.filter(player => player.playerSocketId !== socketId)
    }

    return game
  }
}

module.exports = {LiveGames};