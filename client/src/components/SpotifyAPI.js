import React from 'react'
import useAuth from './useAuth.js'
import { useState, useEffect } from 'react'
import SpotifyWebApi from 'spotify-web-api-node';
import { Howl } from 'howler';
import axios from 'axios';

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

  const handleSubmitPlaylist= async (e) => {
    const playlist = {
      playlistName: "Usher",
      songs: [
        {
          songName: "Yeah! (feat. Lil Jon & Ludacris)",
          songUrl: "https://p.scdn.co/mp3-preview/775632d9867341c779b7238f1718f9abd1773061?cid=a98c89e338374cecbfd3b95f1c127547"
        }, 
        {
          songName: "DJ Got Us Fallin' In Love (feat. Pitbull)",
          songUrl: "https://p.scdn.co/mp3-preview/59848c60516323a7d87eaf5b26d6d5188343377c?cid=a98c89e338374cecbfd3b95f1c127547"
        },
        {
          songName: "U Remind Me",
          songUrl: "https://p.scdn.co/mp3-preview/44eb354777f2ab3b28ba53cf73ce124efe038269?cid=a98c89e338374cecbfd3b95f1c127547"
        },
        {
          songName: "Without You (feat. Usher)",
          songUrl: "https://p.scdn.co/mp3-preview/cb236e230f8bf69717a4ab0356efcc9f81062146?cid=a98c89e338374cecbfd3b95f1c127547"
        },
        {
          songName: "My Boo",
          songUrl: "https://p.scdn.co/mp3-preview/7534c551af83c411c6299b5298f404e74453c375?cid=a98c89e338374cecbfd3b95f1c127547"
        },
        {
          songName: "OMG (feat. will.i.am)",
          songUrl: "https://p.scdn.co/mp3-preview/56df9e5a1b492b7454701c7e7a4438d6409c3f2a?cid=a98c89e338374cecbfd3b95f1c127547"
        },
        {
          songName: "Love in This Club (feat. Young Jeezy)",
          songUrl: "https://p.scdn.co/mp3-preview/9037730bd9051bb96363d8ecda12d7ea84936837?cid=a98c89e338374cecbfd3b95f1c127547"
        },
        {
          songName: "Promise (feat. Usher)",
          songUrl: "https://p.scdn.co/mp3-preview/4ed808367843ee8d4118af2ac034a05965cbff39?cid=a98c89e338374cecbfd3b95f1c127547"
        },
      ]
    };
    
    const playlistId = await axios
      .post(`/api/playlists`, playlist)
      .then(response => response.data)
      .catch(error => error);
    console.log(playlistId);
    e.preventDefault();
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
          promise.then(playlist => {
            if (playlist.songs.length > 0)
              processedPlaylists.push(playlist)
          })
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
    .then(allSongs => songs = allSongs.filter(songData => songData.mp3 !== null))
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
      
      <br />
      <div>
        <button onClick={handleSubmitPlaylist}>Click to submit Music</button>
      </div>
      <div>
        <button onClick={handleSubmitShowPlaylist}>Click to submit print playlist</button>
      </div>

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