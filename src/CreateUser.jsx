import React from 'react'
import { useNavigate ,Link} from 'react-router-dom'
import { useState } from 'react'

const CreateUser = () => {
    const navigate=useNavigate()
    
   const [email,setEmail]=useState('')
   const [password,setPassword]=useState("")
   const [confirmPassword,setConfirmPassword]=useState("")
   const [emailMessage,setEmailMessage]=useState("")
   const [passwordMessage,setPasswordMessage]=useState("")
   const [confirmPasswordMessage,setConfirmPasswordMessage]=('')
    

   const styledLinkElement={
    textDecoration:"none",
    color:"#A6EBF1",
}

    const postEmail=async()=>{
        const url="https://backend-expense-tracker-ur4n.onrender.com/create-user"
        const bodyData={
            email:email,
            password:password,
        }
        const options={
            method:"post",
            body:JSON.stringify(bodyData),
            headers:{
               "Content-Type":"application/json"
            }
        }
        try{
            await fetch(url,options) 
        }catch(error){
            console.error(`Error:${error.message}`)
        }
    
    }

    const validateUser=()=>{

        const isEmail=()=>{
            if(!email){
                setEmailMessage("Email cannot be empty")
                return false
            }
            
        }

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
        navigate("/home-page",{state:{email}})
    }

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
        <button type="button" className="login-btn" onClick={validateUser}>
          Create Account
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