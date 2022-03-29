const router = require('express').Router();
const authenticate = require('../lib/passport/authenticate');
const { playlistValidation } = require('../lib/validation/playlistValidation');
const { createPlaylist, findPlaylistById } = require('../db/dao/playlistDao');
const modelToId = require('../lib/converters/modelToId');
const { playlistToObject } = require('../lib/converters/playlistConverter');

router.post('/', async (req, res) => {

  const { value: data, error } = playlistValidation.validate(req.body);
  if(error) return res.status(400).json({message: error.details[0].message});

  try {
    const playlist = await createPlaylist(data);
    return res.status(201).send(modelToId(playlist));
  } catch {
    return res.status(500).send({message: 'Failed to create playlist'});
  }

});

router.get('/:id', async (req, res) => {
  const playlist = await findPlaylistById(req.params.id);
  if(!playlist) return res.status(404).json({message: 'Playlist not found'});
  return res.status(200).json(playlistToObject(playlist));
})

module.exports = router;