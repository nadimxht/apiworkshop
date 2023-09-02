import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'


export default function Home({user , setAuth,auth}) {
    const [newTodo , setNewTodo]=useState({
        id:Date.now(),
        userId:user.id,
        
    })
    const [msg , setMsg]=useState('')
    const handleChange=(e)=>{
        setNewTodo(prev=>{return{...prev , [e.target.name]: e.target.value}})
    }
    const AddTodo=(e)=>{
        e.preventDefault();
        axios.post("http://localhost:3000/todos" , newTodo).then(res=>setMsg('todo added')).catch(err=>console.log(err))
    }
    const navigate=useNavigate();
    const [logout , setLogout]=useState(true);
    const [todos,setTodos]=useState([])
    useEffect(()=>{
        !auth ? navigate('/'):null; 
    },[logout]) ; 
    useEffect(
        ()=>{
            axios.get("http://localhost:3000/todos").then(res=>setTodos(res.data.filter(e=>e.userId===user.id))).catch(err=>console.log(err))
        },[msg]
    )

  return (
    <div>
        <h1>welcome {user.username} </h1>
       <br></br>
       <form>
        <input name="content" type="text" placeholder='add todo' onChange={(e)=>handleChange(e)}/>
        <button onClick={(ev)=>AddTodo(ev)}>Add todo</button>
        {msg}
       </form>
       <h2>Todo list : </h2>
       <div>
        {
            todos?.map(e=>(
                <p>{e.content}</p>
            ))
        }
        </div> 
        <button onClick={()=>{setLogout(prev=>!prev) ; setAuth(false)}}>Log out</button>
    </div>
  )
}
