import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Stack,
  Button,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import styled from '@emotion/styled';
import { AuthContext } from '../../auth/AuthContext';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';


const StyledContainer = styled.div`
  padding-top: 0.5rem;
`;

const UpdateModal = ({
  close,
  open,
  customerData,
  setCustomers,
  customers,
}) => {
  const { token } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [id, setId] = useState('');
  const [isLoading, setLoading] = useState(false);

  const [isNameInvalid, setIsNameInvalid] = useState(false);
  const [isEmailInvalid, setIsEmailInvalid] = useState(false);
  const [isDateInvalid, setIsDateInvalid] = useState(false);
  const [emailError, setEmailError] = useState('');

  useEffect(() => {
    setDob(dayjs(customerData.dob));
    setEmail(customerData.email);
    setName(customerData.name);
    setId(customerData.id);
    setIsNameInvalid(false);
    setIsEmailInvalid(false);
    setIsDateInvalid(false);
    setEmailError('');
  }, [customerData]);

  const updateCustomer = async () => {
    setIsNameInvalid(false);
    setIsEmailInvalid(false);
    setIsDateInvalid(false);

    if (!name) {
      setIsNameInvalid(true);
    }

    if (!dob) {
      setIsDateInvalid(true);
    }

    if (!email.match(/^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)) {
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
      !email.match(/^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)
    ) {
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
    };

    try {
      const request = await axios.put(
        `http://localhost:8080/customers/${id}`,
        body,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(request);
      const updatedCustomers = customers.map((customer) => {
        if (customer.id === id) {
          return {
            ...customer,
            email: email,
            full_name: name,
            dob: adjustedDate,
          };
        }
        return customer;
      });

      // Update the state with the modified customers list
      setCustomers(updatedCustomers);
      close();
    } catch (error) {
      console.log(error);
      if (error.response) {
        if (error.response.data.error) {
          console.log(error.response.data);
        } else {
        }
      } else if (error.request) {
      } else {
      }
    }
  };

  return (
    <Dialog open={open} style={{ textAlign: "center" }}>
      <DialogTitle>Update customer</DialogTitle>
      <DialogContent>
        <StyledContainer>
          <Stack spacing={2}>
            <TextField
              type="text"
              label="Name"
              name="name"
              variant="outlined"
              required
              error={isNameInvalid}
              helperText={isNameInvalid && 'Full name required'}
              autoFocus
              value={name}
              sx={{
                width: 320,
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircleIcon />
                  </InputAdornment>
                ),
              }}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              type="email"
              label="Email"
              name="username"
              variant="outlined"
              required
              error={isEmailInvalid}
              helperText={isEmailInvalid && emailError}
              value={email}
              sx={{
                width: 320,
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                ),
              }}
              onChange={(e) => setEmail(e.target.value)}
            />
            <DatePicker
              views={['year', 'month', 'day']}
              label="Date of birth"
              onChange={(value) => setDob(value)}
              value={dayjs(dob)}
              format="YYYY-MM-DD"
              minDate={dayjs('1920-01-01')}
              maxDate={dayjs(new Date())}
              sx={{
                width: 320,
              }}
              slotProps={{
                textField: {
                  error: isDateInvalid,
                  helperText: isDateInvalid && 'Date required',
                },
              }}
            />
          </Stack>
        </StyledContainer>
      </DialogContent>
      <DialogActions style={{ justifyContent: "center" }}>
        <Button variant="outlined" onClick={close}>
          Cancel
        </Button>
        <Button
          variant="contained"
          disabled={isLoading}
          onClick={updateCustomer}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateModal;
