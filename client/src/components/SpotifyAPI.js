import React from 'react'
import useAuth from './useAuth.js'
import { useState, useEffect } from 'react'
import SpotifyWebApi from 'spotify-web-api-node';
import { Howl } from 'howler';
import axios from 'axios';
import Search from './Search'


const spotifyApi = new SpotifyWebApi({
  clientId: 'a98c89e338374cecbfd3b95f1c127547'
});

const SpotifyAPI = () => {
  const accessToken = useAuth()

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  const handleSubmitPlaylist= async (playlist) => {
    const playlistId = await axios
      .post(`/api/playlists`, playlist)
      .then(response => response.data)
      .catch(error => error);
    console.log(playlistId);
  }
  
  const handleSubmitShowPlaylist = async (e) => {
    const playlist = await axios
      .get(`/api/playlists/6242d6aab7a4c9497b6d259f`)
      .then(response => response.data)
      .catch(error => error);
    console.log(playlist);
    e.preventDefault();
  }
  /*
  calls Spotify's endpoint that searches for playlists based on input query
  processes search results into an array of playlist objects
  results are filtered to only have songs and playlists with non null mp3s
  */
  const searchPlaylists = (query) => {
    var processedPlaylists = []
    return spotifyApi.searchPlaylists(query)
      .then((data) => {
        // only take necessary info from playlists
        if (data.body) {
          return data.body.playlists.items.map(
            playlist => ({
              name: playlist.name,
              description: playlist.description,
              id: playlist.id,
            })
          )}
        })

      // get list of songs for every playlist and add song data to playlist object
      .then(playlistsNoSongs => {
        return playlistsNoSongs.map(playlist =>
          getPlaylistSongs(playlist.id)
          .then(songsData => ({...playlist, songs: songsData})))
      })

      // take out playlist object from Promise object
      .then(playlistsWSongs =>
        playlistsWSongs.forEach(promise =>
          promise.then(playlist => {
            if (playlist.songs.length > 0)
              processedPlaylists.push(playlist)
          })
      ))
      // .then(() => console.log(query, processedPlaylists))
      .then(() => processedPlaylists)
      .catch(err => console.log(err))
  }

  // gets list of song objects
  function getPlaylistSongs(playlistId) {
    return spotifyApi.getPlaylist(playlistId)
    .then((data) => {
      // get necessary song info
      return data.body.tracks.items.map(song => ({
          name: song.track.name,
          mp3: song.track.preview_url
      }))
    })
    .then(allSongs => allSongs.filter(songData => songData.mp3 !== null))
    // .then(console.log)
    .catch(err => console.log(err));
  }

  const handleChange = (e) => {

    // spotifyApi.getAlbumTracks('41MnTivkwTO3UUJ8DrqEJJ', { limit : 5, offset : 1 })
    //   .then((data) => {
    //     console.log(data.body);
    //   })
    //   .catch(err => console.log(err))

    // spotifyApi.searchTracks("Love on Top").then((res) => {
    //   res.body.tracks.items.map(track => {
    //     console.log(track);
    //     console.log(track.artists[0].name);
    //   })
    // })

    // Plays preview of Love On Top - Beyonce
    var sound = new Howl({
      src: ['https://p.scdn.co/mp3-preview/fa3f9a99a6fba8250b0f85669743fba3bf695c22?cid=a98c89e338374cecbfd3b95f1c127547'],
      html5: true
    });
    
    sound.play();
  }
   
  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
      {/*
      <button onClick={handleChange}>Click here for MUSIC</button>
      
      <br />
      <div>
        <button onClick={handleSubmitPlaylist}>Click to submit Music</button>
      </div>
      <div>
        <button onClick={handleSubmitShowPlaylist}>Click to submit print playlist</button>
      </div>
      */}

      <Search searchFunctions={{
        'searchPlaylists': searchPlaylists,
        'getPlaylistSongs': getPlaylistSongs,
        }}
        savePlaylist={handleSubmitPlaylist}
        />
    </div>
  )
}

export default SpotifyAPI