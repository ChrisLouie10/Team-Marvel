import React from 'react'
import { useState, useEffect } from 'react';
import socket from '../../components/Socket'
import { useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const Lobby = () => {
  const { data } = useAuth();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [players, setPlayers] = useState(state.players)

  console.log(data)
  console.log(state)
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
  
  const handleClick = (e) => {
    e.preventDefault()
    socket.emit('startGame', state)
  }

  return (
    <div>
      Lobby {state.gamePin}
      {players.map((player) => (
        player.playerSocketId == state.hostSocketId ?
          <li key={player.playerId}>This is host: {player.playerName}</li> :
          player.playerId == data.id ?
            <li key={player.playerId}>This is me: {player.playerName}</li> :
            <li key={player.playerId}>{player.playerName}</li>
      ))}
      {socket.id == state.hostSocketId && <button onClick={handleClick}>Start Game</button>}
    </div>
  )
}

export default Lobby