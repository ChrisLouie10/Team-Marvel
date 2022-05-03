import * as React from 'react';
import { useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { CardActionArea } from '@mui/material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Collapse from '@mui/material/Collapse';

import socket from '../components/Socket';

// card shows a playlist's info
export default function PlaylistCard(props) {
  const [expanded, setExpanded] = useState(false); // shows elongated card with list of songs if true
  const data = props.data // set user data to data passed from parent (homepage)

  const createGame = () => {
    // request server to create game
    socket.emit('createGame', 
      { hostName: data.username, 
        hostId: data.id, 
        playlistId: props.id
      })
  }

  return (
    <Card sx={{ maxWidth: 345, mt: 4, mb: 4}}>
      <CardActionArea sx={{bgcolor: 'MediumAquaMarine', color: 'white'}}
        expand={expanded ? 1 : undefined}
        onClick={() => setExpanded(!expanded)} // toggles visibility of song list
        >
          <CardContent>
            <Typography variant="h5">{props.name}</Typography>
          </CardContent>

          {/* list of songs */}
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              {props.songs.map(song => <Typography key={song.songName}>{song.songName}</Typography>) }
            </CardContent>
          </Collapse>
      </CardActionArea>

      <CardActions>
          <Button size="small" onClick={createGame}>Create Game</Button>
      </CardActions>
    </Card>
  );
}
