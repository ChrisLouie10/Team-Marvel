import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

import Box from '@mui/material/Box';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { useNavigate } from "react-router-dom";

// top menu bar that has links and buttons to pages a logged in user can access
const UserNavbar = (props) => {
  let navigate = useNavigate(); // used for navigating to different Routes

  return (
    <div>
    <CssBaseline />
      <AppBar
        position="static"
        color="inherit"
        elevation={0}
        sx={{display: 'flex', color: 'teal'}}
        >
        <Toolbar style={{display:'flex', justifyContent:"space-between", width:'100%'}}>
            {/* left aligned elements */}
            <Box display='flex' flexGrow={1}>
                <Typography variant="h4" noWrap sx={{mr: 2}}>
                  Hearo
                </Typography>
                <Button sx={{color: 'teal'}} disabled={props.tab === 'join' ? true : false}
                    onClick={() => navigate("/user/join", { replace: true })}>Join</Button>
                <Button sx={{color: 'teal'}} disabled={props.tab === 'host' ? true : false}
                    onClick={() => navigate("/user/host", { replace: true })}>Host</Button>
                <Button sx={{color: 'teal'}} onClick={() => navigate("/user/history", { replace: true })}>Game history</Button>
            </Box>

            {/* right aligned */}
            <Button sx={{color: 'teal'}}
                onClick={() =>
                    navigate("/", { replace: true }) // returns to login page
                    }
                >Logout</Button>
        </Toolbar>
      </AppBar>

    </div>
  );
}

export default UserNavbar;
