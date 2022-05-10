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
  const { setAuth, setData } = useAuth(); // used to share state between components
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // validate credentials in the input fields (username & password)
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

  const handleUsernameChange = (e) => {
    setUsername(e.target.value)
  }
  
  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const credentials = {
      username: username,
      password: password,
    };
    
    // Check for client side errors (i.e., invalid textfield submissions)
    const errors = validate(credentials);
    setErrors(errors || {})
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
          id="password"
          name="password"
          label="Password"
          type="password"
          autoComplete="password"
          inputProps={{ "data-testid": "password-textfield" }}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          data-testid="submit-btn"
        >
          Sign In
        </Button>
        { errors.message 
          && 
          <Alert
            sx={{mt: 2}} 
            severity="error"
            data-testid="error-server-alertbox"
            >
              {errors.message}
          </Alert>
        }
      </Box>
    </Box>
    </Container>
  );
}

export default SignIn;
