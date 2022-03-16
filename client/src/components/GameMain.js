import React from 'react'
import './GameMain.css'

const GameMain = () => {
  return (
    <div className="container">
      <div className="header">
        <div className="score">Score: Example</div>
        <div className="timer"> 
          <div>Timer element</div>
        </div>
        <div className="username">Username</div>
      </div>
      <div className="songplayer">
        songplayer
      </div>
      <div className="btn-container">
        <button className="btn" data-key="1">Song #1 Default Btn</button>
        <button className="btn incorrect" data-key="2">Song #2 Incorrect Btn</button>
        <button className="btn correct" data-key="3">Song #3 Correct Btn</button>
        <button className="btn fade" data-key="4">Song #4 Faded Btn</button>
      </div>
    </div>
  )
}

export default GameMain