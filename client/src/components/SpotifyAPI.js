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

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

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

    // Get playlist
    // spotifyApi.getPlaylist('37i9dQZF1DZ06evO1ahqM0')
    // .then((data) => {
    //   console.log('Some information about this playlist', data.body);
    // })
    // .catch(err => console.log(err));

    // Plays preview of Love On Top - Beyonce
    var sound = new Howl({
      src: ['https://p.scdn.co/mp3-preview/fa3f9a99a6fba8250b0f85669743fba3bf695c22?cid=a98c89e338374cecbfd3b95f1c127547'],
      html5: true
    });
    
    sound.play();
  }
   
  return (
    <div>
      <button onClick={handleChange}>Click here for MUSIC</button>
    </div>
  )
}

export default SpotifyAPI