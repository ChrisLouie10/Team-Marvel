import React from 'react'
import './GameMain.css'
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';

import { Howl } from 'howler'
import socket from '../../components/Socket'
import SongPlayer from '../../lib/SongPlayer'
import GameModal from './GameModal'
import useAuth from '../../hooks/useAuth';

import Scoreboard from '../../lib/Scoreboard';

const GameMain = () => {
  const { data } = useAuth();
  const { state } = useLocation();
  const [answers, setAnswers] = useState({})
  const [correctAnswer, setCorrectAnswer] = useState()
  const [question, setQuestion] = useState()
  const [mp3, setMp3] = useState()
  const [openModal, setOpenModal] = useState(false)
  const [timer, setTimer] = useState()
  const [showScoreboard, setShowScoreboard] = useState(false)
  var howl = null

  // when question changes, load in answers & song
  useEffect(() => {
    socket.off()

    // send message to server that we connected to game state
    socket.emit('connected', state)

    socket.on('connected', () => {
      // only the host emits the next question message
      if (socket.id == state.hostSocketId) {
        socket.emit('nextQuestion', socket.id)
      }
    })

    socket.on('countdown', (timer) => {
      // open modal when timer comes in
      setOpenModal(true)

      console.log('setting timer')
      setTimer(timer)
    })

    socket.on('nextQuestion', (data) => {
      setOpenModal(false)
      //setShowScoreboard(true)
      setMp3(data.song)
      console.log("next question!")
    })
    // For when sockets brings us some data
    // socket.on('nextQuestion', function(data){
    //   setAnswers({
    //     answer1: data.answer1,
    //     answer2: data.answer2,
    //     answer3: data.answer3,
    //     answer4: data.answer4,
    //   })
    //   correctAnswer = data.correct;
    //   howl = new Howl({
    //     src: [data.mp3],
    //     html5: true
    //   })
    // });

  }, []);

  // For now, we manually set data, but when sockets are implemented, it will tell us when to update the data and send in data
  const handleClick = () => {
    //  // trying out Songplayer
    // let song1 = 'https://p.scdn.co/mp3-preview/bbf2bbe22f9f4d9685e413002eb404355a93c8bc?cid=774b29d4f13844c495f206cafdad9c86'
    // let song2 = 'https://p.scdn.co/mp3-preview/f9c63ee9428c3d719dbf1b5a1e294f5e6bf0def1?cid=a98c89e338374cecbfd3b95f1c127547'
    // if (song1 === mp3) setMp3(song2);
    // else setMp3(song1);

    // setQuestion(1)
    // setAnswers({
    //   answer1: 'Love On Top',
    //   answer2: 'Halo',
    //   answer3: 'End of time',
    //   answer4: 'Partition',
    // })

    // // Emit messages to socket with click
    // let playlistId = 12345;
    // socket.emit('createGame', playlistId);
    // socket.emit('startCountdown', {songs: ['https://p.scdn.co/mp3-preview/fa3f9a99a6fba8250b0f85669743fba3bf695c22?cid=a98c89e338374cecbfd3b95f1c127547']});
  }

  return (
    <div className="container">
      {showScoreboard ? <Scoreboard></Scoreboard> :
        <><div className="header">
        <div className="score">Score: Example</div>
        <div className="username">{data.username}</div>
        </div>
      {mp3 && <SongPlayer mp3={mp3}/>}
      {openModal ? <div className="temp-songplayer"><GameModal timer={timer} /></div> 
                 : !mp3 && <div className="temp-songplayer">Waiting for other players</div>} 
                 
      <div className="btn-container">
        <button onClick={handleClick} className="btn" data-key="1">{answers.answer1}</button>
        <button className="btn incorrect" data-key="2">{answers.answer2}</button>
        <button className="btn correct" data-key="3">{answers.answer3}</button>
        <button className="btn fade" data-key="4">{answers.answer4}</button>
      </div> </>
      }
      
    </div>
  )
}

export default GameMain