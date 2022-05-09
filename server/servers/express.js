const express = require("express");
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const passport = require('passport');
const passportConfig = require('../lib/passport/config');
const cookieParser = require('cookie-parser')
const usersRoute = require("../routes/usersRoutes");
const spotifyRoute = require("../routes/spotifyRoutes");
const playlistRoute = require("../routes/playlistRoutes");
const gameRoute =require('../routes/gameRoutes');
const path = require('path');

app.use(express.static(path.resolve(__dirname, '..//build')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())
app.use(cors());
app.use(morgan('dev'));
app.use(passport.initialize());
passportConfig(passport);

app.use('/api/users', usersRoute);
app.use('/api/spotify', spotifyRoute);
app.use('/api/playlists', playlistRoute);
app.use('/api/games', gameRoute);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../build', 'index.html'));
});

module.exports = app;
