const router = require('express').Router();
const jwt = require('jsonwebtoken');
const authenticate = require('../lib/passport/authenticate');
var SpotifyWebApi = require('spotify-web-api-node');

router.post('/authenticate', async (req, res) => {
  // Create api objects with credentials
  var spotifyApi = new SpotifyWebApi({
    clientId: 'a98c89e338374cecbfd3b95f1c127547',
    clientSecret: '1774058f39e94591a08836c943446fdc',
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