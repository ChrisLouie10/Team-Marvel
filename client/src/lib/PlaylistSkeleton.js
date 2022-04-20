import * as React from 'react';
import { useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { CardActionArea } from '@mui/material';
import Typography from '@mui/material/Typography';

import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';

import Skeleton from '@mui/material/Skeleton';

// fake playlist card with blurred content for displaying while real data is loading
export default function PlaylistSkeleton(props) {

  return (
    <Card sx={{ width: 365, mt: 4, mb: 4}}>
      <CardActionArea sx={{bgcolor: '#97c4c0', color: 'white'}}
        expand={props.expanded}
        >
          <CardContent>
            <Typography variant="h5"><Skeleton width="80%"/></Typography>
          </CardContent>

          {/* list of songs */
          props.expanded &&
            <CardContent>
              <Skeleton height="1.5em" width="50%"/>
              <Skeleton height="1.5em" width="70%"/>
              <Skeleton height="1.5em" width="60%"/>
            </CardContent>
          }
      </CardActionArea>

      <CardActions>
        <Skeleton animation="wave">
          <Button size="small">Save</Button>
        </Skeleton>
      </CardActions>
    </Card>
  );
}
