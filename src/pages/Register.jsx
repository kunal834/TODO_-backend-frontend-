import React from 'react'
import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import axios from "axios"
import { server } from '../main'
import toast from 'react-hot-toast'
import { useContext } from 'react'
import { context } from '../main'
import '../styles/login.css'



const Register = () => {
const [name, setname] = useState("")
const [email, setemail] = useState("")
const [password, setpassword] = useState("")

  const {isAuthenticated,setisAuthenticated} = useContext(context)
  const{loading,setloading} = useContext(context)
   
const submitHandler = async (e) =>{
  setloading(true);
     e.preventDefault();
     console.log(name , email ,password)
   
    try{
 const { data } = await axios.post(`${server}/users/register` , {      // data is destructure
      name ,
      email,
      password 
} , {
  headers:{
    "Content-Type" : "application/json"
  },
  withCredentials: true
})

toast.success(data.message)
console.log(data.message);
setisAuthenticated(true);
  setloading(false);
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
  setloading(false);
    }
  };

//  if(isAuthenticated) return <Navigate to={"/"} />

  return (
    <div className="login-page-container">
    <div className='login'>
      <section>
        <form onSubmit={submitHandler}>
         <input value={name}  onChange={(e) => setname(e.target.value)}type="text" placeholder='enter your name'  required/>
         <input value={email}  onChange={(e) => setemail(e.target.value)} type="email" placeholder='enter your email'  required/>
         <input value={password}  onChange={(e) => setpassword(e.target.value)} type="password" placeholder='password'  required />
        <button disabled={loading} type='submit'> Register </button>
        <h4>Or Already have an acount</h4>
        <Link to="/Login">Log In</Link>

        </form>
      </section>
    </div>
    </div>
  )
}

export default Register
