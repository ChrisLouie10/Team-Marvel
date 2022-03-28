
const app = require('./express');
const { customAlphabet } = require('nanoid')
const nanoid = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', 10)
const { createGame, findGameByPin } = require('../db/dao/liveGameDao');

// socketio
const server = require('http').createServer(app);
const io = require('socket.io')(server);

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log("a user disconnected");
  })
  
  socket.on('createGame', (playlistId) => {
    // create game PIN
    const gamePin = nanoid();

    // create a live game in the database
    const game = createGame(gamePin);
    socket.join(gamePin);

    // Testing to see if "rooms" are created
    io.to(gamePin).emit('probe');
  })

  socket.on('startCountdown', (songs) => {
    const countdown = () => {
      timer--;
      // Send current time to connected users
      socket.emit('timerUpdate', timer);

      // Stop timer once interval is less than 0, then start game
      if (timer < 0) {
        clearInterval(timerId)
        socket.emit('startGame', songs)
      }
    }

    let timer = 3;
    // Call countdown once every second
    timerId = setInterval(countdown, 1000);
  })
})

module.exports = server;