const router = require('express').Router();
const { findAllGames, findGameById, findGamesByPlayerId } = require('../db/dao/gameDao');
const { gameToObject, gameToPlayerScore } = require('../lib/converters/gameConverter');

router.get('/', async (req, res) => {
  const games = await findAllGames()
  return res.status(200).send(games)
})

router.get('/:id', async (req, res) => {
  const game = await findGameById(req.params.id);
  if(!game) return res.status(404).json({message: 'Game not found'});
  return res.status(200).json(gameToObject(game));
})

router.get('/player/:id', async (req, res) => {
  const games = await findGamesByPlayerId(req.params.id);
  if(!games) return res.status(404).json({message: 'Games not found'});
  return res.status(200).json(games.map((game) => gameToPlayerScore(game, req.params.id)));
})

module.exports = router;