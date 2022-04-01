import { useState } from 'react';

import Login from "./Login";
import Register from "./Register";
import GuestJoin from "./GuestJoin";

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';

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
        sx={{
          display: 'flex',
          alignItems: 'center',
          borderBottom: (t) => `1px solid ${t.palette.divider}` }}
      >
        <Toolbar sx={{ display: 'flex', flexWrap: 'wrap', justifySelf: 'center' }}>
          <Typography variant="h6" color="inherit" noWrap>
            Be a Hearo
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="xs">
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          mt: 3,
          boxShadow: 3
        }}>
          <Tabs value={value} onChange={handleChange}>
            <Tab label="Sign in" />
            <Tab label="Register" />
            <Tab label="Guest" />
          </Tabs>
          <TabPanel value={value} index={0}>
            <Login/>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Register/>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <GuestJoin/>
          </TabPanel>
        </Box>
      </Container>
    </div>
  );
}

export default Authentication;