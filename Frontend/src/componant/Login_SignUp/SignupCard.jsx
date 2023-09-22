import React , { useState } from 'react'
import { Link } from 'react-router-dom'

import './Css/SignupCard.css'
import axios from 'axios'


export const SignupCard = ({mode}) => {

    const [ username , setUsername ] = useState('')
    const [ email , setEmail ] = useState('')
    const [usernameImg , setImg ] = useState('')
    const [ password , setPassword ] = useState('')

    const Registor = (e) => {
        e.preventDefault()
        
        axios.post('http://localhost:3300/user/registor' , {
            username : username ,
            email : email ,
            password : password ,
            userImg : usernameImg
        }).then(function (res){
            if(res.data.status === 'ok'){
                alert('Account created !')
                window.location = '/'
            }
        }) .catch(function (error) {
            console.log(error);
          });
        

    }

  return (
    <div className='signup-card'>
        <div className="signup-card-container">
            <h1>sign up</h1>

            <div className="signup-contents">
                <form action="" onSubmit={Registor}>

                    <div className="form-item">
                        <input type="text" onkeyup="this.setAttribute('value', this.value);" value={username} onChange={(e) => setUsername(e.target.value)}  />
                        <label htmlFor="">Username</label>

                    </div>


                    <div className="form-item">
                        <input type="text" onkeyup="this.setAttribute('value', this.value);" value={usernameImg} onChange={(e) => setImg(e.target.value)}  />
                        <label htmlFor="">User Img Link</label>

                    </div>



                    <div className="form-item">
                        <input type="text" onkeyup="this.setAttribute('value', this.value);" value={email} onChange={(e) => setEmail(e.target.value)}  />
                        <label htmlFor="">Email</label>

                    </div>

                    <div className="form-item">
                        <input type="password" onkeyup="this.setAttribute('value', this.value);" value={password} onChange={(e) => setPassword(e.target.value)}  />
                        <label htmlFor="">Password</label>

                        
                    </div>

                    <button type='submit' className='btn-signup'>Create Account</button>
              
                </form>

            </div>

            <div className="signup-footer">
                    <span>Already have account ? </span>
                    <span><Link onClick={() => mode("login")}>Login</Link></span>
            </div>

        </div>
    </div>
  )
}

