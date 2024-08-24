import { InputLabel, TextField, Typography, Box, Button, TextareaAutosize } from '@mui/material'
import React, { useState } from 'react'
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom'
const labelStyle = { marginBottom: 1, fontSize: 21, color: "green", fontWeight: 600 }

const buttonStyle = {
  width: "20%", backgroundColor: "green", alignSelf: "center", color: "white", fontSize: "17px", borderRadius: "24px", fontWeight: "600", ':hover': {
    bgcolor: "lightgreen",
    color: "green",
    border: "2px solid green"
  }, marginTop: 2
}

const AddBlog = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    imageURL: ""
  })

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }
  const sendRequest = async () => {

    const res = await axios.post("http://localhost:5000/api/blog/add", {
      title: inputs.title,
      description: inputs.description,
      image: inputs.imageURL,
      user: localStorage.getItem("userId")
    }).catch(error => console.log(error));
    const data = await res.data;
    return data;

  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(inputs)
    sendRequest().then(data => console.log(data)).then((navigate("/blogs")));
  }

  return (
    <div >
      <form onSubmit={handleSubmit}>
        <Box border={3}
          borderColor={"green"}
          boxShadow={"0px 0px 15px green"}
          borderRadius={3}
          padding={3}
          margin={"auto"}
          display={"flex"}
          flexDirection={"column"}
          width={"70vw"}
          marginTop={6}
          marginBottom={6}

          sx={{
            ':hover': {
              boxShadow: "0px 0px 30px green"
            },

          }}
        >
          <Typography variant='h4' color={"green"} fontWeight={700} textAlign={"center"}>ADD YOUR BLOGS</Typography>

          <InputLabel sx={labelStyle}>Title</InputLabel>

          <TextField name="title" onChange={handleChange} value={inputs.title} margin='normal' variant='outlined'></TextField>

          <InputLabel sx={labelStyle}>Description</InputLabel>

          <TextareaAutosize name="description" onChange={handleChange} value={inputs.description} minRows={2}
            maxRows={6}

            style={{ width: '100%', resize: 'vertical', fontSize: '21px', }}></TextareaAutosize>

          <InputLabel sx={labelStyle}>ImageURL</InputLabel>

          <TextField name="imageURL" onChange={handleChange} value={inputs.imageURL} margin='normal' variant='outlined'></TextField>

          <Button variant='contained' sx={buttonStyle} type='submit'>Submit</Button>

        </Box>
      </form>
    </div>
  )
}

export default AddBlog
