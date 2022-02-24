const express = require("express");
const app = express();
const cors = require('cors');

const usersRoute = require("../routes/usersRoutes");

app.use(cors());

app.use('/api/users', usersRoute);

module.exports = app;
