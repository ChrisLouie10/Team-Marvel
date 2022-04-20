require("dotenv").config(); 

const express = require('./servers/express');
const server = require('./servers/socketio');
const mongodb = require('./servers/mongodb');

const port = process.env.PORT || 5000;

// Express and Socketio listening on the same port
server.listen(port, () => {
  console.log(`Express and Socketio listening on port ${port}`);
})