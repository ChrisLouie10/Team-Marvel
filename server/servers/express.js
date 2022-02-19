const express = require("express");
const app = express();

const usersRoute = require("../routes/usersRoutes");

app.get("/", (req, res) => {
  res.json({text: "Hello Friend!"});
});

app.use('/api/users', usersRoute);

module.exports = app;
