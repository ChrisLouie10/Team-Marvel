import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import {AuthProvider} from './context/AuthProvider';
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";

const container = document.getElementById('root')
const root = createRoot(container)
root.render(
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
    </AuthProvider>
  </BrowserRouter>
)
// ReactDOM.render(
//   <BrowserRouter>
//     <AuthProvider>
//       <Routes>
//         <Route path="/*" element={<App />} />
//       </Routes>
//     </AuthProvider>
//   </BrowserRouter>, 
//   document.getElementById('root')
// );