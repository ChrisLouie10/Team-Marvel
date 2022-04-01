const mongoose = require('mongoose');
const Playlist = require('../models/playlistModel');

function createPlaylist(playlist) {
  const newPlaylist = new Playlist(playlist);
  return newPlaylist.save();
}

function findPlaylistById(id) {
  if(!mongoose.isValidObjectId(id)) return null;
  return Playlist.findOne({_id: id});
}

module.exports = {
  createPlaylist,
  findPlaylistById
};
