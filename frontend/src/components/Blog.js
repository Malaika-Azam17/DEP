import { Avatar, Card, Box, CardContent, CardHeader, CardMedia, IconButton, Typography } from '@mui/material'
import React from 'react'

import EditNoteIcon from '@mui/icons-material/EditNote';
import AutoDeleteIcon from '@mui/icons-material/AutoDelete';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Blog = ({ title, description, imageURL, userName, isUser, id }) => {
  const navigate = useNavigate();
  const handleEdit = (e) => {
  
    console.log("id" + id)
    navigate(`/myblogs/${id}`);


  }


  const deleteRequest = async () => {
    const res = await axios.delete(`http://localhost:5000/api/blog/${id}`).catch(error => console.log(error))
    const data = await res.data
    return data;
  }

  const handleDelete = () => {
    deleteRequest().then(() => navigate("/")).then(() => navigate("/blogs"))
  }

  console.log(title, isUser)

  const userInitial = userName ? userName.charAt(0).toUpperCase() : '';

  return (
    <div>
      <Card sx={{
        width: "50%",
        margin: "auto",
        marginTop: "2rem",
        padding: 2,
        boxShadow: "0px 0px 15px green",
        ':hover': {
          boxShadow: '0px 0px 30px green',
        }
      }}>

        {isUser && (
          <Box display="flex" >
            <IconButton
              onClick={handleEdit}
              sx={{ marginLeft: "auto", color: "green" }}>
              <EditNoteIcon></EditNoteIcon>
            </IconButton>
            <IconButton
              onClick={handleDelete}
              sx={{ color: "green" }}>
              <AutoDeleteIcon></AutoDeleteIcon>
            </IconButton>
          </Box>
        )}
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "green" }} aria-label="recipe">
              {userInitial}
            </Avatar>
          }

          title={title}
          titleTypographyProps={{
            style: { color: 'green', fontWeight: 'bold', fontSize: '20px' } // Customize color and other styles here
          }}
        />
        <CardMedia
          component="img"
          height="190"
          image={imageURL}
          alt="dish"
        />
        <CardContent>
          <Typography variant="body2" color="green">
            {description}
          </Typography>
        </CardContent>
      </Card>

    </div>
  )
}

export default Blog
