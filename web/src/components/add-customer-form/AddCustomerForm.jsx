import {
  Button,
  TextField,
  Stack,
  Typography,
  FormControl,
} from '@mui/material';
import { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { AuthContext } from '../../auth/AuthContext';
import { useJwt } from 'react-jwt';
import AddIcon from '@mui/icons-material/Add';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';

const AddCustomerForm = () => {
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);

  const { isExpired } = useJwt(token);
  if (isExpired) {
    navigate(`/login`);
  }

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [isNameInvalid, setIsNameInvalid] = useState(false);
  const [isEmailInvalid, setIsEmailInvalid] = useState(false);
  const [isDateInvalid, setIsDateInvalid] = useState(false);
  const [emailError, setEmailError] = useState('');

  const submitCustomerForm = async () => {
    setIsNameInvalid(false);
    setIsEmailInvalid(false);
    setIsDateInvalid(false);
    setEmailError('');
    setLoading(true);
    setError('');

    if (!name) {
      setIsNameInvalid(true);
    }

    if (!dob) {
      setIsDateInvalid(true);
    }

    if (!email.match(/^[A-Za-z._\-0-9]*[@][A-Za-z]*[.][a-z]{2,4}$/)) {
      setIsEmailInvalid(true);
      setEmailError('Email invalid');
    }

    if (!email) {
      setEmailError('Email required');
      setIsEmailInvalid(true);
    }

    if (
      !dob ||
      !email ||
      !name ||
      !email.match(/^[A-Za-z._\-0-9]*[@][A-Za-z]*[.][a-z]{2,4}$/)
    ) {
      setError('Please add all required information');
      setLoading(false);
      return;
    }

    const localDate = new Date(dob);
    localDate.setTime(
      localDate.getTime() - localDate.getTimezoneOffset() * 60000
    );

    const adjustedDate = localDate.toISOString().substring(0, 10);

    const body = {
      email: email,
      full_name: name,
      dob: adjustedDate,
      auth_id: 1,
    };

    try {
      const request = await axios.post(
        'http://localhost:8080/customers',
        body,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      if (request.status == 200) {
        navigate(`/customers`);
      }
    } catch (error) {
      if (error.response) {
        if (error.response.statusText == 'Unauthorized') {
          navigate(`/login`);
        }
        if (error.response.data.error) {
          setError(error.response.data.error);
          setLoading(false);
        } else {
          setError('User already exists');
          setLoading(false);
          setIsEmailInvalid(true);
        }
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
    <FormControl sx={{ paddingTop: '4rem' }}>
      <Stack spacing={2} alignItems="center">
        <Typography variant="h4">Add Customer</Typography>
        <TextField
          type="text"
          label="Full name"
          name="name"
          variant="outlined"
          autoFocus
          value={name}
          error={isNameInvalid}
          helperText={isNameInvalid && 'Full name required'}
          onChange={(e) => setName(e.target.value)}
          sx={{
            width: 320,
            height: '4.5rem',
            marginBottom: '0.5rem',
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircleIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          type="email"
          label="Email"
          name="username"
          variant="outlined"
          error={isEmailInvalid}
          helperText={isEmailInvalid && emailError}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{
            width: 320,
            height: '4.5rem',
            marginBottom: '0.5rem',
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon />
              </InputAdornment>
            ),
          }}
        />
        <DatePicker
          openTo="year"
          views={['year', 'month', 'day']}
          format="YYYY-MM-DD"
          label="Date of birth"
          onChange={(value) => setDob(value)}
          disableFuture
          minDate={dayjs('1920-01-01')}
          value={dob}
          sx={{
            width: 320,
            height: '4.5rem',
            marginBottom: '0.5rem',
          }}
          slotProps={{
            inputAdornment: {
              position: 'start',
            },
            textField: {
              error: isDateInvalid,
              helperText: isDateInvalid && 'Date required',
            },
          }}
        />
        <Button
          variant="contained"
          type="submit"
          disabled={isLoading}
          onClick={submitCustomerForm}
          startIcon={<AddIcon />}
        >
          Add Customer
        </Button>
        <Typography variant="div" sx={{ color: 'red' }}>
          {error}
        </Typography>
      </Stack>
    </FormControl>
  );
};

export default AddCustomerForm;
