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

  setLiveGame(gamePin, isLive) {
    var game = this.getGame(gamePin);
    if (game) {
      game.gameLive = isLive;
    }
    return game;
  }

  setPlayersConnected(gamePin, cmd) {
    console.log("add or remove player")
    var game = this.getGame(gamePin);
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

  updatePlayerScore(gamePin, playerId, answer) {
    const game = this.getGame(gamePin)
    let score = -1;
    if(game) {
      const player = game.players.find(player => player.playerSocketId == playerId)
      if(player) {
        console.log('current answer: ' + answer + '\t\treal answer: ' + game.answers[game.currentQuestion])
        if(answer == game.answers[game.currentQuestion]) {
          player.score += game.time * 33;
        }
        score = player.score;
      }
      game.playersAnswered++
      return score;
    }
    return score;
  }

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

  closeTime(gamePin) {
    const game = this.getGame(gamePin);
    if(game) {
      game.time = 1;
    }
  }

  getTopPlayers(gamePin) {
    const game = this.getGame(gamePin);
    if(game) {
      game.players.sort((a, b) => {
        return b.score - a.score
      })
      return game.players.slice(0, 5)
    }
    return [];
  }
}

module.exports = {LiveGames};