import React , {useState} from 'react'
import './Css/LoginPage.css'

// Components
import { LoginCard } from '../componant/Login_SignUp/LoginCard'
import { SignupCard } from '../componant/Login_SignUp/SignupCard'


function Login() {

  const [ switchMode , setSwitch ] = useState('login')

  const handleSwite = (mode) =>{
    setSwitch(mode)
  }
  return (
    <div className="login-page">
        <div className="login-bg"></div>
        <div className="login-bg-overy"></div>

        <div className="main-info">
          {switchMode == 'login' ? <LoginCard mode={handleSwite}/> : <SignupCard mode={handleSwite}/>}
        </div>


       
    </div>
  )
}

export default Login