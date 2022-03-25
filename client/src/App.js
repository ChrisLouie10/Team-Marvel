import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { useState } from 'react';

import Authentication from './components/Authentication';
import NotFound from './components/NotFound';
import Login from './components/Login';
import Register from './components/Register';
import GameMain from './components/GameMain';
import HostDashboard from './components/HostDashboard'
import UserJoin from './components/UserJoin'
import Lobby from './components/Lobby';
import SpotifyAPI from './components/SpotifyAPI';
import RequireAuth from './components/RequireAuth';
import Layout from './components/Layout';

const App = () => {
    const [userContext, setUserContext] = useState()

    return (
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Public routes */}
          <Route path="/" element={<Authentication/>}/>
        
          {/* We want to protect these routes */}
          <Route element={<RequireAuth/>}>
            <Route path="/lobby" element={<Lobby/>} />
            <Route path="/game" element={<GameMain/>} />
            <Route path="/authenticate" element={<SpotifyAPI/>} />
            <Route path="/user/host" element={<HostDashboard/>}/>
            <Route path="/user/join" element={<UserJoin/>} />
          </Route>

          {/* Catch all pages */}
          <Route path="*" element={<NotFound/>} />
        </Route>
      </Routes>
    )
}

export default App;