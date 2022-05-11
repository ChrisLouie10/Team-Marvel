import React from 'react'
import './GameMain.css'
import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

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
  const [mp3, setMp3] = useState()
  const [timer, setTimer] = useState()
  const [showScoreboard, setShowScoreboard] = useState(false)
  const [canAnswer, setCanAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [topPlayers, setTopPlayers] = useState([]);
  const navigate = useNavigate();
  const [gameOver, setGameOver] = useState(false);

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
      setTimer(timer)
    })

    socket.on('nextQuestion', (data) => {
      resetButtons()
      setGameStarted(true)
      setShowScoreboard(false)
      setRoundOver(false)
      setMp3(data.song)
      setAnswers({
        answer1: data.answers[0],
        answer2: data.answers[1],
        answer3: data.answers[2],
        answer4: data.answers[3],
      })
      setCorrectAnswer(data.answer)
      setCanAnswer(true)
    })

    socket.on('score', (score) => {
      setScore(score);
    })

    socket.on('endQuestion', (scores) => {
      setTopPlayers(scores);
      setShowScoreboard(true);
      setRoundOver(true)
    })

    socket.on('endGame', () => {
      setGameOver(true)
      setTimeout(() => {
        navigate("/user/host", { replace: true });
      }, 8000);
    })

  }, []);

  const resetButtons = () => {
    const btns = document.querySelector("[data-buttons]").querySelectorAll("[data-key]");
    btns.forEach((btn) => {
      btn.classList.remove("correct", "incorrect", "fade");
    })
  }

  const submitGuess = (guess) => {
    const btns = document.querySelector("[data-buttons]").querySelectorAll("[data-key]");
    btns.forEach((btn) => {
      const key = btn.getAttribute('data-key')
      if (key == correctAnswer) {
        btn.classList.add("correct")
      } 
      else {
        if (key == guess) btn.classList.add("incorrect")
        else btn.classList.add("fade")
      }
    })
  }

  const handleAnswer = (event, position) => {
    event.preventDefault();
    submitGuess(position);
    socket.emit('answer', {gamePin: state.gamePin, playerId: socket.id, answer: position})
    setCanAnswer(false);
  }

  const handleNextQuestion = (event) => {
    event.preventDefault();
    socket.emit('nextQuestion', state.gamePin);
  }

  const handleEndQuestion = (event) => {
    event.preventDefault();
    socket.emit('endQuestion', state.gamePin);
  }

  return (
    <div className="container">
      {showScoreboard &&
        <Scoreboard show={showScoreboard}
          players={topPlayers}
          isHost={socket.id == state.hostSocketId}
          handleNextQuestion={handleNextQuestion}
          gameOver={gameOver} >
        </Scoreboard> }
        <>
          <div className="header">
            <div className="score">Score: {score}</div>
            <div className="flex-right-align">
              <div className="username">{data.username}</div>
              {socket.id == state.hostSocketId ? <button onClick={(e) => handleEndQuestion(e)} className="button-next-question">End Question</button> : <></>}
            </div>
          </div>
          {mp3 && <SongPlayer mp3={mp3} gameOver={gameOver}/>}
          {!gameStarted ? <div className="temp-songplayer"><GameModal timer={timer} /></div>
                    : !mp3 && <div className="temp-songplayer">Waiting for other players</div>}

          <div data-buttons className="btn-container">
            <button onClick={(e) => handleAnswer(e, 0)} disabled={!canAnswer} className="btn" data-key="0">{answers.answer1}</button>
            <button onClick={(e) => handleAnswer(e, 1)} disabled={!canAnswer} className="btn" data-key="1">{answers.answer2}</button>
            <button onClick={(e) => handleAnswer(e, 2)} disabled={!canAnswer} className="btn" data-key="2">{answers.answer3}</button>
            <button onClick={(e) => handleAnswer(e, 3)} disabled={!canAnswer} className="btn" data-key="3">{answers.answer4}</button>
          </div>
        </>

    </div>
  )
}

export default GameMain