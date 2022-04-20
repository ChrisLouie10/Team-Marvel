import { useState, useEffect } from 'react';
import * as React from 'react';
import { useNavigate, useLocation } from "react-router-dom";

import UserNavbar from '../../lib/UserNavbar';
import PlaylistCard from '../../lib/PlaylistCard';
import Masonry, {ResponsiveMasonry} from 'react-responsive-masonry'

import useAuth from '../../hooks/useAuth';
import socket from '../../components/Socket';
import { getPlaylists } from '../../api/provider';

// dashboard for host to manage playlists
const HostDashboard = () => {
  const { data } = useAuth();
  const navigate = useNavigate();
  const [playlists, setPlaylists] = useState([])
  
  useEffect(async () => {
    socket.off()  // removes current listeners

    const playlists = await getPlaylists().then(response => response.data)
    setPlaylists(playlists)

    // listen for lobby information once created
    socket.on('lobbyData', (data) => {
      navigate('/lobby', {replace: true, state: data})
    })
  }, [])

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
            {/* list of host's playlists */}
            <ResponsiveMasonry style={{
                maxWidth: '1200px',
                width: '100%',
                marginLeft: '70px', marginRight: '50px',
                }}>
                <Masonry>
                    {playlists.map((playlist) =>
                        <PlaylistCard 
                          key={playlist._id} 
                          data={data} 
                          id={playlist._id} 
                          name={playlist.playlistName} 
                          songs={playlist.songs}/>
                        )}
                </Masonry>
            </ResponsiveMasonry>
        </div>
    </div>
  );
}

export default HostDashboard;
