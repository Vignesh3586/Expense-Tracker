import {  Routes ,Route} from 'react-router-dom'
import './App.css'
import LoginPage from './LoginPage'
import CreateUser from './CreateUser'


function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<LoginPage/>}/>
      <Route path="/create-user" element={<CreateUser/>}/>
      <Route path="/forget-password" element={<ForgetPassword/>}/>
    </Routes>
    </>
  )
}

export default App
