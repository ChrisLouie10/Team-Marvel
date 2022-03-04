import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NotFound from './components/NotFound';
import Login from './components/Login';
import Register from './components/Register';

const App = () => {
    return (
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/about" element={<About/>}/>
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="*" element={<NotFound/>} />
          </Routes>
        </Router>
      </div>
    )
}

export default App;