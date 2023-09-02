import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from"axios" ;

export default function Signup() {
    const [msg , setMsg]=useState('')
    const [newUser , setNewUser]=useState({
        id:Date.now(),
    })


    const handleChange=(event)=>{
        setNewUser((prev)=>{return {...prev , [event.target.name] : event.target.value}})
    }

    const handleSignup=(event)=>{
        event.preventDefault();
 axios
    .post("http://localhost:3000/users", newUser)
    .then((res) => setMsg("your account is valid")    )
    .catch((err) => console.log(err))

    }
  return (
    <div style={{display:"flex" , justifyContent:"center" , padding:"10rem"}}>
         <form style={{display:"flex" , flexDirection:"column" ,gap:"1rem"  }}>
            <input name="username" type="text" placeholder='username' onChange={(e)=>handleChange(e)} />
            <input name="email" type="email" placeholder='email' onChange={(e)=>handleChange(e)} />
            <input name="password" type="password" placeholder='password' onChange={(e)=>handleChange(e)}/>
            <button onClick={(e)=>handleSignup(e)}>Signup</button>
            <p>if you already have an account <Link to="/" >Signin</Link></p>

            <p style={{color:"green"}}>{msg}</p>
            
        </form>
    </div>
  )
}
