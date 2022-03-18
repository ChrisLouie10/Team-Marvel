import { useState, useEffect } from 'react';
import * as React from 'react';

import UserNavbar from './reusable/UserNavbar';
import PlaylistCard from './reusable/PlaylistCard';
import AddPlaylistDialog from './inputs/AddPlaylistDialog';

import Masonry, {ResponsiveMasonry} from 'react-responsive-masonry'

// dashboard for host to manage playlists
const HostDashboard = () => {
  // list of playlist objects
  const [playlists, setPlaylists] = useState([{name: 'Calm Songs'}, {name: 'Happy Songs'}, {name: 'Engergetic Songs'}]);

  function createPlaylist(newPlaylist) {
      // add to displayed list of playlists
      var newPlaylists = [...playlists] // copy
      newPlaylists.push(newPlaylist);
      setPlaylists(newPlaylists);
  }

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
                <Masonry>
                    {playlists.map((playlist) =>
                        <PlaylistCard name={playlist.name ? playlist.name : ''}/>
                        )}
                </Masonry>
            </ResponsiveMasonry>

            {/* button & popup to add a new playlist */}
            <AddPlaylistDialog
                submitFunction={createPlaylist} // will run function to add playlist after host submits data through popup
                />
        </div>
    </div>
  );
}

export default HostDashboard;
