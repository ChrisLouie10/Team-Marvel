import * as React from 'react';
import { useState, useEffect } from 'react';

import Typography from '@mui/material/Typography';

import IconButton from '@mui/material/IconButton';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

// displays data of one song
export default function SongListItem(props) {
  const [isPlaying, setIsPlaying] = useState(false); // used to determine if song should be highlighted if it's currently being played

  return(
    <Typography key={props.song.mp3}
      style={{display: 'flex', alignItems: 'center',
        color: `${isPlaying ? '#7dffdc' : 'white'}`,
        }}
      onClick={e =>
        e.stopPropagation() // prevent playlist card (parent component) from collapsing due to clicking on list item (child component)
      }>

      {/* play button */}
      <IconButton
          onClick={e => {
            setIsPlaying(true)

            props.playSong({
              ...props.song,
              endSong: () => setIsPlaying(false) // called when different song starts
            })
          }}
          sx={{color: `${isPlaying ? '#7dffdc' : 'white'}`,
              '&:active, &:hover': {color: 'cyan'}
            }}>
        <PlayArrowIcon />
      </IconButton>

      {props.song.name}
    </Typography>
  );
}
