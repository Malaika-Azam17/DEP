import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import { InputLabel, TextField, Typography, Box, Button, TextareaAutosize } from '@mui/material'
const labelStyle = { marginBottom: 1, fontSize: 21, color: "green", fontWeight: 600 }

const buttonStyle = {
  width: "20%", backgroundColor: "green", alignSelf: "center", color: "white", fontSize: "17px", borderRadius: "24px", fontWeight: "600", ':hover': {
    bgcolor: "lightgreen",
    color: "green",
    border: "2px solid green"
  }, marginTop: 2
}

const BlogDetail = () => {


  const navigate = useNavigate();

  const [blog, setBlog] = useState()
  const id = useParams().id;
  console.log(id)
  const [inputs, setInputs] = useState({

  })

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const fetchDetails = async () => {
    const res = await axios.get(`http://localhost:5000/api/blog/${id}`).catch(error => console.log(error))
    const data = await res.data;
    return data;
  }

  useEffect(() => {
    fetchDetails().then((data) => {
      setBlog(data.blog)
      setInputs({
        title: data.blog.title,
        description: data.blog.description,
      })
    });
  }, [id])

  const sendRequest = async () => {
    const res = await axios.put(`http://localhost:5000/api/blog/update/${id}`, {
      title: inputs.title,
      description: inputs.description,
      user: localStorage.getItem("userId")
    }).catch(error => console.log(error));
    const data = await res.data;
    return data;
  }

  console.log(blog)

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(inputs)
    sendRequest().then(data => console.log(data)).then(() => navigate("/myblogs/"))
  }

  return (
    <div>
      {inputs &&
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
            <Typography variant='h4' color={"green"} fontWeight={700} textAlign={"center"}>Edit YOUR BLOGS</Typography>

            <InputLabel sx={labelStyle}>Title</InputLabel>

            <TextField name="title" onChange={handleChange} value={inputs.title} margin='normal' variant='outlined'></TextField>

            <InputLabel sx={labelStyle}>Description</InputLabel>

            <TextareaAutosize name="description" onChange={handleChange} value={inputs.description} minRows={2}
              maxRows={6}

              style={{ width: '100%', resize: 'vertical', fontSize: '21px', }}></TextareaAutosize>
              
            <Button variant='contained' sx={buttonStyle} type='submit'>Submit</Button>
          </Box>
        </form>}
    </div>
  )
}

export default BlogDetail

