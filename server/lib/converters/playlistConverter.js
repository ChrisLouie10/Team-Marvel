function playlistToObject(playlist) {
  let obj = {}
  obj.playlistName = playlist.playlistName;
  console.log(playlist);
  obj.songs = playlist.songs.map((song) => {
    const songObj = {};
    songObj.songName = song.songName;
    songObj.songUrl = song.songUrl;
    return songObj;
  });
  return obj;
}

module.exports = {
  playlistToObject
}