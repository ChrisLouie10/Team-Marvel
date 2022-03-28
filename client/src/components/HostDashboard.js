import { useState, useEffect } from 'react';
import * as React from 'react';
import { useNavigate, useLocation } from "react-router-dom";

import UserNavbar from './reusable/UserNavbar';
import PlaylistCard from './reusable/PlaylistCard';
import AddPlaylistDialog from './inputs/AddPlaylistDialog';

import Masonry, {ResponsiveMasonry} from 'react-responsive-masonry'

import useAuth from '../hooks/useAuth';
import socket from './Socket';

// dashboard for host to manage playlists
const HostDashboard = () => {
  const { data } = useAuth();
  const navigate = useNavigate();
  console.log(data)
  // list of playlist objects
  const [playlists, setPlaylists] = useState([{name: 'Calm Songs'}, {name: 'Happy Songs'}, {name: 'Engergetic Songs'}])

  const createGame = () => {
    // request server to create game
    socket.emit('createGame', {hostName: data.username, hostId: data.id})

    // listen for lobby information once created
    socket.on('lobbyData', (data) => {
      navigate('/lobby', {replace: true, state: data})
    })
  }
  
  const joinGame = () => {
    // manually created game pin for now ( this is same on server )
    const gamePin = "kLJDAmIEBM"

    // request server to join game
    socket.emit('joinGame', {gamePin: gamePin, playerName: data.username, playerId: data.id})

    // listen for lobby information once created
    socket.on('lobbyData', (data) => {
      navigate('/lobby', {replace: true, state: data})
    })
  }

  return (
    <div>
        <UserNavbar tab='host'/>

        <div style={{
          /* used for centered layout */
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <button onClick={createGame}>Create Game</button>
          <button onClick={joinGame}>Join Game</button>
            {/* list of host's playlists */}
            <ResponsiveMasonry style={{
                maxWidth: '1200px',
                width: '100%',
                marginLeft: '70px', marginRight: '50px',
                }}>
                <Masonry>
                    {playlists.map((playlist) =>
                        <PlaylistCard name={playlist.name ? playlist.name : ''}/>
                        )}
                </Masonry>
            </ResponsiveMasonry>
        </div>
    </div>
  );
}

export default HostDashboard;
