import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {AuthProvider} from './context/AuthProvider';
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
    </AuthProvider>
  </BrowserRouter>, 
  document.getElementById('root')
);