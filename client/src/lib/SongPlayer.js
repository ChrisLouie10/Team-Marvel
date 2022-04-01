import { useState, useEffect, useRef } from 'react'

import SiriWave from "siriwave";

const SongPlayer = (props) => {
  const soundplayerContainer = useRef(null); // soundwave component needs to access a DOM element
  const [soundwave, setSoundwave] = useState(null) // soundwave component from library

  const [timeLeft, setTimeLeft] = useState(null)

  // create soundwave
  useEffect(() => {
    setTimeLeft(30)

    // prevent duplicate soundwaves that may be created due to using refs
    if (soundwave) soundwave.dispose()

    setSoundwave(new SiriWave({
      container: soundplayerContainer.current,
      width: soundplayerContainer.current.offsetWidth,
      height: 220,
      style: 'ios9',
      speed: .06,
      amplitude: 2,
      frequency: 2,
      curveDefinition: [
        { color: "255, 255, 255", supportLine: true },
        { color: "185, 240, 233" },
        { color: "125, 255, 239" },
        { color: "0, 237, 208" },
        ],
      })
    )
  }, [props.mp3])

  // manage timer
  useEffect(() => {
    if (timeLeft > 0) {
      setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    }
    else if (timeLeft === 0) {
      soundwave.stop()
    }
  }, [timeLeft])

  return (
    <div style={{width: '80%', height: '100%'}} ref={soundplayerContainer}>
      <p>{timeLeft}</p>
    </div>
  );
}

export default SongPlayer;
