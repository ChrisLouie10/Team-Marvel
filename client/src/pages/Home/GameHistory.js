import { useState, useEffect } from 'react';
import * as React from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import UserNavbar from '../../lib/UserNavbar';

const GameHistory = () => {
    const { data } = useAuth();
    const navigate = useNavigate();
    const [history, setGameHistory] = useState([])

    return (
        <div>
            <UserNavbar tab='game history'/>


        </div>
    );

}

export default GameHistory;