import {  Button, TextField, Stack, Typography } from "@mui/material";
import "./LoginForm.css";
import { useState } from "react";

const LoginForm = () => {

const [ email, setEmail ] = useState("");
const [ password, setPassword ] = useState("");

const emailInputChange = (e) => {
    setEmail(e.target.value);
}
const passwordInputChange = (e) => {
    setPassword(e.target.value);
}

    return (
        <form className="loginForm">
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
<Button variant="contained" type="submit">
  Login
</Button>
            </Stack>
    
        </form>
    )
}

export default LoginForm;