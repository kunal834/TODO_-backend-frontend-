import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { useState } from 'react'
import App from './App.jsx'

import { Toaster } from 'react-hot-toast'
import { createContext } from 'react'

export const server = "https://nodejs-backend-todo-kna1.onrender.com/api/v1"

export const context = createContext({ isAuthenticated: false })  // context creation we use so that a component can be use to the whole app

const AppWrapper = () =>{
   const[loading , setloading] = useState(false)
  const [isAuthenticated, setisAuthenticated] = useState(false);
  const [user, setuser] = useState({});

  return (
 <context.Provider value={{ isAuthenticated, setisAuthenticated ,loading , setloading ,user , setuser}} > 
<Toaster />
    <App />

  </context.Provider>
  )
}   // now we can access it from all over the app

createRoot(document.getElementById('root')).render(

  <StrictMode>
    <AppWrapper />
  </StrictMode>,
)
