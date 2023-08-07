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
import { useState, useEffect } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';

const UpdateModal = ({ setDialogueClosed, isDialogOpen, customerData, setCustomers ,customers }) => {

    const [ email, setEmail ] = useState("");
const [ name, setName ] = useState("");
const [ dob, setDob ] = useState("");
const [ id, setId ] = useState("");

useEffect(() => {

    setDob(dayjs(customerData.dob));
    setEmail(customerData.email);
    setName(customerData.name);
    setId(customerData.id);
  }, [customerData]);

  const updateCustomer = async (event) => {
  
    event.preventDefault();

    console.log(dob);

    const adjustedDate = dob.toISOString().substring(0, 10);

    const body = {
        email: email,
        full_name: name,
        dob: adjustedDate,
    }

    try {
        const request = await axios.put(`http://localhost:8080/customers/${id}`, body);
        console.log(request);
        const updatedCustomers = customers.map(customer => {
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
          setDialogueClosed();
        
    } catch (error) {
        console.log(error);
        if (error.response) {
            if (error.response.data.error ){
            console.log(error.response.data);
          
            } else {
            
            }
          } else if (error.request) {
        
          } else {
         
          }
    }
    }

  return (
    <Dialog open={isDialogOpen}>
      <DialogTitle>Update customer</DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          <TextField
            type="text"
            label="Name"
            name="name"
            variant="outlined"
            required
            autoFocus
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <TextField
            type="email"
            label="Email"
            name="username"
            variant="outlined"
            required
            autoFocus
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <DatePicker
            label="Date of birth"
            onChange={value => setDob(value)}
            value={dayjs(dob)}
            format="YYYY-MM-DD"
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={setDialogueClosed}>
          Cancel
        </Button>
        <Button variant="contained" onClick={updateCustomer}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateModal;
