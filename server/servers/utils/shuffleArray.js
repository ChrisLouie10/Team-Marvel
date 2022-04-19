/* Randomize array in-place using Durstenfeld shuffle algorithm */
function shuffleArray(songs) {
  shuffledSongs = songs.slice()
  for (var i = shuffledSongs.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = shuffledSongs[i];
      shuffledSongs[i] = shuffledSongs[j];
      shuffledSongs[j] = temp;
  }
  return shuffledSongs;
}

module.exports = shuffleArray;