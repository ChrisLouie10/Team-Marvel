import { useState } from 'react';

import Login from "./Login";
import Register from "./Register";

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';

// imported TabPanel definition from MUI, no need to worry about details
const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography component={'span'} variant={'body2'}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const Authentication = () => {
  const [value, setValue] = useState(0);
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
    <CssBaseline />
    <AppBar
      position="static"
      color="inherit"
      elevation={0}
      sx={{ borderBottom: (t) => `1px solid ${t.palette.divider}` }}
    >
      <Toolbar sx={{ flexWrap: 'wrap' }}>
        <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
          App Name  
        </Typography>
      </Toolbar>
    </AppBar>
    <Container sx={{
      display: 'flex',
      justifyContent: 'center',
    }}>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        mx: 4
      }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Sign in" />
          <Tab label="Register" />
        </Tabs>
        <TabPanel value={value} index={0}>
          <Login/>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Register/>
        </TabPanel>
      </Box>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        mx: 4
        }}>
        <Typography variant="h6" color="inherit" noWrap sx={{ justifySelf: 'flex-start'}}>
          OR
        </Typography>
      </Box>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        mx: 8
        }}>
        <Typography variant="h6" color="inherit" noWrap sx={{ justifySelf: 'flex-start'}}>
          Play Anonymously
        </Typography>
        <Typography>
          Enter room code:
        </Typography>
        <TextField>Join Room</TextField>
      </Box>
    </Container>
    </div>
  );
}

export default Authentication;