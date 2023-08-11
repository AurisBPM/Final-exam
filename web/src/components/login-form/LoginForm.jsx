import {
  Button,
  TextField,
  Stack,
  Typography,
  FormControl,
  Paper,
  Box,
} from '@mui/material';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../auth/AuthContext';
import styled from '@emotion/styled';
import logo from '../../assets/logo.svg';
import InputAdornment from '@mui/material/InputAdornment';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import EmailIcon from '@mui/icons-material/Email';

const StyledDiv = styled.div`
  margin-left: auto;
  margin-right: auto;
  text-align: center;
`;

const LoginForm = () => {
  const { updateAuth } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [isEmailInvalid, setIsEmailInvalid] = useState(false);
  const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);
  const [emailError, setEmailError] = useState('');

  const navigate = useNavigate();

  const emailInputChange = (e) => {
    setEmail(e.target.value);
  };
  const passwordInputChange = (e) => {
    setPassword(e.target.value);
  };

  const submitLogin = async () => {
    setLoading(true);
    setError('');

    setIsEmailInvalid(false);
    setIsPasswordInvalid(false);
    setEmailError('');

    if (!email) {
      setIsEmailInvalid(true);
      setEmailError('Email required');
    }

    if (!email.match(/^[A-Za-z._\-0-9]*[@][A-Za-z]*[.][a-z]{2,4}$/)) {
      setIsEmailInvalid(true);
      setEmailError('Email invalid');
    }

    if (!password) {
      setIsPasswordInvalid(true);
    }

    if (
      !password ||
      !email ||
      !email.match(/^[A-Za-z._\-0-9]*[@][A-Za-z]*[.][a-z]{2,4}$/)
    ) {
      setError('Please add all required information');
      setLoading(false);
      return;
    }

    const body = {
      email: email,
      password: password,
    };

    try {
      const request = await axios.post('http://localhost:8080/login', body);
      if (request.data.token) {
        localStorage.setItem('token', request.data.token);
        updateAuth(request.data.token);
        navigate(`/customers`);
      }
    } catch (error) {
      console.log(error);
      if (error.response) {
        console.log(error.response.data);
        setError(error.response.data.error);
        setLoading(false);
      } else if (error.request) {
        setError('Server not responding');
        setLoading(false);
      } else {
        setError('Something went wrong');
        setLoading(false);
      }
    }
  };

  return (
    <StyledDiv>
      <Box
        component='img'
        sx={{
          height: 233,
          width: 250,
        }}
        alt='Company logo'
        src={logo}
      />
      <Paper elevation={3} sx={{ padding: '2rem' }}>
        <FormControl>
          <Stack spacing={2} alignItems='center'>
            <Typography variant='h4'>Events Management</Typography>
            <TextField
              type='email'
              label='Email'
              name='email'
              variant='outlined'
              autoFocus
              error={isEmailInvalid}
              helperText={isEmailInvalid && emailError}
              value={email}
              onChange={emailInputChange}
              sx={{
                width: 320,
                height: '4.5rem',
                marginBottom: '0.5rem',
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <EmailIcon />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              type='password'
              label='Password'
              name='password'
              variant='outlined'
              value={password}
              error={isPasswordInvalid}
              helperText={isPasswordInvalid && 'Password required'}
              onChange={passwordInputChange}
              sx={{
                width: 320,
                height: '4.5rem',
                marginBottom: '0.5rem',
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <LockOpenIcon />
                  </InputAdornment>
                ),
              }}
            />
            <Button
              variant='contained'
              disabled={isLoading}
              onClick={submitLogin}
            >
              Login
            </Button>

            <Typography variant='div' sx={{ color: 'red' }}>
              {error}
            </Typography>
          </Stack>
        </FormControl>
      </Paper>
    </StyledDiv>
  );
};

export default LoginForm;
