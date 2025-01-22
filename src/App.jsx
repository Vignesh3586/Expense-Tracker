import { Route,Routes} from 'react-router-dom'
import './App.css'
import LoginPage from './LoginPage'
import CreateUser from './CreateUser'
import ForgetPassword from './forgetPassword'
import HomePage from './components/HomePage'


function App() {

  return (
    <>
    <div className='app'>
      <Routes>
      <Route path="/" element={<LoginPage/>}/>
      <Route path="/create-user" element={<CreateUser/>}/>
      <Route path="/forget-password" element={<ForgetPassword/>}/>
      <Route path="/home-page" element={<HomePage/>}/>
      </Routes>
    </div>
    </>
  )
}

export default App
