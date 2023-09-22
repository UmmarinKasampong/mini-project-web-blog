import React, { useEffect, useState } from 'react'
import './Sidebar.css'

const Sidebar = ({blogOwner , OwnerImg}) => {

    // const userImg = localStorage.getItem('userImg')
    const UserLogin = localStorage.getItem('username')
    const [showTitle , setShowTitle ] = useState('')

    useEffect(() => {
        
        if(blogOwner === UserLogin) {
            setShowTitle('Me')
        }else {
            setShowTitle(blogOwner)
        }

    },[])


  return (
    <div className='sidebar'>
        <div className="sidebar-container">
            <p className="title">
                About {showTitle}
            </p>

            <img src={OwnerImg} className="user_img" />

            <p className="user_info">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quam officia molestias aspernatur pariatur hic inventore.
            </p>


            <div className="categories">
                <p>categories</p>

                
                <ul className='categories-grid'>
                        <li className='cate-list'><a href="">Life</a></li> 
                        <li className='cate-list'><a href="">Music</a></li> 
                        <li className='cate-list'><a href="">Sport</a></li> 
                        <li className='cate-list'><a href="">Style</a></li> 
                        <li className='cate-list'><a href="">Tech</a></li> 
                        <li className='cate-list'><a href="">Cinema</a></li> 
                </ul>
              
              
            </div>

            <div className="social-footer">
                <p>follow us</p>
                <div className="social-logo">
                    <i class="fa fa-facebook-official" aria-hidden="true"></i>
                    <i class="fa fa-instagram" aria-hidden="true"></i>
                    <i class="fa fa-pinterest-square" aria-hidden="true"></i>
                    <i class="fa fa-twitter-square" aria-hidden="true"></i>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Sidebar