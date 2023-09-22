import React , { useState } from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'

export const Navbar = () => {

  const username = localStorage.getItem('username')
  const userImg = localStorage.getItem('userImg')

  const handleLogout =()=> {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    window.location = '/'
  }

  return (
    <nav className='navbar'>
        <div className="nav-container">
          <div className="nav-item nav-social">

            <i class="fa fa-facebook-official" aria-hidden="true"></i>
            <i class="fa fa-instagram" aria-hidden="true"></i>
            <i class="fa fa-pinterest-square" aria-hidden="true"></i>
            <i class="fa fa-twitter-square" aria-hidden="true"></i>

          </div>

          <div className="nav-item nav-menu">
            <Link to="/">Home</Link>
            <Link to={`/Owner_Blog/${username}`}>Your Blog</Link>
            <Link to="/Write">Write</Link>
            

          </div>
     
          <div className="nav-item nav-item-user">

             
                <img src={userImg} alt="" className="user-img" />
                <label>{username}</label>
       
        
              <div className="dropdown-user">
                
                <div className="user-item">
                 <i class="fa fa-user" aria-hidden="true"></i>
                 <Link to='/Profile'> Your Profile </Link>
                  {/* <a href='/'> Your Profile </a> */}
                </div>

                <div className="user-item" onClick={handleLogout}>
                 <i class="fa fa-sign-out" aria-hidden="true"></i>

                  <a> Logout </a>
                </div>
      
              </div>
          </div>
      </div>
        
    </nav>
  )
}
