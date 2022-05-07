import { useState, useEffect } from 'react';
import * as React from 'react';
import UserNavbar from '../../lib/UserNavbar';
import { getGameHistoryByPlayerId } from '../../api/provider';
import useAuth from '../../hooks/useAuth';
import Scoreboard from '../../lib/Scoreboard';
import moment from 'moment'

import { Table, TableBody, TableCell, TableHead, TableRow, TableContainer, Paper, Typography } from '@mui/material';

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
            <UserNavbar tab='game history' />
            {showScoreboard &&
                <Scoreboard show={showScoreboard}
                    players={topPlayers}
                    isHost={false}
                    handleNextQuestion={false}
                    handleClose={handleClose} >
                </Scoreboard>}
            {history.length > 0 ?
                <div>
                    <Typography variant='h4' fontWeight={'bold'} color='teal' align='center'>Game History</Typography>
                    <p></p>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="past games">
                            <TableHead>
                                <TableRow sx={{ bgcolor: '#e6f2f2' }}>
                                    <TableCell align="left">{<Typography variant='h6' fontWeight={'bold'} color='teal'>Playlist</Typography>}</TableCell>
                                    <TableCell align="left">{<Typography variant='h6' fontWeight={'bold'} color='teal'>Date</Typography>}</TableCell>
                                    <TableCell align="left">{<Typography variant='h6' fontWeight={'bold'} color='teal'>Time</Typography>}</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {history
                                    .sort((a, b) => new Date(b.date) - new Date(a.date))
                                    .map((game) => (
                                        <TableRow hover
                                            key={game.playlistName + game.date}
                                            onClick={() => { setShowScoreboard(true); setTopPlayers(game.players) }}>
                                            <TableCell align="left">{<Typography variant='body1' fontWeight={'bold'} color='teal'>
                                                {game.playlistName}</Typography>}</TableCell>

                                            <TableCell align="left">{<Typography variant='body1' color='teal'>
                                                {moment(new Date(game.date)).format("DD/MM/YY")}</Typography>}</TableCell>

                                            <TableCell align="left">{<Typography variant='body1' color='teal'>
                                                {moment(new Date(game.date)).format("hh:mm a")}</Typography>}</TableCell>

                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                : <h1 style={{ color: 'teal' }}>No past games found! Please Host or Join a game first.</h1>}
        </div>
    );

}

export default GameHistory;