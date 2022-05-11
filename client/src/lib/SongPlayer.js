import { useState, useEffect, useRef, useLayoutEffect } from 'react'

import SiriWave from "siriwave";
import { Howl, Howler } from 'howler';

import './SongPlayer.css'

// will start/reset the timer, song audio, and soundwave when song parameter changes
const SongPlayer = (props) => {
  const soundwaveContainer = useRef(null); // soundwave component needs to access a DOM element
  const [soundwave, setSoundwave] = useState(null) // soundwave component from library

  const [timeLeft, setTimeLeft] = useState(null) // keeping track how many seconds remain in song
  const [decrementerId, setDecrementerId] = useState(null) // used to cancel a setTimeout function call, after it finishes decrementing timeLeft by 1 second

  const [sound, setSound] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)

  function stopPreviousSong() {
    // to restart progress bar if it's still running
    if (isPlaying) setIsPlaying(false)

    // prevent duplicate soundwaves that may be created due to using refs
    if (soundwave) soundwave.dispose()

    // if current song gets interrupted, stop current song from playing
    if (sound) sound.unload()
  }

  useLayoutEffect(() => {
    /* rendering will occur in between useLayoutEffect and useEffect
      states will be reset and UI will display reset states before states change for new song */
    stopPreviousSong() // prevent starting up new song until after previous song's states are reset
  }, [props.mp3, props.roundOver])

  // create soundwave, set timer, set mp3
  useEffect(() => {
    (async () => {
      await stopPreviousSong()            // prevent starting up new song until after previous song's states are reset
      if (props.gameOver) return          // if game is over, exit function early

      // start new song
      setTimeLeft(30)
      setSoundwave(new SiriWave({
        container: soundwaveContainer.current.offsetParent,
        width: soundwaveContainer.current.offsetWidth,
        height: soundwaveContainer.current.offsetParent.offsetHeight,
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
      setSound(new Howl({
        src: [props.mp3],
        html5: true,
        volume: 0.1,
        })
      )
    })();
  }, [props.mp3, props.gameOver])

  // play whenever a new song is set
  useEffect(() => {
    if (sound) sound.play()
    Howler.volume(.5)
    setIsPlaying(true)
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
      <p className="timeLeft">{timeLeft}</p>
      {/* moving progress bar in background */}
      <div data-progress-bar className={`progress-bar ${isPlaying ? 'animate-width' : ''}`}
        style={{ width: `${isPlaying ? '100%' : '0'}`,
                 backgroundColor: '#44ada2'}}>
        {/* soundwave and countdown text */}
        <div className="songplayer" ref={soundwaveContainer}></div>
      </div>
    </div>
  );
}

export default SongPlayer;
