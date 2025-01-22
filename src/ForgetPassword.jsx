import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'

const ForgetPassword = () => {
   const location=useLocation()
   const email=location.state.email
  
   const [password,setPassword]=useState("")
   const [confirmPassword,setConfirmPassword]=useState("")
   const [passwordMessage,setPasswordMessage]=useState("")
   const [confirmPasswordMessage,setConfirmPasswordMessage]=('')

   const updatePassword=async()=>{
     const url="https://backend-expense-tracker-two.vercel.app"
     const details={
        email:email,
        password:password,
     }
     const options={
        method:"put",
        body:JSON.stringify(details),
        headers:{
            "Content-Type":"application/json"
        }
     }
     try{
        const response=await fetch(url,options)
        if(response.ok){
          return true
        }
     
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
   
const styledLinkElement={
  textDecoration:"none",
  color:"#A6EBF1",
}




  return (
        <>
        <div className="body-forget">
        <section className="forget-password-page">
        <header id="header-forget">Forget Password</header>
        <form id="email validation">
        <label htmlFor="input-email">Email</label>
        <input type="email" 
        name="email" 
        id="input-email"
         value={email}
         readOnly/>
        <label htmlFor="input-password">New Password</label>
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
        <button type="button" className="login-btn" onClick={validateUser}>Login
        </button>
        </form>
        <div id='optional-forget'>
            I have no account?<Link style={styledLinkElement} to="/create-user">create account</Link>
        </div>
      </section>
      </div>
        </>
  )
}

export default ForgetPassword