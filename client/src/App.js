import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import Authentication from './components/Authentication';
import NotFound from './components/NotFound';
import Login from './components/Login';
import Register from './components/Register';
import GameMain from './components/GameMain';
import HostDashboard from './components/HostDashboard'
import UserJoin from './components/UserJoin'

const App = () => {
    return (
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<Authentication/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="*" element={<NotFound/>} />
            <Route path="/game" element={<GameMain/>} />
            <Route path="/user/host" element={<HostDashboard/>} />
            <Route path="/user/join" element={<UserJoin/>} />
          </Routes>
        </Router>
      </div>
    )
}

export default App;