import React from 'react'
import { List, ListItem, ListItemText, Typography, Divider, Box, Button } from '@mui/material';

export default function Scoreboard(props) {

    const players = [
        { playerName: "Mark", score: 100 },
        { playerName: "Jen", score: 200 },
        { playerName: "Bobby", score: 50 },
        { playerName: "Kim", score: 150 },
        { playerName: "Eli", score: 25 }
    ].sort((a, b) => b.score - a.score);


    return (
        <div>
            <h1>Scoreboard</h1>
            <div>
                <List sx={{ bgcolor: '#5EC1B5', padding: 10}}>
                    {players
                        .map(player => {
                            console.log("This is a player", player);
                            return (
                                <div>
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
        </div>


    );
}