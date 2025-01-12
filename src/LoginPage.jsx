import React from 'react'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
    const navigate=useNavigate()

    const [email,setEmail]=useState('')
    const [password,setPassword]=useState("")
    const [emailMessage,setEmailMessage]=useState("")
    const [passwordMessage,setPasswordMessage]=useState("")
    
    const existsEmail=async()=>{
        const url=""
        const bodyData={
            email:email,
        }
        const options={
            method:"get",
            query:JSON.stringify(bodyData),
            headers:{
               "Content-Type":"Application/json"
            }
        }
        try{
            await fetch(url,options) 
            return true
        }catch(error){
            console.error(`Error:${error.message}`)
        }
    
    }

    const existsPassword=async()=>{
        const url=""
        const bodyData={
            email:email,
            password:password,
        }
        const options={
            method:"get",
            query:JSON.stringify(bodyData),
            headers:{
               "Content-Type":"Application/json"
            }
        }
        try{
            const response=await fetch(url,options) 
            const result=await response.json()
            return true
        }catch(error){
            return error.message
        }
    
    }

    const validateUser=()=>{
        
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

      const isPassword=()=>{
      if(password){
        const checkPassword=existsPassword()
        if(checkPassword){
            return true
        }else{
            alert(checkPassword)
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

  return (
    <>
     <section className="login-page">
        <header>Login</header>
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
        <button type="button" class="login-btn" onClick={validateUser}>Login
        </button>
        </form>
        <a onClick={forgetPassword}>forget password</a>
        <div>
            I have no account?<Link to="/create-user">create account</Link>
        </div>
      </section>
    </>
  )
}

export default LoginPage