import { useState, useEffect } from 'react';
import * as React from 'react';

import UserNavbar from './reusable/UserNavbar';
import PlaylistCard from './reusable/PlaylistCard';

import Masonry, {ResponsiveMasonry} from 'react-responsive-masonry'

// dashboard for host to manage playlists
const HostDashboard = () => {
  // list of playlist objects
  const [playlists, setPlaylists] = useState([{name: 'Calm Songs'}, {name: 'Happy Songs'}, {name: 'Engergetic Songs'}]);

  return (
    <div>
        <UserNavbar />

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
                <Masonry gutter='50'>
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
