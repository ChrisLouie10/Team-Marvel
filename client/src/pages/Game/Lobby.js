import React from 'react'
import { useState, useEffect } from 'react';
import socket from '../../components/Socket'
import { useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

const PlayerLabel = styled('div')(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: 'hsla(173, 44%, 56%, 1)',
  padding: '.5rem',
}));

// todo: display playlist name on screen
// todo: create a box that lists all players in lobby
// todo: create a button that navigates players back to homepage
// todo: display username on top right
// todo: show begin button for host only

const Lobby = () => {
  const { data } = useAuth();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [players, setPlayers] = useState(state.players)
  const [playlist, setPlaylist] = useState({
    playlist: state.playlist, 
    playlistName: state.playlistName
  })

  useEffect(() => {
    socket.off()

    // update lobby if num of players changed
    socket.on('lobbyData', (data) => {
      if (data.players != players) {
        setPlayers(data.players)
      }
    })

    // end lobby if the host has disconnected
    socket.on('endGame', (data) => {
      console.log(data.message)
      navigate('/user/host', {replace: true})
    })

    // start game when host starts game
    socket.on('gameStart', (game) => {
      navigate('/game', {replace: true, state: game})
    })
  })
  
  const startGame = (e) => {
    e.preventDefault()
    socket.emit('startGame', state)
  }

  const backToHome = (e) => {
    e.preventDefault()
    socket.emit('playerLeftGame')
    navigate('/user/host', {replace: true})
  }

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        minHeight: '100vh',
        minWidth: '100vw',
        backgroundColor: 'hsla(0, 0%, 100%, 1)'
      }}>
      <Box sx={{
        display: 'flex',
        position: 'static',
        width: '100%',
      }}>
        <Box sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          position: 'relative',
          width: '100%',
          mt: '1rem',
          mr: '1rem',
        }}>
          <Button variant="outlined" onClick={backToHome} sx={{
            position: 'relative',
            backgroundColor: 'hsla(0, 0%, 13%, 1)',
            color: 'hsla(0, 0%, 100%, 1)',
            '&:hover': {
              backgroundColor: 'hsla(0, 0%, 13%, .75)',
              borderColor: 'hsla(0, 0%, 13%, .75)',
              boxShadow: 'none',
            },
            }}>
              Back to Home
          </Button>
        </Box>
      </Box>
      <Box sx={{
        position: 'relative',
        width: '70%',
        minHeight: '60vh',
        mt: '5rem',
      }}>
        <Typography variant="h2" sx={{ fontWeight: '900', mb: '1rem', }}>Playlist: {playlist.playlistName}</Typography>
        <Typography variant="h5">Lobby: {state.gamePin}</Typography>
        <Grid
          sx={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '2rem 3rem',
            padding: '2.5rem',
          }}>
          {players.map((player) => (
            // if you're the player and the host
            player.playerSocketId == state.hostSocketId && player.playerId == data.id ?
              <PlayerLabel key={player.playerId} sx={{ backgroundColor: 'hsla(57, 96%, 45%, 1)' }}>
                HOST {player.playerName}</PlayerLabel>  :
            // if you're the player and not the host
            player.playerId == data.playerId ?
              <PlayerLabel key={player.playerId} sx={{ backgroundColor: 'hsla(57, 96%, 45%, 1)' }}>
                {player.playerName}
              </PlayerLabel> :
            // if you're not the player and not the host
            player.playerSocketId == state.hostSocketId ?
              <PlayerLabel key={player.playerId}>HOST {player.playerName}</PlayerLabel> :
              <PlayerLabel key={player.playerId}>{player.playerName}</PlayerLabel>
          ))}
        </Grid>
      </Box>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        mb: '4rem',
        width: '100%',
      }}>
        {socket.id == state.hostSocketId 
          && 
        <Button 
          variant="outlined" 
          onClick={startGame}
          sx={{
            py: '1rem',
            borderRadius: '50px',
            backgroundColor: 'hsla(0, 0%, 13%, 1)',
            color: 'hsla(0, 0%, 100%, 1)',
            '&:hover': {
              backgroundColor: 'hsla(0, 0%, 13%, .75)',
              borderColor: 'hsla(0, 0%, 13%, .75)',
              boxShadow: 'none',
            },
            width: '15rem',
          }}>
            Begin
        </Button>}
      </Box>
    </Box>
  )
}

export default Lobby