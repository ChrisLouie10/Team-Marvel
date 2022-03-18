import { useState, useEffect } from 'react';
import * as React from 'react';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';

import Button from '@mui/material/Button';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

// a UI popup that prompts host to select a playlist to add
// keeps track of host's selection during user interaction, and sends selected data back to dashboard for display after user is done
const AddPlaylistDialog = (props) => {
    const [isOpen, setIsOpen] = React.useState(false) // whether popup is shown

    const [playlistName, setPlaylistName] = React.useState(''); // user's current playlist selection

    return (
        <>
        <Button
            onClick={() => setIsOpen(true)}
            >Add Playlist</Button>

        <Dialog
            open={isOpen}
            onClose={() => setIsOpen(false)}
            >
          <DialogTitle sx={{minWidth: 1000}}>Choose Playlist</DialogTitle>

          <DialogContent>
            <FormControl>
                  <RadioGroup
                    value={playlistName}
                    onChange={e => setPlaylistName(e.target.value)}
                    >
                    <FormControlLabel value="Superhero Playlist" control={<Radio />} label="Superhero Playlist" />
                    <FormControlLabel value="Heroic Playlist" control={<Radio />} label="Heroic Playlist" />
                    <FormControlLabel value="Classic Playlist" control={<Radio />} label="Classic Playlist" />
                  </RadioGroup>
            </FormControl>
          </DialogContent>

          <Button
            disabled={playlistName === '' ? true : false} // button disabled until user selects a playlist option
            onClick={() => {
              props.submitFunction({name: playlistName}) // updates UI in dashboard

              // reset states
              setIsOpen(false)
              setPlaylistName('')
              }}
              >Create</Button>

        </Dialog>
        </>
    )
}

export default AddPlaylistDialog;
