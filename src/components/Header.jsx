import React from 'react'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { context } from '../main'
import { server } from '../main'
import axios from 'axios'
import toast from 'react-hot-toast'
import '../styles/Header.css'

const Header = () => {
  const { isAuthenticated, setisAuthenticated , loading , setloading } = useContext(context) // we can access the context value here
    // const{loading,setloading} = useContext(context)

  const logoutHandler = async () => {
  setloading(true); 
    // CHANGED: Use window.confirm() for a simple OK/Cancel dialog
    const isConfirm = window.confirm("Are you sure you want to logout?");

    // CHANGED: Check the boolean 'isConfirm'
    if (isConfirm) {
      try {
        const { data } = await axios.get(`${server}/users/logout`, {
          withCredentials: true
        })

        toast.success("logout successfully")
        setisAuthenticated(false);
        setloading(false);

      } catch (error) {
        if (error.response) {
          console.error("Server Error:", error.response.data.message);
          toast.error(error.response.data.message);
        } else if (error.request) {
          console.error("Network Error:", error.message);
          toast.error("Network error: Could not reach server.");
        } else {
          console.error("Error:", error.message);
          toast.error(error.message);
            setisAuthenticated(true);

           setloading(false);

        }
        
        // BUG FIX: Removed 'setisAuthenticated(true)' from here.
        // If logout fails, the user is STILL authenticated.
        // The state is already 'true', so we don't need to do anything.

      }
    } else {
      // This 'else' block now runs only if the user clicks "Cancel"
      toast.error("Logout cancelled.");
    }
  }

  return (
    <nav className='header'>
      <div >
        <h2>TODO </h2>
      </div>
      <article>
        <Link to={"/"}>Home</Link>
        <Link to={"Profile"}>Profile</Link>

        {isAuthenticated ? (
          <button disabled={loading} onClick={logoutHandler} className='btn'> Logout </button>
        ) : (
          <Link to={"/Login"} className='btn'> Login </Link>
        )}

      </article>
    </nav>
  )
}

export default Header