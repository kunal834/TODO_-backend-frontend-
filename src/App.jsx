// import "./styles/app.scss"
import { BrowserRouter as Router , Route , Routes, data} from "react-router-dom"
import Home from "./pages/Home"
import Header from "./components/Header"
import Profile from "./pages/Profile"
import Login from "./pages/Login"
import Register from "./pages/Register"
import { Toaster } from "react-hot-toast"
import { useEffect } from "react"
import axios from "axios"
import { useContext } from "react"
import { context , server } from "./main"


function App() {

const { user, setisAuthenticated, setuser , setloading } = useContext(context);

useEffect(() => {
    
  axios.get(`${server}/users/me`, {
    withCredentials: true,
  }).then(res => {setuser(res.data.user); setisAuthenticated(true)} ,setloading(false)).catch((error)=> setuser({}) ,setisAuthenticated(false) , setloading(false) );
}, [])
 

  return <Router>
  <Header />

 <Routes>

  <Route path="/" element={<Home />}> </Route>
  <Route path="/Login" element={<Login/>}> </Route>
  <Route path="/Profile" element={<Profile />}> </Route>
  <Route path="/Register" element={<Register />}> </Route>
 

   </Routes>
     
       <Toaster />

  </Router>

  
   
  
}

export default App
