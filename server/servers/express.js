const express = require("express");
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const passport = require('passport');
const passportConfig = require('../lib/passport/config');
const cookieParser = require('cookie-parser')
const usersRoute = require("../routes/usersRoutes");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())
app.use(cors());
app.use(morgan('dev'));
app.use(passport.initialize());
passportConfig(passport);

app.use('/api/users', usersRoute);

module.exports = app;
