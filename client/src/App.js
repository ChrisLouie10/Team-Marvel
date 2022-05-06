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

const App = () => {
    const [userContext, setUserContext] = useState()

    return (
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Public routes */}
          <Route path="/" element={<Authentication/>} />
          <Route path="/spotify" element={<SpotifyAPI/>} />

          {/* Only authorized users can access */}
          <Route element={<RequireAuth allowedRoles={['auth']}/>}>
            <Route path="/user/host" element={<HostDashboard/>}/>
            <Route path="/user/join" element={<UserJoin/>} />
            <Route path="/user/history" element={<GameHistory/>} />
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
    )
}

export default App;