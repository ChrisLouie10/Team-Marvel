import React from 'react'
import { useState, useEffect } from 'react'

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

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

  return(
    <>
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
        <button onClick={() => {}}>{endpoint}</button>
      </div>
    </>
  );
}
export default Search
