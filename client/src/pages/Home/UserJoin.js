import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";

import UserNavbar from '../../lib/UserNavbar';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import useAuth from '../../hooks/useAuth';
import socket from '../../components/Socket';

// page where a logged in user (as player) can join a game started by a different user (host)
const UserJoin = () => {
  const { data, setData } = useAuth();
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
    socket.emit('joinGame', {gamePin: gamePin, playerName: name || data.username, playerId: data.id})
  }

  return (
    <>
      <UserNavbar tab='join'/>

      <div style={{
        /* center horizontally */
        display: 'flex', flexDirection: 'column', alignItems: 'center'
        }}>
          <div style={{
            marginTop: '20vh', /* center vertically */
            maxWidth: '500px',
            width: '100%',
            }}>
            <p style={{fontSize: '150%'}}>Join a game in progress</p>
            <TextField
              margin="normal"
              variant="standard"
              fullWidth
              id="name"
              label="Choose a Nickname"
              value={name}
              onChange={handleNameChange}
              name="name"
              autoComplete="nickname"
              autoFocus
            />
            <TextField
              margin="normal"
              variant="standard"
              fullWidth
              id="gamecode"
              label="Game Code"
              value={gamePin}
              onChange={handlePinChange}
              name="gamecode"
              autoComplete="gamecode"
            />
            <Button 
              type="submit"
              fullWidth
              variant="contained"
              onClick={joinGame}
              sx={{
                my: 3,
                bgcolor: '#68B1A8',
                "&:hover": {bgcolor: '#68B1A8'} }}>
              Play
            </Button>
        </div>
      </div>
    </>
  )
}

export default UserJoin;
