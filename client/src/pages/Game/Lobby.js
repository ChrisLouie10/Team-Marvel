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

  useEffect(() => {
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
  })
  
  return (
    <div>
      Lobby {state.gamePin}
      {players.map((player) => (
        player.playerId == state.host ?
          <li key={player.playerId}>This is host: {player.playerName}</li> :
          player.playerId == data.id ?
            <li key={player.playerId}>This is me: {player.playerName}</li> :
            <li key={player.playerId}>{player.playerName}</li>
      ))}
    </div>
  )
}

export default Lobby