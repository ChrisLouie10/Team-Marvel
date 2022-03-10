import React from 'react'
import { useState } from 'react';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import { registerUser } from "../api/provider";
import { registerValidation } from "../validation/registerValidation";

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
      username: data.get('username'),
      password: data.get('password')
    }

    console.log(newUser);
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
        <Typography variant="h5">
          Sign Up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            error={errors.username ? true : false}
            helperText={errors.username ? errors.username : ""}
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
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
            sx={{ mt: 3, mb: 3 }}
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