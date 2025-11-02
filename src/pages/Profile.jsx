import React from 'react'
import axios from 'axios'
import { useContext } from 'react'
import { server } from '../main'
import usestate from 'react'
import { context } from '../main'
import Loader from '../components/Loader'
import '../styles/Profile.css'



const Profile = () => {
  const { user , isAuthenticated , loading  } = useContext(context);  // now we can see the benefit og context we can access aany where the data
  console.log(user)
  return (
  // <>
  // {loading ? (<Loader /> ) :
  // isAuthenticated ? <h1>Authenticated User Profile</h1> :
  
  // <h1 >Please Login to see your profile</h1>}
  //   <div >{user.name}</div>
  //  <div>{user.email}</div>
  // </>

  // Add a main container class
<div className="profile-container">
  {loading ? (
    <Loader />
  ) : isAuthenticated ? (
    // Add a class for the authenticated state
    <div className="user-profile">
      {/* A simple avatar using the user's initial */}
      <div className="profile-avatar">
        <span>{user.name ? user.name[0] : "U"}</span>
      </div>
      
      <h1 className="user-name">{user.name}</h1>
      <p className="user-email">{user.email}</p>
    </div>
  ) : (
    // Add a class for the unauthenticated state
    <div className="login-prompt">
      <h1>Please Login</h1>
      <p>You must be logged in to view your profile.</p>
    </div>
  )}
</div>
  )
}

export default Profile
