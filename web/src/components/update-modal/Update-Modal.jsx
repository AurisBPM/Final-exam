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

const UpdateModal = ({ setDialogueClosed, isDialogOpen, customerData, setCustomerData }) => {

    const [ email, setEmail ] = useState("");
const [ name, setName ] = useState("");
const [ dob, setDob ] = useState(new Date());
const [ id, setId ] = useState("");

useEffect(() => {
    console.log(customerData);
    setEmail(customerData.email);
    setName(customerData.name);
    setId(customerData.id);
  }, [customerData]);

  const updateCustomer = async (event) => {

    console.log("runs");
  
    event.preventDefault();

    const adjustedDate = dob.toISOString().substring(0, 10);

    const body = {
        email: email,
        full_name: name,
        dob: adjustedDate,
    }

    try {
        const request = await axios.put(`http://localhost:8080/customers/${id}`, body);
        console.log(request);
        
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
            placeholder="Name"
            name="name"
            variant="outlined"
            required
            autoFocus
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <TextField
            type="email"
            placeholder="Email"
            name="username"
            variant="outlined"
            required
            autoFocus
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <DatePicker
            views={['year', 'month', 'day']}
            label="Date of birth"
            onChange={value => setDob(value)}
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
