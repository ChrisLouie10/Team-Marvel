import React from 'react'
import { useState, useEffect } from 'react'

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import SpotifyPlaylistCard from '../lib/SpotifyPlaylistCard'
import SongPlayer from '../lib/SongPlayer'
import PlaylistSkeleton from '../lib/PlaylistSkeleton'

import Masonry, {ResponsiveMasonry} from 'react-responsive-masonry'

const Search = (props) => {
  const [searchFunctions, setSearchFunctions] = useState({
    'searchPlaylists': {
      function: props.searchFunctions['searchPlaylists'],
      input: {
        label: 'playlistQuery',
        value: 'instrumental'
      }
    },
    'getPlaylistSongs': {
      function: props.searchFunctions['getPlaylistSongs'],
      input: {
        label: 'playlistId',
        value: '37i9dQZF1DZ06evO1ahqM0'
      }
    },
  })

  const [endpoint, setEndpoint] = useState('searchPlaylists') // name of api function
  const [endpointParam, setEndpointParam] = useState('') // param value needed in api call

  const changeEndpoint = (event) => {
    let functionName = event.target.value
    setEndpoint(functionName)
    setEndpointParam(searchFunctions[functionName].input.value)
  };

  const [loadingData, setLoadingData] = useState(false)
  const [searchResults, setSearchResults] = useState([]) // either array of playlist objects or song objects

  const searchSpotify = (event) => {
    if (endpointParam == '') return;

    setLoadingData(true)
    searchFunctions[endpoint].function(endpointParam)
      .then(data =>
        /*
          there was a bug where search results weren't being displayed, even after data was received and set
          out of several bug fix attempts (including additional useStates & useEffects), only setTimeout() hadn't failed so far
        */
        setTimeout(() => setSearchResults(data), 1000)
      )
  }

  useEffect(() => {
    setLoadingData(false)
  }, [searchResults])

  // song object for current song being played
  const [song, setSong] = useState({
    mp3: '',
    retire: () => {} // function can be accessed to update current song's display when it's not playing anymore (occurs upon a new song change)
  })

  // called when user clicks on a song's play button
  const playMp3 = async (newSong) => {
    if (song.mp3 === newSong.mp3) return; // songplayer can't play same song twice in a row

    await song.retire() // removes highlight on current song's display text
    setSong(newSong)
  }

  const savePlaylist = (playlist) => {
    props.savePlaylist({
      playlistName: playlist.name,
      songs: playlist.songs.map(song => ({songName: song.name, songUrl: song.mp3}))
    })
  }

  return(
    <>
      {/* hide songplayer, because it's not showing up anyway due to a bug
        it'll still play music, but it can't be seen */}
      <div style={{visibility:'hidden'}}>
        <SongPlayer mp3={song.mp3}/>
      </div>

      <div>
        {/* choose endpoint */}
        <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel>Search for</InputLabel>
          <Select
            value={endpoint}
            onChange={changeEndpoint}>
            <MenuItem value={'searchPlaylists'}>Playlists</MenuItem>
            <MenuItem value={'getPlaylistSongs'}>A Playlist's Songs</MenuItem>
          </Select>
        </FormControl>

        {/* input endpoint param */}
        <label>{searchFunctions[endpoint].input.label}: </label>
        <input type='text'
          value={endpointParam}
          onChange={e => {
            let inputValue = e.target.value
            setEndpointParam(inputValue)
            searchFunctions[endpoint].input.value = inputValue
          }}></input>

        {/* call api */}
        <button onClick={searchSpotify}>{endpoint}</button>
      </div>

      {loadingData ?

        <div style={{display: 'flex', justifyContent: 'space-around', alignItems: 'flex-start', width: '80%'}}>
          <PlaylistSkeleton expanded={true}/>
          <PlaylistSkeleton expanded={false}/>
          <PlaylistSkeleton expanded={false}/>
        </div>

        :<>
          { /* display of loaded data */

            /* playlist search results */
            searchResults && searchResults.length > 0 && searchResults[0].songs ?
            <ResponsiveMasonry style={{
                maxWidth: '1200px',
                width: '100%',
                marginLeft: '70px', marginRight: '50px',
                }}>
                <Masonry>
                  {searchResults.map(playlist =>
                     <SpotifyPlaylistCard
                        key={playlist.id}
                        playlist={playlist}
                        playMp3={playMp3}
                        savePlaylist={savePlaylist}
                        />
                      )}
                </Masonry>
            </ResponsiveMasonry>

            : /* song search results */
            <>
              {searchResults.map(song => <p>{song.name}</p>)}
            </>
          }
        </> }
    </>
  );
}
export default Search
