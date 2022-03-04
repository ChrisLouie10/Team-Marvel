import React from 'react'
import Link from '@mui/material/Link';

const Navbar = () => {
  return (
    <div className="App">
      <h1>This is an ugly navbar I know</h1>
      <Link href="about" className="Navbar-link">About</Link>
      <Link href="/login" className="Navbar-link">Login</Link>
      <Link href="/register" className="Navbar-link">Register</Link>
    </div>
  )
}

export default Navbar