import axios from 'axios'
import React,{useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

export default function Login({setUserAuth,setAuth}) {
    const [userInfo , setUserInfo]=useState({
        id:Date.now(),
    })
    const [users , setUsers]=useState([])
    const [msg,setMsg]=useState('')
    const navigate=useNavigate()

    const handleChange=(event)=>{
        setUserInfo((prev)=>{return {...prev , [event.target.name] : event.target.value}})
    }
    const getUsers=()=>{
        axios.get("http://localhost:3000/users").then((res)=>setUsers(res.data)).catch(err=>console.log(err))
    }

    const handleLogin=(event)=>{
        event.preventDefault();
        let user=users.find(e=>e.email===userInfo.email&&e.password===userInfo.password ) ;
        if(user){
            setAuth(true) ;
            setUserAuth(user)
            navigate('/Home')  
        }else{
            setMsg("User not found")
        }
    }

    useEffect(()=>{
        
        getUsers()
    },[])
  return (
    <div style={{display:"flex" , justifyContent:"center" , padding:"10rem"}}>
        {console.log(users)}
         <form style={{display:"flex" , flexDirection:"column" ,gap:"1rem"  }}>
            <input name="email" type="email" placeholder='email' onChange={(e)=>handleChange(e)} />
            <input name="password" type="password" placeholder='password' onChange={(e)=>handleChange(e)}/>
            <button onClick={(e)=>handleLogin(e)}>Login</button>
            <p>if you don't have an account <Link to="/signup" >Signup</Link></p>
            <p style={{color:"red"}}>{msg}</p>
        </form>
    </div>
  )
}
