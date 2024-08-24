import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import axios from "axios";
import { useDispatch } from 'react-redux';
import { authActions } from '../store';
import { useNavigate } from 'react-router-dom';
const Auth = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isSignUp, setIsSignUp] = useState(false)

    const [inputs, setInputs] = useState({
        name: "",
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const sendRequest = async (type = "login") => {
        const res = await axios.post(`http://localhost:5000/api/user/${type}`, {
            name: inputs.name,
            email: inputs.email,
            password: inputs.password
        }).catch(error => console.log(error))

        const data = await res.data;
        console.log(data);
        return data;
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(inputs)

        if (isSignUp) {
            sendRequest("signup").then((data) => localStorage.setItem("userId", data.user._id)).then(() => dispatch(authActions.login())).then(() => navigate("/blogs")).then(data => console.log(data))
        }
        else {
            sendRequest().then((data) => localStorage.setItem("userId", data.user._id)).then(() => dispatch(authActions.login())).then(() => navigate("/blogs")).then(data => console.log(data))
        }
    }
    
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Box
                    maxWidth={400}
                    bgcolor="white" display="flex" flexDirection={"column"} alignItems="center" justifyContent="center"
                    boxShadow={"0px 0px 20px green"}
                    margin={"auto"}
                    marginTop={7}
                    padding={1}

                    paddingBottom={3}
                    borderRadius={2}
                    marginBottom={3}
                >
                    <Typography
                        variant='h4'
                        padding={2}
                        textAlign={'center'}
                        color={"green"}
                        fontWeight={700}

                    >
                        {isSignUp ? "SignUp" : "Login"}
                    </Typography>
                    {isSignUp && <TextField
                        value={inputs.name}
                        name='name'
                        onChange={handleChange}
                        type='text'
                        placeholder="Name"
                        margin={"normal"}>
                    </TextField>}
                    <TextField
                        name='email'
                        onChange={handleChange}
                        value={inputs.email}
                        type='email'
                        placeholder="Email"
                        margin={"normal"}>

                    </TextField>
                    <TextField
                        name='password'
                        onChange={handleChange}
                        value={inputs.password}
                        type='password'
                        placeholder="Password"

                        margin={"normal"}>

                    </TextField>
                    <Button type="submit" variant='contained' sx={{ backgroundColor: "green", color: "white", margin: 1, padding: "0.4rem 2rem", borderRadius: 5 }}>Submit</Button>
                    <Button onClick={() => setIsSignUp(!isSignUp)} variant='contained' sx={{ backgroundColor: "green", color: "white", margin: 1, padding: "0.4rem 2rem", borderRadius: 5, }}>{isSignUp ? "Login" : "SignUp"}</Button>
                </Box>
            </form>
        </div>
    )
}
export default Auth
