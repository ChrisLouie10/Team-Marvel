import React, { useState , useEffect} from 'react'
import { List, ListItem, ListItemText, Typography, Divider, Box, Button, Dialog } from '@mui/material';

export default function Scoreboard({players, isHost, handleNextQuestion,show, handleClose, gameOver}) {
    const [pressed, setPressed] = useState(false)
    const [timeLeft, setTimeLeft] = useState(8)

    useEffect(() => {
      let myInterval = setInterval(() => {
            if (gameOver && timeLeft > 0) {
                setTimeLeft(timeLeft - 1);
            }
        }, 1000)
        return ()=> {
            clearInterval(myInterval);
          };
    });
    
    return (
      <Dialog open={show} fullWidth maxWidth='xl' onClose={handleClose}>
        <div style={{width: '100%', minHeight: '500px', display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
            {gameOver ? <h1>Game Over</h1> : <h1>Scoreboard</h1>}
            <div style={{width: '100%'}}>
            {/* list of players and scores in descending order */}
                <List sx={{ bgcolor: '#5EC1B5', width: '100%', padding: 10}}>
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
                    <button disabled={pressed} id="next-question" onClick={(e) => {handleNextQuestion(e); setPressed(true)}}>Next Question</button>
                </div>
                : <></>
            }
            {
                gameOver ? <h3>Ending in {timeLeft}...</h3> : <></>
            }
        </div>
      </Dialog>

    );
}