import { fireEvent, render, screen, waitFor} from '@testing-library/react'
import React from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import '@testing-library/jest-dom'
import { act } from 'react-dom/test-utils';

import HostDashboard from './HostDashboard'

var playlistsTestData = [
  {_id: 1, playlistName: 'playlist1', songs: [{songName: 'song1'}, {songName: 'song11'}]},
  {_id: 2, playlistName: 'playlist2', songs: []},
  {_id: 3, playlistName: 'playlist3', songs: []},
]

// mock api
const provider = require('../../api/provider');
jest.mock('../../api/provider');
beforeEach(() => {
  provider.getPlaylists.mockResolvedValue({
    data: playlistsTestData
  });
})

describe('<HostDashboard/>', () => {
  beforeEach(() => {
    render(
      <Router>
        <HostDashboard/>
      </Router>
    );
  })

  it("can see dashboard elements", async () => {
      let titleElement = screen.getByText(/hearo/i);
      expect(titleElement).toBeInTheDocument()

      let joinBtn = screen.getByRole('button', { name: /join/i });
      expect(joinBtn).toBeInTheDocument()

      let logoutBtn = screen.getByRole('button', { name: /logout/i });
      expect(logoutBtn).toBeInTheDocument()
  })

  it("can see playlists on dashboard", async () => {
    await waitFor(() => {
      // screen.debug() // prints out DOM

      // goes through each playlist and checks if its data is displayed
      playlistsTestData.forEach(playlist => {
        let titleElement = screen.getByText(playlist.playlistName);
        expect(titleElement).toBeInTheDocument()
      })
    });
  })

  it("can see songs after clicking on a playlist card", async () => {
    let playlist = playlistsTestData[0]

    // test after dashboard finished rendering and getting playlist data from api
    await waitFor(() => {
      let playlistNameElement = screen.getByText(playlist.playlistName);

      const canSeeSongs = () => {
        playlist.songs.forEach(song => {
          let songNameElement = screen.getByText(song.songName);
          expect(songNameElement).toBeInTheDocument()
        })
      }

      // before card was clicked on, songs shouldn't be visible
      expect(canSeeSongs).toThrow()

      fireEvent.click(playlistNameElement);

      // checks if list of songs are visible after card was clicked on
      canSeeSongs()
    });
  })
})
