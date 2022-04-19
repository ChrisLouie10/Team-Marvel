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
  const [canAnswer, setCanAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [topPlayers, setTopPlayers] = useState([]);
  var howl = null

  // when question changes, load in answers & song
  useEffect(() => {
    socket.off()

    // send message to server that we connected to game state
    socket.emit('connected', state)

    socket.on('connected', () => {
      // only the host emits the next question message
      if (socket.id == state.hostSocketId) {
        socket.emit('nextQuestion', state.gamePin)
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
      setShowScoreboard(false)
      setMp3(data.song)
      setAnswers({
        answer1: data.answers[0],
        answer2: data.answers[1],
        answer3: data.answers[2],
        answer4: data.answers[3],
      })
      setCanAnswer(true)
    })

    socket.on('score', (score) => {
      setScore(score);
    })

    socket.on('endQuestion', (scores) => {
      setTopPlayers(scores);
      setShowScoreboard(true);
    })

  }, []);

  // For now, we manually set data, but when sockets are implemented, it will tell us when to update the data and send in data
  const handleAnswer = (event, position) => {
    socket.emit('answer', { gamePin: state.gamePin, playerId: socket.id, answer: position})
    setCanAnswer(false);
    event.preventDefault();
  }

  const handleNextQuestion = (event) => {
    socket.emit('nextQuestion', state.gamePin);
    console.log('working')
    event.preventDefault();
  }

  const handleEndQuestion = (event) => {
    socket.emit('endQuestion', state.gamePin);
    event.preventDefault();
  }

  return (
    <div className="container">
      {showScoreboard ? 
        <Scoreboard 
          players={topPlayers} 
          isHost={socket.id == state.hostSocketId} 
          handleNextQuestion={handleNextQuestion} >
        </Scoreboard> : 
        <>
          <div className="header">
            <div className="score">Score: {score}</div>
            <div className="flex-right-align">
              <div className="username">{data.username}</div>
              {socket.id == state.hostSocketId ? <button onClick={(e) => handleEndQuestion(e)} className="button-next-question">End Question</button> : <></>}
            </div>
          </div>
          {mp3 && <SongPlayer mp3={mp3}/>}
          {openModal ? <div className="temp-songplayer"><GameModal timer={timer} /></div> 
                    : !mp3 && <div className="temp-songplayer">Waiting for other players</div>} 
                    
          <div className="btn-container">
            <button onClick={(e) => handleAnswer(e, 0)} disabled={!canAnswer} className="btn" data-key="1">{answers.answer1}</button>
            <button onClick={(e) => handleAnswer(e, 1)} disabled={!canAnswer} className="btn incorrect" data-key="2">{answers.answer2}</button>
            <button onClick={(e) => handleAnswer(e, 2)} disabled={!canAnswer} className="btn correct" data-key="3">{answers.answer3}</button>
            <button onClick={(e) => handleAnswer(e, 3)} disabled={!canAnswer} className="btn fade" data-key="4">{answers.answer4}</button>
          </div> 
        </>
      }
    </div>
  )
}

export default GameMain