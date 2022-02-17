const express = require("express");
const app = express();

const usersRoute = require("../routes/usersRoutes");

app.get("/", (req, res) => {
  res.send("Hello Friend!");
});

app.use('/users', usersRoute);

module.exports = app;
