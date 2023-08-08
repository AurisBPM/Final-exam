import {  Button, TextField, Stack, Typography, FormControl } from "@mui/material";
import "../login-form/LoginForm.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';


const AddCustomerForm = () => {

const [ email, setEmail ] = useState("");
const [ name, setName ] = useState("");
const [ dob, setDob ] = useState("");
const [isLoading, setLoading] = useState(false);
const [error, setError] = useState("");

const [isNameInvalid, setIsNameInvalid] = useState(false);
const [isEmailInvalid, setIsEmailInvalid] = useState(false);
const [isDateInvalid, setIsDateInvalid] = useState(false);

const navigate = useNavigate();


const submitCustomerForm = async (event) => {

    setIsNameInvalid(false);
    setIsEmailInvalid(false);
    setIsDateInvalid(false);    

    if ( !name ){
        setIsNameInvalid(true);
    }
    if ( !email ){
        setIsEmailInvalid(true);
    }

    if (!dob) {
        setIsDateInvalid(true);      

    }

    if ( !dob || !email || !name ){
        setError("Please add all required information");
        setLoading(false);
        return;
    }


    setLoading(true);
    setError("");
    event.preventDefault();
    console.log(dob);

    if (!dob) {
        setError("Please select Date of Birth");
        setLoading(false);
return;
    }

    const adjustedDate = dob.toISOString().substring(0, 10);

    const body = {
        email: email,
        full_name: name,
        dob: adjustedDate,
        auth_id: 1
    }

    try {
        const request = await axios.post("http://localhost:8080/customers", body);
        navigate(`/customers`)
        
    } catch (error) {
        console.log(error);
        if (error.response) {
            if (error.response.data.error ){
            console.log(error.response.data);
            setError(error.response.data.error);
            setLoading(false);
            } else {
                setError("User already exists");
                setLoading(false);
            }
          } else if (error.request) {
            setError("Server not responding");
            setLoading(false);
          } else {
            setError("Something went wrong");
            setLoading(false);
          }
    }
    }

    return (
        <FormControl sx={{ paddingTop: '4rem' }}>
            <Stack spacing={2} alignItems="center" >
                <Typography variant="h4">Add Customer</Typography>
                <TextField
type="text"
label="Name"
name="name"
variant="outlined"
required
autoFocus
value={name}
error={isNameInvalid}
helperText={isNameInvalid && "Full name required"}
onChange={e => setName(e.target.value)}
sx={{
    width: 320
}}
/>
            <TextField
type="email"
label="Email"
name="username"
variant="outlined"
required
error={isEmailInvalid}
helperText={isEmailInvalid && "Email required"}
value={email}
onChange={e => setEmail(e.target.value)}
sx={{
    width: 320
}}
/>
<DatePicker
format="YYYY-MM-DD"
label="Date of birth"
onChange={value => setDob(value)}
required
minDate={dayjs("1920-01-01")}
maxDate={dayjs(new Date())}
sx={{
    width: 320
}}
slotProps={{
    textField: {
      error: isDateInvalid,
      helperText: isDateInvalid ? "Date required" : "",
    },
  }}
/>

<Button variant="contained" type="submit" disabled={isLoading} onClick={submitCustomerForm}>
  Add Customer
</Button>

<Typography variant="div">{error}</Typography>
            </Stack>
    
        </FormControl>
    )
}

export default AddCustomerForm;