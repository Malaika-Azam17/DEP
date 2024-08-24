import React, { useEffect, useState } from 'react'
import axios from "axios";
import Blog from "./Blog";
const UserBlog = () => {
  const [user, setUser] = useState()
  const id = localStorage.getItem("userId");
  const sendRequest = async () => {

    console.log("id in user blogs is:" + id)
    const res = await axios.get(`http://localhost:5000/api/blog/user/${id}`).catch(error => console.log(error))
    const data = await res.data
    return data
  }

  useEffect(() => {
    sendRequest().then((data) => setUser(data.user))
  }, [])

  console.log(user)
  return (
    <div>
      {user && user.blogs.map((blog, index) => (
        <Blog key={index}
          id={blog._id}
          isUser={true}
          title={blog.title} description={blog.description} imageURL={blog.image} userName={user.name} />
      ))}
    </div>
  )
}

export default UserBlog
