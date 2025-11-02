// import "./styles/app.scss"
import { BrowserRouter as Router , Route , Routes, data} from "react-router-dom"
import Home from "./pages/Home.jsx"
import Header from "./components/Header.jsx"
import Profile from "./pages/Profile.jsx"
import Login from "./pages/Login.jsx"
import Register from "./pages/Register.jsx"
import { Toaster } from "react-hot-toast"
import { useEffect } from "react"
import axios from "axios"
import { useContext } from "react"
import { context , server } from "./main"


function App() {

const { user, setisAuthenticated, setuser , setloading } = useContext(context);

// useEffect(() => {
    
//   axios.get(`${server}/users/me`, {
//     withCredentials: true,
//   }).then(res => {setuser(res.data.user); setisAuthenticated(true)} ,setloading(false)).catch((error)=> {
//     setuser({}) ;
//      setisAuthenticated(false) ;
//      setloading(false) ; 
//      console.log(error)} );
// }, [])
 
useEffect(() => {
    setloading(true); // Start loading here
    
    axios.get(`${server}/users/me`, {
        withCredentials: true,
    })
    .then(res => {
        setuser(res.data.user);
        setisAuthenticated(true);
    })
    .catch((error) => {
        // This block runs if the API call fails
        setuser({});
        setisAuthenticated(false);
        console.log(error); // Good to log the error
    })
    .finally(() => {
        // This block runs *after* .then() or .catch()
        setloading(false); 
    });
}, []); // Empty dependency array is correct

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
