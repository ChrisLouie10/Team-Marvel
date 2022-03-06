import { useState } from 'react';

import Login from "./Login";
import Register from "./Register";

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

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
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
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
  );
}

export default Authentication;