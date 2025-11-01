import React from 'react'

const Task = ({todo , description , iscompleted , updateHandler , deleteHandler ,id }) => {
  return (

    <>
      <div className="todo">
        <div>
        <h4>{todo}</h4>
        <p>{description}</p>
        </div>

        <input onChange={() => updateHandler(id)} type="checkbox" checked={iscompleted} />
        <button onClick={() => deleteHandler(id)} className='btn'>  Delete</button>
    </div>
    
    </>
  
   
  )
}

export default Task
