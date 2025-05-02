import React from 'react'
import { useNavigate ,Link} from 'react-router-dom'
import { useState } from 'react'
import { selectLoading } from './slices/transctionSlice'
import { useSelector } from 'react-redux'

const CreateUser = () => {
    const navigate=useNavigate()
    
   const [response,setResponse]=useState(false)
   const [email,setEmail]=useState('')
   const [password,setPassword]=useState("")
   const [confirmPassword,setConfirmPassword]=useState("")
   const [emailMessage,setEmailMessage]=useState("")
   const [passwordMessage,setPasswordMessage]=useState("")
   const [confirmPasswordMessage,setConfirmPasswordMessage]=useState('')
   const [loading,setLoading]=useState(false)
    

   const styledLinkElement={
    textDecoration:"none",
    color:"#A6EBF1",
}

    const postEmail=async()=>{
        const url="https://backend-expense-tracker-1-862g.onrender.com"
        const bodyData={
            email,
            password,
        }
        const options={
            method:"POST",
            body:JSON.stringify(bodyData),
            headers:{
               "Content-Type":"application/json"
            }
        }
        try{
            const finalURL=`${url}/create-user`
            const response=await fetch(finalURL,options) 
            if(response.ok){
              setResponse(true)
           }
        }catch(error){
            console.error(`Error:${error.message}`)
        }finally{
          setLoading(false)
        }
    
    }

    const validateUser=()=>{
      setLoading(true)
      function isValid() {
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return pattern.test(email);
    }
    
    const isEmail=()=>{
        const valid=isValid()
        if(!email){
           setEmailMessage("Email cannot be empty")
          return false
        }
        if(valid){
          return true
        }   
        }


      const isPassword=()=>{
      if(password){
        if(password.length>=6){
        if(confirmPassword){
            if(password==confirmPassword){
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
        setPasswordMessage("Must have length 6")
        return false
      }
      }else{
        setPasswordMessage("Password cannot be empty")
        return false
      }
      
    }


    if(isEmail() && isPassword()){
        postEmail()
        if(response){
          navigate("/home-page",{state:{email}})
        }   
    }

    }
    const onConfirmPasswordChange=(e)=>{
      setConfirmPassword(e.target.value)
      setConfirmPasswordMessage("")
    }
    
    const onPasswordChange=(e)=>{
      setPassword(e.target.value)
      setPasswordMessage('')
    }

    const onEmailChange=(e)=>{
      setEmail(e.target.value)
      setEmailMessage('')
    }
  return (
    <>
    <div className="body-create">   
    <section className="create-user-page">
     <div id="header-create">Create Account</div>
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
        <div className="password-message">{passwordMessage}</div>
        <label htmlFor="input-password">Confirm Password</label>
        <input type="password" 
        name="confirmPassword" 
        id="input-confirm-password"
        required
        placeholder='Enter Confirm password'
        value={confirmPassword}
        onChange={onConfirmPasswordChange}/>
        <div className="confirm-password-message">{confirmPasswordMessage}</div>
        <button type="button" className="login-btn" onClick={validateUser}>
        {loading ? "Loading..." : "Create User"}
        </button>
        </form>
        <div id="optional-create">
            I have account?<Link style={styledLinkElement} to="/">login</Link>
        </div>
    </section>
    </div>
    </>
  )
}

export default CreateUser