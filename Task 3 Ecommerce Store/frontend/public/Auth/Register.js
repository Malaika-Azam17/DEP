import React, { useState } from 'react'
import Layout from "./../../components/layout/layout.js"
import axios from "axios"
import { useNavigate } from 'react-router-dom'
const Register = () => {


    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [phone,setPhone]=useState("")

    const [address,setAddress]=useState("")
    const [answer,setAnswer]=useState("")

    const navigate=useNavigate()

    const handleSubmit=async(e)=>{
        e.preventDefault()
        try{
            const res=await axios.post('/api/v1/auth/register',{name,email,password,phone,address,answer})

            if(res.data.success){
                alert(res.data.message)
                navigate("/login")
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
            <div className='register form-container'>
               
                <form onSubmit={handleSubmit}>
                <h1>Register</h1>
                    <div className="mb-3 ">
                        <input type="text" value={name} 
                           onChange={(e)=>setName(e.target.value)}
                        className="form-control" id="exampleInputEmail1" placeholder='Name' required/>
                        
                    </div>
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
                    <div className="mb-3">
                        <input type="Number" value={phone} 
                           onChange={(e)=>setPhone(e.target.value)}
                        className="form-control" id="exampleInputEmail1" placeholder='Phone No' required/>
                        
                    </div>
                    <div className="mb-3">
                  
                        <input type="text" value={address} 
                        onChange={(e)=>setAddress(e.target.value)}
                        className="form-control" id="exampleInputEmail1" placeholder='Address' required/>
                        
                    </div>
                    <div className="mb-3">
                  
                  <input type="text" value={answer} 
                  onChange={(e)=>setAnswer(e.target.value)}
                  className="form-control" id="exampleInputEmail1" placeholder='Enter Your favorite Sport Name' required/>
                  
              </div>

                    <button type="submit" className="btn">Submit</button>
                </form>

            </div>
        </Layout>
    )
}

export default Register