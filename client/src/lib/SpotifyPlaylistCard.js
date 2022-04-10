import * as React from 'react';
import { useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { CardActionArea } from '@mui/material';
import Typography from '@mui/material/Typography';

import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

// card shows a playlist's info
export default function SpotifyPlaylistCard(props) {
  const [expanded, setExpanded] = useState(false); // shows elongated card with list of songs if true

  return (
    <Card sx={{ width: 365, mt: 4, mb: 4}}>
      <CardActionArea sx={{bgcolor: '#97c4c0', color: 'white'}}
        expand={expanded ? 1 : undefined}
        onClick={() => setExpanded(!expanded)} // toggles visibility of song list
        >
          <CardContent>
            <Typography variant="h5">{props.playlist.name}</Typography>
          </CardContent>

          {/* list of songs */}
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              {props.playlist.songs.map(song =>
                  <Typography key={song.mp3} style={{display: 'flex', alignItems: 'center'}}>

                    {/* play button */}
                    <IconButton
                        onClick={e => {
                          e.stopPropagation()
                          props.playMp3(song.mp3)
                        }}
                        sx={{color: 'white', '&:active, &:hover': {color: 'cyan'}}}>
                      <PlayArrowIcon />
                    </IconButton>

                    {song.name}
                  </Typography>
              )}
            </CardContent>
          </Collapse>
      </CardActionArea>

      <CardActions>
          <Button size="small" onClick={() => {}}>Save</Button>
      </CardActions>
    </Card>
  );
}
