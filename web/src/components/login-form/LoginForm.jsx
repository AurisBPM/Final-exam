import {  Button, TextField, Stack, Typography, FormControl } from "@mui/material";
import "./LoginForm.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {

const [ email, setEmail ] = useState("");
const [ password, setPassword ] = useState("");
const [isLoading, setLoading] = useState(false);
const [error, setError] = useState("");

const [isEmailInvalid, setIsEmailInvalid] = useState(false);
const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);

const navigate = useNavigate();

const emailInputChange = (e) => {
    setEmail(e.target.value);
}
const passwordInputChange = (e) => {
    setPassword(e.target.value);
}

const submitLogin = async () => {
    setLoading(true);
    setError("");
   
    setIsEmailInvalid(false);
    setIsPasswordInvalid(false);    

    if ( !email ){
        setIsEmailInvalid(true);
    }

    if (!password) {
        setIsPasswordInvalid(true);      

    }

    if ( !password || !email ){
        setError("Please add all required information");
        setLoading(false);
        return;
    }

    const body = {
        email: email,
        password: password
    }

    try {
        const request = await axios.post("http://localhost:8080/login", body);
        console.log(request);
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
        <FormControl>
            <Stack spacing={2} alignItems="center">
                <Typography variant="h4">Events Management</Typography>
            <TextField
type="email"
label="Email"
name="email"
variant="outlined"
required
autoFocus
error={isEmailInvalid}
helperText={isEmailInvalid && "Email required"}
value={email}
onChange={emailInputChange}
sx={{
    width: 300
}}
/>
<TextField
type="password"
label="Password"
name="password"
variant="outlined"
required
value={password}
error={isPasswordInvalid}
helperText={isPasswordInvalid && "Password required"}
onChange={passwordInputChange}
sx={{
    width: 300
}}
/>
<Button variant="contained" disabled={isLoading} onClick={submitLogin}>
  Login
</Button>

<Typography variant="div">{error}</Typography>
            </Stack>
    
        </FormControl>
    )
}

export default LoginForm;