import React from 'react'
import useAuth from './useAuth.js'
import { useState, useEffect } from 'react'
import SpotifyWebApi from 'spotify-web-api-node';
import { Howl } from 'howler';

const spotifyApi = new SpotifyWebApi({
  clientId: 'a98c89e338374cecbfd3b95f1c127547'
});

const SpotifyAPI = () => {
  const accessToken = useAuth()

  const [playlistQuery, setPlaylistQuery] = useState('instrumental')
  const [playlistId, setPlaylistId] = useState('37i9dQZF1DZ06evO1ahqM0')

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  /*
  calls Spotify's endpoint that searches for playlists based on input query
  processes search results into an array of playlist objects
  */
  function searchPlaylists() {
    var processedPlaylists = []
    spotifyApi.searchPlaylists(playlistQuery)
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
          promise.then(playlist => processedPlaylists.push(playlist))
      ))
      .then(() => console.log(playlistQuery, processedPlaylists))
      .catch(err => console.log(err))
  }

  // gets list of song objects
  async function getPlaylistSongs(playlistId) {
    var songs = []
    await spotifyApi.getPlaylist(playlistId)
    .then((data) => {
      // get necessary song info
      return data.body.tracks.items.map(song => ({
          name: song.track.name,
          mp3: song.track.preview_url
      }))
    })
    .then(allSongs => songs = allSongs)
    // .then(console.log)
    .catch(err => console.log(err));
    return songs
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
      <button onClick={handleChange}>Click here for MUSIC</button>

      <br></br>
      <div>
        <label>playlistQuery: </label>
        <input type='text' value={playlistQuery} onChange={e => setPlaylistQuery(e.target.value)}></input>
      </div>
      <button onClick={searchPlaylists}>searchPlaylists</button>

      <br></br>
      <div>
        <label>playlistId: </label>
        <input type='text' value={playlistId} onChange={e => setPlaylistId(e.target.value)}></input>
      </div>
      <button onClick={e => getPlaylistSongs(playlistId).then(console.log)}>getPlaylistSongs</button>
    </div>
  )
}

export default SpotifyAPI