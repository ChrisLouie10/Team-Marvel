class LiveGames {

  constructor () {
    this.games = [];
  }

  addGame(gameData){
    const game = gameData;
    this.games.push(game);
    return game;
  }

  setLiveGame(hostSocketId) {
    var game = this.getGame(hostSocketId);
    if (game) {
      game.gameLive = !game.gameLive;
    }
    return game;
  }

  setPlayersConnected(hostSocketId, cmd) {
    console.log("add or remove player")
    var game = this.getGame(hostSocketId);
    if (cmd == "add") {
      console.log('adding')
      game.playersConnected += 1;
    }
    else if(cmd == "remove") {
      console.log('removing')
      game.playersConnected -= 1;
    }
    return game;
  }

  removeGame(hostSocketId){
    var game = this.getGame(hostSocketId);
    
    // if game exists, remove from live games
    if (game) {
      this.games = this.games.filter((game) => game.hostSocketId !== hostSocketId);
    }
    return game;
  }

  getGame(hostSocketId){
    return this.games.filter((game) => game.hostSocketId === hostSocketId)[0]
  }

  addPlayer(gamePin, playerData) {
    // find the game
    const game = this.games.filter(game => game.gamePin === gamePin)[0]
    if (game) {
      game.players.push(playerData)
    }

    return game
  }

  removePlayer(socketId) {
    // find the game the player is in
    const game = this.games.filter((game) => game.players.filter(player => player.playerSocketId === socketId)[0])[0]
    if (game) {
      // remove player from the game
      game.players = game.players.filter(player => player.playerSocketId !== socketId)
    }

    return game
  }
}

module.exports = {LiveGames};