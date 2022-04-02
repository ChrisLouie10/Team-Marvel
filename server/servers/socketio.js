
const app = require('./express');
const { customAlphabet } = require('nanoid')
const nanoid = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', 10)
const { createPlaylist, findPlaylistById } = require('../db/dao/playlistDao');


// import classes
const {LiveGames} = require('./utils/liveGames');
var games = new LiveGames();

// set up socketio
const server = require('http').createServer(app);
const io = require('socket.io')(server);

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', async () => {
    console.log("a user disconnected")

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
      games.removeGame(socket.id)
      return
    }

    // update lobby for users in lobby
    io.to(gamePin).emit('lobbyData', game)
  })
  
  socket.on('createGame', (data) => {
    // create game PIN
    const gamePin = nanoid();

    // set data
    const hostName = data.hostName
    const hostId = data.hostId
    const playlistId = data.playlistId

    // create a live game in the database with game data
    const game = games.addGame({ 
      gamePin: gamePin, 
      hostSocketId: socket.id, 
      gameLive: false,
      playlistId: playlistId, 
      currentQuestion: 1, 
      playersAnswered: 0, 
      players: [{
        playerSocketId: socket.id, 
        playerId: hostId, 
        playerName: hostName
      }]
    })
    if (!game) {
      console.log("Game not created")
      return
    } else console.log("Game created")
    console.log(game)

    // connect socket to room
    socket.join(gamePin);
    
    // update lobby for users in lobby
    io.to(gamePin).emit('lobbyData', game)
  })

  socket.on('joinGame', async (data) => {
    const gamePin = data.gamePin

    // when user joins a game, add them to the game's players
    const game = games.addPlayer(gamePin, {playerSocketId: socket.id, playerId: data.playerId, playerName: data.playerName})
    if (!game) {
      console.log("Game not found")
      socket.emit('gameNotFound')
      return
    } else console.log("Game found")

    // connect socket to room
    socket.join(gamePin);

    // update lobby for users in lobby
    io.to(gamePin).emit('lobbyData', game)
  })


  // socket.on('startCountdown', (songs) => {
  //   const countdown = () => {
  //     // Send current time to connected users
  //     socket.emit('timerUpdate', timer--);

  //     // Stop timer once interval is less than 0, then start game
  //     if (timer < 0) {
  //       clearInterval(timerId)
  //       socket.emit('startGame', songs)
  //     }
  //   }

  //   let timer = 2;
  //   // Call countdown once every second
  //   timerId = setInterval(countdown, 1000);
  // })
})

module.exports = server;