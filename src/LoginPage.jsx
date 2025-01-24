import React from 'react'
import { useNavigate,Link } from 'react-router-dom'
import { useState } from 'react'

const LoginPage = () => {
    const navigate=useNavigate()
 
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState("")
    const [emailMessage,setEmailMessage]=useState("")
    const [passwordMessage,setPasswordMessage]=useState("")

    const styledLinkElement={
        textDecoration:"none",
        color:"#A6EBF1",
    }
    
 

    const existsEmailAndPassword=async()=>{
        const url="https://backend-expense-tracker-two.vercel.app"
        const options={
            method:"GET",
            headers:{
               "Content-Type":"application/json"
            }
        }
        const finalURL=`${url}?email=${email}&password=${password}`
        try{
            const response=await fetch(finalURL,options) 
            if(response.ok){
               return true
            }else{
                throw new Error("Invalid email and password")
            }
        }catch(error){
            return error.message
        }
    
    }

    function isValid() {
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return pattern.test(email);
    }
    
    const isEmail=()=>{
        const valid=isValid()
        if(!email){
           setEmailMessage("Email cannot be empty")
           return false;
        }
        if(valid){
           return true
        }else{
            setEmailMessage("Invalid email")
            return false;
        }
         
        }

    const validateUser=async()=>{  
      const isPassword=()=>{
      if(password){
        if(password.length>=6){
            return true
        }else{
            setPasswordMessage("Password must have 6 length")
            return false
        } 
      }else{
        setPasswordMessage("Password cannot be empty")
        return false
      }
      
    }
    
    if(isEmail() && isPassword()){
        const result=await existsEmailAndPassword()
        if(result){
            navigate("/home-page",{state:{email}})
        }
     
    }

    }

    const navigateToForgetPassword=()=>{
        if(isEmail()){
            navigate("/forget-password",{state:{email}})
        }  
    }
   
    const onEmailChange=(e)=>{
        e.preventDefault()
        setEmail(e.target.value)
        setEmailMessage('')
    }
    
    const onPasswordChange=(e)=>{
        e.preventDefault()
        setPassword(e.target.value)
        setPasswordMessage('')
    }

  return (
    <>
    <div className='body-login'>
     <section className="login-page">
        <header id="header-login">Login</header>
        <form id="email validation">
        <label htmlFor="input-email">Email</label>
        <input type="email" 
        name="email" 
        id="input-email"
        required
        placeholder='Enter your email'
        value={email}
        onChange={onEmailChange}/>
        <div className='email-message'>{emailMessage}</div>
        <label htmlFor="input-password">Password</label>
        <input type="password" 
        name="password" 
        id="input-password"
        required
        placeholder='Enter password'
        value={password}
        onChange={onPasswordChange}/>
                <Link style={{
                     textDecoration:"none",
                     fontSize:"12px",
                     color:"#A6EBF1",
                }} to="/forget-password" onClick={navigateToForgetPassword}>forget password</Link>
        <div className="password-message">{passwordMessage}</div>
        <button type="button" className="login-btn" onClick={validateUser}>Login
        </button>
        </form>

        <div id="optional-login">
            I have no account?<Link style={styledLinkElement} to="/create-user">create account</Link>
        </div>
      </section>
      </div>
    </>
  )
}

export default LoginPage