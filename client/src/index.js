import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './components/Home';
import NotFound from './components/NotFound';

ReactDOM.render(
  <Router>
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Router>,
  document.getElementById('root')
);
