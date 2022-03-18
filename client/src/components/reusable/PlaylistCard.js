import * as React from 'react';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { CardActionArea } from '@mui/material';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import Collapse from '@mui/material/Collapse';

export default function PlaylistCard(props) {
  const [expanded, setExpanded] = React.useState(false);

  return (
    <Card sx={{ maxWidth: 345, mt: 4, mb: 4}}>
      <CardActionArea sx={{bgcolor: 'MediumAquaMarine', color: 'white'}}
        expand={expanded}
        onClick={() => setExpanded(!expanded)}
        >
      <CardContent>
        <Typography variant="h5">
          {props.name}
        </Typography>

      </CardContent>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography>Song 1</Typography>
          <Typography>Song 2</Typography>
          <Typography>Song 3</Typography>
        </CardContent>
      </Collapse>

      </CardActionArea>

        <CardActions disableSpacing>
          <Button size="small">Edit</Button>
          <Button size="small">Start Game</Button>
        </CardActions>
    </Card>
  );
}
