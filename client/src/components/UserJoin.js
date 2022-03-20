import React from 'react'

import UserNavbar from './reusable/UserNavbar';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

// page where a logged in user (as player) can join a game started by a different user (host)
const UserJoin = () => {
  return (
    <>
      <UserNavbar />

      <div style={{
        /* center horizontally */
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        }}>
          <div style={{
            marginTop: '20vh', /* center vertically */
            maxWidth: '500px',
            width: '100%',
            }}>
            <p style={{fontSize: '150%'}}>Join a game in progress</p>
            <TextField
              margin="normal" variant="standard"
              required
              fullWidth
              id="gamecode"
              label="Game Code"
              name="gamecode"
              autoComplete="gamecode"
              autoFocus
              />

            <Button type="submit" fullWidth variant="contained"
              sx={{ mt: 3, mb: 3, bgcolor: '#68B1A8', "&:hover": {bgcolor: '#68B1A8'} }}>
              Play
              </Button>
        </div>
      </div>
    </>
  )
}

export default UserJoin;
