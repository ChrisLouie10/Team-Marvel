import React from 'react'
import { useState, useEffect } from 'react';

const GameModal = (props) => {
  const [timer, setTimer] = useState(0)

  useEffect(() => {
    setTimer(props.timer)
  }, [props.timer])

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="modalTitle">Next question starting in...</div>
        <div className="modalTimer">{timer}</div>
      </div>
    </div>
  )
}

export default GameModal