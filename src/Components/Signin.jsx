import React, { useState } from 'react'
import "./Signin.css"
import { Link, useNavigate } from 'react-router-dom'

const Signin = () => {



  //username state
  const[username,setUsername]=useState("")

  //email state
  const[password,setPassword]= useState("")

  //Navigation to home page
   let navigate = useNavigate()

   //function to homenavigate(login)
  const NavigateHome =()=>{
    navigate("/")
  }  


  return (
    <section className='signin-box'>
     
      <div className='input-filed'>
         <h1>Login</h1>
        <input type='text' value={username} placeholder='Username' onChange={(event)=>{setUsername(event.target.value)}} required/>
        <input type='password' value={password} placeholder='Password' onChange={(event)=>{setPassword(event.target.value)}} required/>

        <button className='signin-btn' onClick={NavigateHome}>Login</button>

        <div className='other-sigin'>
          <Link to="/forgetPassword"> <p className='forget-password'>Forget password?</p> </Link>
          <Link to="/register" ><p> or Signup</p></Link>
        </div>
        
      </div>

    

    </section>
  )
}

export default Signin