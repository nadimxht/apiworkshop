import React, { useEffect, useState } from 'react'
import { Routes ,Route } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'

export default function App() {
  const [auth , setAuth] =useState(false);
  const [userAuth,setUserAuth] = useState({});
 
  return (
    <div>
      
      <Routes>
        <Route path="/" element={<Login setUserAuth={setUserAuth} setAuth={setAuth} />} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/Home" element={<Home user={userAuth} setAuth={setAuth} auth={auth}/>}/>
      </Routes>
    </div>
  )
}
