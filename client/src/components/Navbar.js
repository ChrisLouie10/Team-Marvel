import React from 'react'
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';

const Navbar = () => {
  return (
    <div className="App">
      <h1>This is an ugly navbar I know</h1>
      <Grid container justifyContent="center" spacing={2}>
        <Grid item>
          <Link href="">Home</Link>
        </Grid>
        <Grid item>
          <Link href="about">About</Link>
        </Grid>
        <Grid item>
          <Link href="login">Login</Link>
        </Grid>
      </Grid>
      
    </div>
  )
}

export default Navbar