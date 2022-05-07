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

module.exports = {
  gameToObject
}