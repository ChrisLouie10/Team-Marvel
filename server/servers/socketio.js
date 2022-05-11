
const app = require('./express');
const { customAlphabet } = require('nanoid')
const nanoid = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', 10)
const { findPlaylistById } = require('../db/dao/playlistDao');
const { playlistToObject } = require('../lib/converters/playlistConverter');
const { createGame } = require('../db/dao/gameDao');
const shuffleArray = require('./utils/shuffleArray');

// import classes
const {LiveGames} = require('./utils/liveGames');
var games = new LiveGames();

// set up socketio
const server = require('http').createServer(app);
const io = require('socket.io')(server);

io.on('connection', (socket) => {

  socket.on('disconnect', async () => {

    // remove user from live game
    const game = games.removePlayer(socket.id)
    if (!game) {
      return
    } 

    // set game pin for clarity
    const gamePin = game.gamePin

    // if the host disconnected, end the game
    if (game.hostSocketId === socket.id) {
      io.to(gamePin).emit('endGame', {message: "host has disconnected"})
      games.removeGame(gamePin)
      return
    }

    // update lobby for users in lobby
    io.to(gamePin).emit('lobbyData', game)
  })
  
  socket.on('createGame', async (data) => {
    // create game PIN
    const gamePin = nanoid();

    // set data
    const hostName = data.hostName
    const hostId = data.hostId
    const playlist = playlistToObject(await findPlaylistById(data.playlistId))

    if(!playlist.songs || playlist.songs.length < 20) return

    // create a live game in the database with game data
    const game = games.addGame({ 
      gamePin: gamePin, 
      hostSocketId: socket.id, 
      gameLive: false,
      playlistName: playlist.playlistName,
      playlist: playlist.songs, 
      answers: [],
      currentQuestion: -1, 
      playersAnswered: 0,
      playersConnected: 0,
      time: 0,
      date: Date.now(),
      players: [{
        playerSocketId: socket.id, 
        playerId: hostId, 
        playerName: hostName,
        score: 0
      }]
    })
    if (!game) {
      return
    }

    // connect socket to room
    socket.join(gamePin);
    
    // update lobby for users in lobby
    io.to(gamePin).emit('lobbyData', game)
  })

  socket.on('joinGame', async (data) => {
    const gamePin = data.gamePin

    // when user joins a game, add them to the game's players
    const game = games.addPlayer(gamePin, {playerSocketId: socket.id, playerId: data.playerId, playerName: data.playerName, score: 0})
    if (!game) {
      socket.emit('gameNotFound')
      return
    }

    // connect socket to room
    socket.join(gamePin);

    // update lobby for users in lobby
    io.to(gamePin).emit('lobbyData', game)
  })

  socket.on('playerLeftGame', () => {
    console.log('a user left a game')

    // remove user from live game
    const game = games.removePlayer(socket.id)
    if (!game) {
      console.log("was not in a game")
      return
    } else console.log("player removed from live game")

    // set game pin for clarity
    const gamePin = game.gamePin

    // if the host disconnected, end the game
    if (game.hostSocketId === socket.id) {
      console.log("game removed from live games")
      io.to(gamePin).emit('endGame', {message: "host has disconnected"})
      games.removeGame(gamePin)
      return
    }

    // update lobby for users in lobby
    io.to(gamePin).emit('lobbyData', game)
  })

  socket.on('startGame', async (data) => {
    const game = games.setLiveGame(data.gamePin, true)

    game.playlist = shuffleArray(game.playlist);
    io.to(game.gamePin).emit('gameStart', game);
  })

  socket.on('connected', (data) => {
    const game = games.setPlayersConnected(data.gamePin, "add")
    // when all players connect, begin the countdown to next question
    if (game.playersConnected == game.players.length) {
      io.to(game.gamePin).emit('connected')
    }
  })

  socket.on('nextQuestion', async (gamePin) => {
    // set up the next song to be sent
    const game = games.getGame(gamePin)
    game.currentQuestion++
    if(game.currentQuestion > 4) {
      io.to(gamePin).emit('endGame', {message: "game over"})
      games.removeGame(gamePin)
      await createGame(game)
      return
    }
    const nextSong = game.playlist[game.currentQuestion * 4].songUrl
    const countdown = () => {
      // Send current time to connected users
      io.to(game.gamePin).emit('countdown', timer--);

      // Stop timer once interval is less than 0, then send next question
      if (timer < 0) {
        clearInterval(timerId);
        let answers = game.playlist.slice(game.currentQuestion * 4 + 1, game.currentQuestion * 4 + 4);
        game.answers.push(Math.floor(Math.random() * 4));
        answers.splice(game.answers[game.currentQuestion], 0, game.playlist[game.currentQuestion * 4]);
        io.to(game.gamePin).emit('nextQuestion', {
          song: nextSong, 
          answers: answers.map((song) => song.songName),
          answer: game.answers[game.currentQuestion]
        });
        if(game){
          game.time = 30;
          let timer = setInterval(() => {
            game.time--;
            if(game.time == 0) clearInterval(timer);
          }, 1000);
        }
      }
    }
  
    let timer = 3;
    // Call countdown once every second
    let timerId = setInterval(countdown, 1000);
  })

  socket.on('answer', (data) => {
    const score = games.updatePlayerScore(data.gamePin, data.playerId, data.answer);
    io.to(data.playerId).emit('score', score)
  })

  socket.on('endQuestion', (gamePin) => {
    games.closeTime(gamePin);
    io.to(gamePin).emit('endQuestion', games.getTopPlayers(gamePin))
  });
  
})

module.exports = server;