
import React from 'react'
import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import axios from "axios"
import { server } from '../main'
import toast from 'react-hot-toast'
import { useContext } from 'react'
import { context } from '../main'
import '../styles/login.css'





 

const Login = () => {


  
const [email, setemail] = useState("")
const [password, setpassword] = useState("")
const {isAuthenticated,setisAuthenticated} = useContext(context)


const submitHandler = async (e) =>{
     e.preventDefault();
     console.log(email ,password)

    try{
 const { data } = await axios.post(`${server}/users/login` , {      // data is destructure
      email,
      password 
} , { 
  headers:{
    "Content-Type" : "application/json"
  },
  withCredentials: true
})

toast.success(data.message)

setisAuthenticated(true);
    }catch (error) {
  if (error.response) {
    // The server responded with an error (e.g., "User already exists")
    console.error("Server Error:", error.response.data.message);
    toast.error(error.response.data.message);
  } else if (error.request) {
    // The request was made but no response was received (net::ERR_FAILED)
    console.error("Network Error:", error.message);
    toast.error("Network error: Could not reach server.");
  } else {
    // Something else went wrong
    console.error("Error:", error.message);
    toast.error(error.message);
  }
  setisAuthenticated(false);
    }
  };

//  if(isAuthenticated) return <Navigate to={"/"} />

  return (
  
<div className="login-page-container">
  <div className="login">
    <section>
      <form onSubmit={submitHandler}>
        {/* I added a heading */}
        <h2>Welcome Back</h2>
        
        <input
          value={email}
          onChange={(e) => setemail(e.target.value)}
          type="email"
          placeholder="Enter your email"
          required
        />
        <input
          value={password}
          onChange={(e) => setpassword(e.target.value)}
          type="password"
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
        
        <h4>Or</h4>
        
        <Link to="/Register">Create an Account</Link>
      </form>
    </section>
  </div>
</div>
  )
}

export default Login
