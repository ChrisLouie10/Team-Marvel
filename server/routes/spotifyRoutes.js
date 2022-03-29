const router = require('express').Router();
const jwt = require('jsonwebtoken');
const authenticate = require('../lib/passport/authenticate');
var SpotifyWebApi = require('spotify-web-api-node');

const clientSecret = process.env.CLIENT_SECRET || '';

router.post('/authenticate', async (req, res) => {
  // Create api objects with credentials
  var spotifyApi = new SpotifyWebApi({
    clientId: 'a98c89e338374cecbfd3b95f1c127547',
    clientSecret: clientSecret,
  });

  spotifyApi
    .clientCredentialsGrant()
    .then(data => {
      // Save token
      spotifyApi.setAccessToken(data.body.access_token);
      res.json({
        accessToken: data.body.access_token,
        expiresIn: data.body.expires_in,
      });
    })
    .catch(err => {
      return res.status(500).send({message: 'Failed to create access token'});
    });
})

module.exports = router;