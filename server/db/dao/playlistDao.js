const Playlist = require('../models/playlistsModel');

function createPlaylist(playlistId, playlistDescription, songs) {
  const playlist = new Playlist({playlistId, playlistDescription, songs});
  return playlist.save();
}

function findPlaylistById(playlistId) {
  return Playlist.findOne({playlistId});
}

module.exports = {
  createPlaylist,
  findPlaylistById
};