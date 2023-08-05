import {  Button, TextField, Stack, Typography } from "@mui/material";
import "./LoginForm.css";
import { useState } from "react";
import axios from "axios";

const LoginForm = () => {

const [ email, setEmail ] = useState("");
const [ password, setPassword ] = useState("");
const [isLoading, setLoading] = useState(false);
const [error, setError] = useState("");

const emailInputChange = (e) => {
    setEmail(e.target.value);
}
const passwordInputChange = (e) => {
    setPassword(e.target.value);
}

const submitLogin = async (event) => {
    setLoading(true);
    setError("");
    event.preventDefault();

    const body = {
        email: email,
        password: password
    }

    try {
        const request = await axios.post("http://localhost:8080/login", body);
        console.log(request);
        
        
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
        <form className="loginForm" onSubmit={submitLogin}>
            <Stack spacing={2}>
                <Typography variant="h3">LOGIN</Typography>
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
<TextField
type="password"
placeholder="Password"
name="password"
variant="outlined"
required
autoFocus
value={password}
onChange={passwordInputChange}
/>
<Button variant="contained" type="submit" disabled={isLoading}>
  Login
</Button>
<Typography variant="div">{error}</Typography>
            </Stack>
    
        </form>
    )
}

export default LoginForm;