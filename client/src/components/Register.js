import React from 'react'
import { useState } from 'react';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { registerUser } from "../api/provider";
import { registerValidation } from "../validation/registerValidation";

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="/about">
        Team Marvel
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

const Register = () => {
  const [errors, setErrors] = useState({});

  const validate = (newUser) => {
    const { error } = registerValidation.validate(newUser, {abortEarly: false});
    if (!error) return null;

    // Map errors with key = field name, value = error message
    const errors = error.details.reduce((map, err) => {
      map[err.path[0]] = err.message;
      return map;
    }, {});

    return errors;
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.target);
    const newUser = {
      email: data.get('email'),
      name: data.get('name'),
      password: data.get('password')
    }

    // Check for client side errors (i.e., invalid textfield submissions)
    const errors = validate(newUser);
    setErrors(errors || {})
    if (errors) return;

    // Send a request to the server and check for errors
    registerUser(newUser)
      .then(response => console.log(response))
      .catch(err => {
        setErrors(err.response.data);
      });
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'green' }}>
          <MusicNoteIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            error={errors.name ? true : false}
            helperText={errors.name ? errors.name : ""}
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            autoFocus
          />
          <TextField
            error={errors.email ? true : false}
            helperText={errors.email ? errors.email : ""}
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
          />
          <TextField
            error={errors.password ? true : false}
            helperText={errors.password ? errors.password : ""}
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          { errors.message && <Alert sx={{mt: 2}} severity="error">{errors.message}</Alert>}
        </Box>
      </Box>
    </Container>
  );
}

export default Register;