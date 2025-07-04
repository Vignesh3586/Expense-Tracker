import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { selectLoading } from './slices/transctionSlice'
import { useSelector } from 'react-redux'

const ForgetPassword = () => {
  const location = useLocation()
  const email = location.state.email

  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [passwordMessage, setPasswordMessage] = useState("")
  const [confirmPasswordMessage, setConfirmPasswordMessage] = ('')
  const [loading, setLoading] = useState(false)

  const updatePassword = async () => {
    const url = "https://backend-expense-tracker-1-862g.onrender.com"
    const details = {
      email,
      password,
    }
    const options = {
      method: "PUT",
      body: JSON.stringify(details),
      headers: {
        "Content-Type": "application/json"
      }
    }
    try {
      const response = await fetch(url, options)
      if (response.ok) {
        return true
      }
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }


  }

  const validateUser = () => {
    setLoading(true)
    const isPassword = () => {
      const comparePassword = (password == confirmPassword)
      if (password) {
        if (password.length >= 6) {
          if (confirmPassword) {
            if (comparePassword) {
              return true
            } else {
              setPasswordMessage("Password does not match")
              return false
            }
          } else {
            setConfirmPasswordMessage("Confirm password cannot be empty")
            return false
          }
        } else {
          setPasswordMessage("Must have 6 length")
        }
      } else {
        setPasswordMessage("Password cannot be empty")
        return false
      }

    }

    if (isPassword()) {
      const checkPassword = updatePassword()
      if (checkPassword) {
        navigate("/home-page", { state: { email } })
      } else {
        alert(error.message)
      }


    }

  }

  const styledLinkElement = {
    textDecoration: "none",
    color: "#A6EBF1",
  }

  const onConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value)
    setConfirmPasswordMessage("")
  }

  const onPasswordChange = (e) => {
    setPassword(e.target.value)
    setPasswordMessage('')
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
              readOnly />
            <label htmlFor="input-password">New Password</label>
            <input type="password"
              name="password"
              id="input-password"
              required
              placeholder='Enter password'
              value={password}
              onChange={onPasswordChange} />
            <div className="password-message">{passwordMessage}</div>
            <label htmlFor="input-password">Confirm Password</label>
            <input type="password"
              name="confirmPassword"
              id="input-confirm-password"
              required
              placeholder='Enter Confirm password'
              value={confirmPassword}
              onChange={onConfirmPasswordChange} />
            <div className="confirm-password-message">{confirmPasswordMessage}</div>
            <button type="button" className="login-btn" onClick={validateUser}>{loading ? "Loading..." : "Login"}
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
