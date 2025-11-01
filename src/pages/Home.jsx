import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { server } from '../main'
import toast from 'react-hot-toast'
import { useEffect } from 'react'
import Task from '../components/Task'
import '../styles/home.css'

const Home = () => {

  const [todo, settodo] = useState("")
  const [description, setdescription] = useState("")
  const [loading, setloading] = useState(false) // because context loading is for user 
const [task, settask] = useState([])
const [refresh, setrefresh] = useState(false)


const updateHandler = async(id) => {
  try{
   const {data} = await axios.put(`${server}/tasks/${id}`, {}, {
    withCredentials: true,
   })
   toast.success(data.message);
    setrefresh((prev) =>!prev);
  }catch(error){
    toast.error(error.response.data.message);
  }

}
const deleteHandler = async(id) => {
  try{
   const {data} = await axios.delete(`${server}/tasks/${id}`, {
      withCredentials: true,
    })
    toast.success(data.message);
    setrefresh((prev) =>!prev);
  }catch(error){
    toast.error(error.response.data.message);
  }

}
  const submittodo = async(e) =>{
    e.preventDefault();   //You stop the form from submitting and reloading the page.
    try{
      setloading(true)
      const {data}  = await axios.post(`${server}/tasks/new` , {
        todo,
        description
      }, {
        withCredentials: true,
        headers :{
          "Content-Type" : "application/json"
        }
      } )
      toast.success(data.message);
      setloading(false)
      settodo("");
      setdescription("");
      setrefresh((prev) =>!prev);
    }catch(error){
      toast.error(error.response.data.message);
      setloading(false)
  }

};

// for rendering data we use useEffect 
useEffect(() => {
 axios.get(`${server}/tasks/alltasks`, {
   withCredentials: true,
 })
 .then((response) => {
  console.log("API RESPONSE DATA:", response.data);
   settask(response.data.alltasks);
 })
 .catch((error) => {
   toast.error(error.response.data.message);
 });
}, [refresh])

  return (
<>
<div className='container'>


  <div className='login'>

  <section className="todosContainer">
 <form  onSubmit={submittodo} >
          <input value={todo}  onChange={(e) => settodo(e.target.value)} type="text" placeholder='enter your task'  />
         <input value={description}  onChange={(e) => setdescription(e.target.value)} type="text" placeholder='description'  />
        <button disabled={loading} type='submit'> Add task</button>

        {
          task.map((item) => (
          <Task todo={item.todo} description={item.description}  iscompleted={item.iscompleted} updateHandler={ updateHandler} deleteHandler={ deleteHandler} id={item._id} key={item._id}/>
          ))
        }
       

        </form>

  </section>

  </div>
</div>
</>
  )
}
 

export default Home
