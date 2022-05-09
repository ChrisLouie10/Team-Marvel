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

import { registerUser } from "../../api/provider";
import { registerValidation } from "../../validation/registerValidation";

const Register = () => {
  const [errors, setErrors] = useState({});
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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

  const handleUsernameChange = (e) => {
    setUsername(e.target.value)
  }
  
  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.target);
    const newUser = {
      username: data.get('username'),
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
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            value={username}
            onChange={handleUsernameChange}
            error={errors.username ? true : false}
            helperText={errors.username ? errors.username : ""}
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            value={password}
            onChange={handlePasswordChange}
            error={errors.password ? true : false}
            helperText={errors.password ? errors.password : ""}
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