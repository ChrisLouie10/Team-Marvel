import { useState, useEffect } from 'react';
import * as React from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import UserNavbar from '../../lib/UserNavbar';
import { getGameHistoryByPlayerId } from '../../api/provider';
import useAuth from '../../hooks/useAuth';
import Scoreboard from '../../lib/Scoreboard';

const GameHistory = () => {
    const { data } = useAuth();
    const [history, setGameHistory] = useState([])
    const [showScoreboard, setShowScoreboard] = useState(false)
    const [topPlayers, setTopPlayers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const history = await getGameHistoryByPlayerId(data.id).then(response => response.data)
            setGameHistory(history)
        }
        fetchData()
    }, [])
    
    const handleClose = () => {
        setShowScoreboard(false);
      };  

    return (
        <div>
            <UserNavbar tab='game history'/>
            {showScoreboard &&
        <Scoreboard show={showScoreboard}
        players={topPlayers}
        isHost={false}
        handleNextQuestion={false}
        handleClose={handleClose} >
      </Scoreboard> }
            <div style={{
          /* used for centered layout */
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}> 
        { history.length > 0 ? history
        .sort((a,b) => new Date(b.date) - new Date(a.date))
        .map((game) =>
        <div>
            <p onClick={() => {setShowScoreboard(true); setTopPlayers(game.players)}}>{game.playlistName}</p> 
        </div>
        
        ): 
        <h1 style={{color: 'teal'}}>No past games found! Please Host or Join a game first.</h1>
        }
            
        </div>
        </div>
    );

}

export default GameHistory;