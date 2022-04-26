import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import { loginValidation } from '../../validation/loginValidation';
import { loginAuth, getUserByUsername } from '../../api/provider';
import useAuth from '../../hooks/useAuth';

const SignIn = () => {
  const { setAuth, setData } = useAuth();

  const navigate = useNavigate();
  const [errors, setErrors] = useState({message: "no errors"});

  const validate = (credentials) => {
    const { error } = loginValidation.validate(credentials, {abortEarly: false});
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
    const data = new FormData(event.currentTarget);
    const credentials = {
      username: data.get('username'),
      password: data.get('password'),
    };

    console.log(credentials)
    // Check for client side errors (i.e., invalid textfield submissions)
    const errors = validate(credentials);
    setErrors(errors || {})
    console.log(errors)
    if (errors) return;

    // GET credentials from server
    loginAuth(credentials)
      .then( async (response) => {
          console.log(response);

          // find user data
          const user = await getUserByUsername(credentials.username)

          // set user and auth context (to use across components)
          setData(user.data);
          setAuth(['auth']);

          // display dashboard page
          navigate("/user/host", { replace: true });
      })
      .catch(err => {
        setErrors(err.response.data)
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
        Sign in
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          data-testid="username"
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
          data-testid="password"
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
          data-testid="submit-btn"
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>
        <Alert data-testid="errors" sx={{mt: 2}} severity="error">{errors.username}</Alert>
        {/* { errors.message && <Alert data-testid="errors" sx={{mt: 2}} severity="error">{errors.message}</Alert>} */}
      </Box>
    </Box>
    </Container>
  );
}

export default SignIn;
