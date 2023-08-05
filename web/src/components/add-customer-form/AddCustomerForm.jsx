import {  Button, TextField, Stack, Typography } from "@mui/material";
import "../login-form/LoginForm.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


const AddCustomerForm = () => {

const [ email, setEmail ] = useState("");
const [ name, setName ] = useState("");
const [ surname, setSurname ] = useState("");
const [ dob, setDob ] = useState("");
const [isLoading, setLoading] = useState(false);
const [error, setError] = useState("");

const navigate = useNavigate();

const emailInputChange = (e) => {
    setEmail(e.target.value);
}
const nameInputChange = (e) => {
    setName(e.target.value);
}

const surnameInputChange = (e) => {
    setSurname(e.target.value);
}

const dobInputChange = (e) => {
    setDob(e.target.value);
}

const submitCustomerForm = async (event) => {
    setLoading(true);
    setError("");
    event.preventDefault();

    const body = {
        email: email,
        full_name: name + " " + surname,
        dob: dob,
        auth_id: 1
    }

    try {
        const request = await axios.post("http://localhost:8080/customers", body);
        navigate(`/customers`)
        
    } catch (error) {
        console.log(error);
        if (error.response) {
            console.log(error.response.data);
            setError(error.response.data.error);
            setLoading(false);
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
        <form className="customerForm" onSubmit={submitCustomerForm}>
            <Stack spacing={2} alignItems="center">
                <Typography variant="h4">Add Customer</Typography>
                <TextField
type="text"
placeholder="Name"
name="name"
variant="outlined"
required
autoFocus
value={name}
onChange={nameInputChange}
/>
<TextField
type="text"
placeholder="Surname"
name="surname"
variant="outlined"
required
autoFocus
value={surname}
onChange={surnameInputChange}
/>
            <TextField
type="email"
placeholder="Email"
name="username"
variant="outlined"
required
autoFocus
value={email}
onChange={emailInputChange}
/>
<DatePicker
views={['year', 'month', 'day']}
label="Date of birth"
onChange={dobInputChange}
/>

<Button variant="contained" type="submit" disabled={isLoading}>
  Add Customer
</Button>

<Typography variant="div">{error}</Typography>
            </Stack>
    
        </form>
    )
}

export default AddCustomerForm;