import React from 'react'
import Link from '@mui/material/Link';
import Navbar from "./Navbar";

const About = () => {
  return (
    <div className="App">
      <Navbar/>
      <h3>Welcome to the About Page! :)</h3>
      <Link href="/">Back to home</Link>
    </div>
  )
}

export default About;