import React, { useState } from 'react'
import Layout from '../../components/layout/layout.js'
import axios from "axios"
import { useNavigate,useLocation } from 'react-router-dom'
import { useAuth } from '../../context/auth.js'

const Login = () => {


    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [auth,setAuth]=useAuth()

    const navigate=useNavigate()
    const location=useLocation();
    const handleSubmit=async(e)=>{
        e.preventDefault()
        try{
            const res=await axios.post('/api/v1/auth/login',{email,password})

            if(res.data.success){
                alert(res.data.message)
                setAuth({
                    ...auth,
                    user:res.data.user,
                    token:res.data.token
                })
                localStorage.setItem('auth',JSON.stringify(res.data))
                navigate(location.state||"/")
            }
            else{
                alert(res.data.message)
            }
        }
        catch(error)
        {
            console.log(error)
            alert("something went wrong")
        }
    }


  return (
    <Layout>
        <div className='register login form-container'>
               
               <form onSubmit={handleSubmit}>
               <h1>Login</h1>
                  
                   <div className="mb-3">
                       <input type="email" value={email} 
                          onChange={(e)=>setEmail(e.target.value)}
                       className="form-control" id="exampleInputEmail1" placeholder='Email'
                       required
                       />
                       
                   </div>
                   <div className="mb-3">
                       <input type="password" value={password}
                          onChange={(e)=>setPassword(e.target.value)}
                       className="form-control" id="exampleInputPassword1" placeholder='Password' required/>
                   </div>
                  
                   <button type="submit" className="btn">Login</button>
                   <div className='mb-3'>
                   <button type="submit" className="btn" onClick={()=>{navigate('/forgot-password')}}>Forgot Password</button>
                   </div>
               </form>

           </div>
    </Layout>
  )
}

export default Login