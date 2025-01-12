import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'

const ForgetPassword = () => {
   const location=useLocation()
   const email=location.state.email
  
   const [password,setPassword]=useState("")
   const [confirmPassword,setConfirmPassword]=useState("")
   const [passwordMessage,setPasswordMessage]=useState("")
   const [confirmPasswordMessage,setConfirmPasswordMessage]=('')

   const updatePassword=async()=>{
     const url=""
     const details={
        email:email,
        password:password,
     }
     const options={
        method:"put",
        body:JSON.stringify(details),
        headers:{
            "Content-Type":"Application/json"
        }
     }
     try{
        const response=await fetch(url,options)
        return true
     }catch(error){
        console.error(error.message)
        return error.message
     }
   
    
   }

   const validateUser=()=>{
        const isPassword=()=>{
            const comparePassword=(password==confirmPassword)
            if(password){
              if(password.length>=6){
                if(confirmPassword){
                    if(comparePassword){
                     return true
                    }else{
                    setPasswordMessage("Password does not match")
                    return false
                    }
                }else{
                   setConfirmPasswordMessage("Confirm password cannot be empty")
                    return false
                }
              }else{
                 setPasswordMessage("Must have 6 characters")
              }
            }else{
              setPasswordMessage("Password cannot be empty")
              return false
            }
            
          }

if(isPassword()){
    const checkPassword=updatePassword()
    if(checkPassword){
        navigate("/home-page",{state:{email}})
    }else{
        alert(error.message)
    }
   
    
}

}




  return (
        <>
        <section className="forget-password-page">
        <header>Login</header>
        <form id="email validation">
        <label htmlFor="input-email">Email</label>
        <input type="email" 
        name="email" 
        id="input-email"
         value={emailValue}
         readOnly/>
        <label htmlFor="input-password">Password</label>
        <input type="password" 
        name="password" 
        id="input-password"
        required
        placeholder='Enter password'
        value={password}
        onChange={(e)=>setPassword(e.target.value)}/>
        <div className="password-message">{passwordMessage}</div>
        <label htmlFor="input-password">Confirm Password</label>
        <input type="password" 
        name="confirmPassword" 
        id="input-confirm-password"
        required
        placeholder='Enter Confirm password'
        value={confirmPassword}
        onChange={(e)=>setConfirmPassword(e.target.value)}/>
        <div className="confirm-password-message">{confirmPasswordMessage}</div>
        <button type="button" class="login-btn" onClick={validateUser}>Login
        </button>
        </form>
        <div>
            I have no account?<Link to="/create-user">create account</Link>
        </div>
      </section>
        </>
  )
}

export default ForgetPassword