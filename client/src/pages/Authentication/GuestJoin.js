import React from 'react'

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const GuestJoin = () => {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      mt: 8
      }}>
        <Typography variant="h5" color="inherit" sx={{mb: 2}}>
          Play Anonymously
        </Typography>
        <Typography>
          Enter room code:
        </Typography>
        <TextField>Join Room</TextField>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 3 }}
        >
          Sign Up
        </Button>
    </Box>
  )
}

export default GuestJoin;