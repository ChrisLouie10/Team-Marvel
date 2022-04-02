import { useState, useEffect, useRef } from 'react'

import SiriWave from "siriwave";
import { Howl } from 'howler';

import '../pages/Game/GameMain.css'

// will start/reset the timer, song audio, and soundwave when song parameter changes
const SongPlayer = (props) => {
  const soundplayerContainer = useRef(null); // soundwave component needs to access a DOM element
  const [soundwave, setSoundwave] = useState(null) // soundwave component from library

  const [timeLeft, setTimeLeft] = useState(null) // keeping track how many seconds remain in song
  const [decrementerId, setDecrementerId] = useState(null) // used to cancel a setTimeout function call, after it finishes decrementing timeLeft by 1 second

  const [sound, setSound] = useState(null)

  // create soundwave, set timer, set mp3
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

    // if current song gets interrupted, stop current song from playing
    if (sound) sound.unload()

    setSound(new Howl({
      src: [props.mp3],
      html5: true
      })
    )
  }, [props.mp3])

  // play whenever a new song is set
  useEffect(() => {
    if (sound) sound.play()
  }, [sound])

  // manage timer
  useEffect(() => {
    // cancel previously created setTimeout call, to prevent multiple setTimeout() running at once
    if (decrementerId)
      clearTimeout(decrementerId)

    if (timeLeft > 0) {
      // decrement count by 1
      setDecrementerId(setTimeout(() => setTimeLeft(timeLeft - 1), 1000));
    }
    else if (timeLeft === 0) {
      soundwave.stop()
    }
  }, [timeLeft])

  return (
    <div className="songplayer-container">
    
      {/* moving progress bar in background */}
      <div className="progress-bar"
        style={{width: `${103 - ((timeLeft / 30) * 100)}%`,
                backgroundColor: '#44ada2'}}>

        {/* soundwave and countdown text */}
        <div className="songplayer" ref={soundplayerContainer}>
          <p>{timeLeft}</p>
        </div>

      </div>
    </div>
  );
}

export default SongPlayer;
