import React , {useState} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import './Css/LoginCard.css'

export  const LoginCard = ({mode}) => {

    const [ email , setEmail ] = useState('');
    const [ password , setPassword ] = useState('');

    
    const Login  = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3300/user/login' , { email : email , password : password}).then((res)=>{
            if(res.data.status === 'ok'){
                alert('Login')
                console.log(res.data)
                localStorage.setItem('token' , res.data.token)
                localStorage.setItem('username' , res.data.username)
                localStorage.setItem('userImg' , res.data.userImg)
                localStorage.setItem('userId' , res.data.userId)

                
                window.location = '/'
            }else {
                alert('Password or Email Incurrect !!!');
                console.log(res.data)
            }
        }).catch((error) =>{
            console.log(error);
        })
    }

    
  return (
    <div className='card-login'>
        <div className="card-login-container">

            <div className="logo-login">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/732px-Apple_logo_black.svg.png?20220821121934" alt="Blog-Logo" />
                <h1>log in</h1>
            </div>
            
            <form action="" onSubmit={Login}>
                <div className="form-input">
                    <input type="text" onkeyup="this.setAttribute('value', this.value);"  value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <label htmlFor="">Email</label>
                </div>

                <div className="form-input">
                    <input type="password" onkeyup="this.setAttribute('value', this.value);" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <label htmlFor="">Password</label>
                </div>

                <button type='submit' className='btn-login'>Login</button>
            </form>

            <div className="login-footer">
                <span>Haven't Account ? </span>
                <span><Link onClick={() => mode('signup')}>Sign up</Link></span>
            </div>

        </div>
       
    </div>
  )
}

