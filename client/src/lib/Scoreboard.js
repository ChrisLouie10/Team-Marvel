import React from 'react'
import { List, ListItem, ListItemText, Typography, Divider, Box, Button } from '@mui/material';

export default function Scoreboard({players, isHost, handleNextQuestion}) {

    return (
        <div>
            <h1>Scoreboard</h1>
            <div>
            {/* list of players and scores in descending order */}
                <List sx={{ bgcolor: '#5EC1B5', padding: 10}}>
                    {players
                        .map(player => {
                            console.log("This is a player", player);
                            return (
                                <div>
                                    {/* player with top score has white bgcolor */}
                                    {player == players[0] ? (
                                       <ListItem sx={{ boxShadow: 1, bgcolor: 'white' }}>
                                        <Box textAlign="left" style={{ paddingRight: 5 }}>
                                            <Typography variant='h6' fontWeight={'bold'}>{player.playerName}</Typography>
                                        </Box>
                                        
                                        <ListItemText primary={
                                        <Typography variant='h6' textAlign={'right'} fontWeight={'bold'}>
                                            {player.score}</Typography>}
                                        />

                                    </ListItem>) :
            
                                    
                                    (<ListItem sx={{ boxShadow: 1 }}>
                                        <Box textAlign="left" style={{ paddingRight: 5 }}>
                                            <Typography variant='h6' fontWeight={'bold'} color={'white'}>{player.playerName}</Typography>
                                        </Box>
                                        
                                        <ListItemText primary={
                                        <Typography variant='h6' textAlign={'right'} fontWeight={'bold'} color={'white'}>
                                            {player.score}</Typography>}
                                        />

                                    </ListItem>
                                    )}
                                    <Divider />
                                </div>
                            );
                        })}

                </List>
            </div>
            {isHost ? 
                <div>
                    <button onClick={(e) => handleNextQuestion(e)}>Next Question</button>
                </div>
                : <></>
            }
        </div>


    );
}