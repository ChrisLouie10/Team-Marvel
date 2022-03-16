require("dotenv").config(); 

const express = require('./servers/express');
const mongodb = require('./servers/mongodb');

const port = process.env.PORT || 5000;

express.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});