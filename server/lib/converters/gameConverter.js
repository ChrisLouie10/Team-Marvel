function gameToObject(game) {
  let obj = {}
  obj.playlistName = game.playlistName;
  obj.players = game.players.map((player) => {
    const playerObj = {};
    playerObj.playerId = player.playerId;
    playerObj.playerName = player.playerName;
    playerObj.score = player.score;
    return playerObj;
  });
  obj.date = game.date
  return obj;
}

function gameToPlayerScore(game, playerId) {
  let obj = {};
  console.log(game.players)
  const player = game.players.filter((player) => player.playerId = playerId)[0];
  obj.id = game._id;
  obj.playlistName = game.playlistName;
  obj.playerName = player.playerName;
  obj.score = player.score;
  obj.date = game.date;
  return obj
}

module.exports = {
  gameToObject,
  gameToPlayerScore
}