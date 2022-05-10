import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { useState } from 'react';

import Authentication from './pages/Authentication/Authentication';
import GameMain from './pages/Game/GameMain';
import Lobby from './pages/Game/Lobby';
import HostDashboard from './pages/Home/HostDashboard'
import UserJoin from './pages/Home/UserJoin'
import SpotifyAPI from './components/SpotifyAPI';
import RequireAuth from './components/RequireAuth';
import Layout from './components/Layout';
import NotFound from './pages/NotFound';
import GameHistory from './pages/Home/GameHistory';

import { ThemeProvider, createTheme } from '@mui/material/styles';

const App = () => {
  // this custom theme will be applied to any MUI component used inside the ThemeProvider
  const theme = createTheme({
    palette: {
      type: 'dark',
      primary: {
        main: '#44ada2', // darker shade of blue
      },
      secondary: {
        main: '#5edbce', // lighter shade
      },
      textField: {
        width: '90%',
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingBottom: 0,
        marginTop: 0,
      },
      input: { // includes text field inputs
          color: 'hsl(173, 44%, 56%)', // text color
          background: "rgb(232, 241, 250)" // background color
      },
      error: { // color of error message
        main: '#eb9875', // orange
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            '&.MuiButton-contained' : { // buttons with filled up background
              color: 'white'
            },
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            backgroundColor: "transparent",
            "&:hover": {
              backgroundColor: "#e4f7f5",
            },
            "&.Mui-focused": {
              backgroundColor: '#e4f7f5'
            },
            "&:focus": {
              backgroundColor: '#e4f7f5'
            }
          }
        }
      }
    },
  })

  const [userContext, setUserContext] = useState()

  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Public routes */}
          <Route path="/" element={<Authentication/>} />
          <Route path="/spotify" element={<SpotifyAPI/>} />

          {/* Only authorized users can access */}
          <Route element={<RequireAuth allowedRoles={['auth']}/>}>
            <Route path="/user/host" element={<HostDashboard/>}/>
            <Route path="/user/join" element={<UserJoin/>} />
            <Route path="/user/history" element={<GameHistory/>}/>
          </Route>

          {/* Guests and Authorized users can access */}
          <Route element={<RequireAuth allowedRoles={['auth', 'guest']}/>}>
            <Route path="/lobby" element={<Lobby/>} />
            <Route path="/game" element={<GameMain/>} />
          </Route>

          {/* Catch all pages */}
          <Route path="*" element={<NotFound/>} />
        </Route>
      </Routes>
    </ThemeProvider>
  )
}

export default App;