import { useState, useEffect } from 'react';
import * as React from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import UserNavbar from '../../lib/UserNavbar';
import { getGameHistoryByPlayerId } from '../../api/provider';
import useAuth from '../../hooks/useAuth';

const GameHistory = () => {
    const { data } = useAuth();
    const navigate = useNavigate();
    const [history, setGameHistory] = useState([])
    //const data = props.data

    useEffect(() => {
        const fetchData = async () => {
            const history = await getGameHistoryByPlayerId(data.id).then(response => response.data)
            setGameHistory(history)
        }
        fetchData()
    }, [])
    

    return (
        <div>
            <UserNavbar tab='game history'/>
            <div style={{
          /* used for centered layout */
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}> 
        { history.length > 0 ? <h1>Not Empty</h1> : 
        <h1 style={{color: 'teal'}}>No past games found! Please Host or Join a game first.</h1>
        }
            
        </div>
        </div>
    );

}

export default GameHistory;