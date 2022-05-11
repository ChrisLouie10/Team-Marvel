import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

import useAuth from '../../hooks/useAuth';
import socket from '../../components/Socket';

const GuestJoin = () => {
  const { setAuth, setData } = useAuth();
  const navigate = useNavigate();
  const [gamePin, setGamePin] = useState('')
  const [name, setName] = useState('')

  useEffect(() => {
    socket.off() // removes current listeners

    // listen for if game does not exist
    socket.on('gameNotFound', () => {
      console.log("Game not found")
    })

    // listen for lobby information once created
    socket.on('lobbyData', (data) => {

      // set user and auth context (as a guest)
      setData({playerName: name, playerId: "guest" + name});
      setAuth(['guest']);

      navigate('/lobby', {replace: true, state: data})
    })
  })

  const handleNameChange = (e) => {
    setName(e.target.value)
  }

  const handlePinChange = (e) => {
    setGamePin(e.target.value)
  }

  const joinGame = () => {
    // request server to join game
    socket.emit('joinGame', {gamePin: gamePin, playerName: name, playerId: "guest" + name})
  }

  return (
    <Container maxWidth="xs">
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      }}>
      <Box>
        <Typography variant="h5" color="inherit" sx={{mb: 2}}>
          Play Anonymously
        </Typography>
        <TextField
          margin="normal"
          fullWidth
          id="name"
          label="Choose a Nickname"
          value={name}
          onChange={handleNameChange}
          name="name"
          autoComplete="nickname"
          autoFocus
          required
        />
        <TextField
          margin="normal"
          fullWidth
          id="gamecode"
          label="Game Code"
          value={gamePin}
          onChange={handlePinChange}
          name="gamecode"
          autoComplete="gamecode"
          required
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          onClick={joinGame}
          sx={{ mt: 3, mb: 3 }}
        >
          Join Game
        </Button>
      </Box>
    </Box>
    </Container>
  )
}

export default GuestJoin;