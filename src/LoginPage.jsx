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
            method:"get",
            headers:{
               "Content-Type":"application/json"
            }
        }
        const finalURL=`${url}?email=${email}&password=${password}`
        try{
            const response=await fetch(finalURL,options) 
            const result=await response.json()
            return result
        }catch(error){
            return error.message
        }
    
    }

    const isEmail=()=>{
        if(!email.innerText){
           setEmailMessage("Email cannot be empty")
            return false
        }
        const checkEmail=existsEmail()
        if(checkEmail){
            return true
        }else{
              setEmailMessage(checkEmail)
              return false
        }
    }

    const validateUser=()=>{  
      const isPassword=()=>{
      if(password){
        const checkPassword=existsEmailAndPassword()
        if(checkPassword.ok){
            return true
        }else{
            alert(checkPassword.message)
        } 
      }else{
        setPasswordMessage("Password cannot be empty")
        return false
      }
      
    }
    
    if(isEmail() && isPassword()){
        navigate("/home-page",{state:{email}})
    }

    }

    const navigateToForgetPassword=()=>{
        if(isEmail()){
            navigate("/forget-password",{state:{email}})
        }  
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
        onChange={(e)=>setEmail(e.target.value)}/>
        <div className='email-message'>{emailMessage}</div>
        <label htmlFor="input-password">Password</label>
        <input type="password" 
        name="password" 
        id="input-password"
        required
        placeholder='Enter password'
        value={password}
        onChange={(e)=>setPassword(e.target.value)}/>
                <a style={{
                     textDecoration:"none",
                     fontSize:"12px",
                     color:"#A6EBF1",
                }} to="/forget-password" onClick={navigateToForgetPassword}>forget password</a>
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