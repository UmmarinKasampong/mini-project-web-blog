import React , {useState , useEffect} from 'react'
import {Link} from 'react-router-dom'
import date from 'date-and-time'
import axios from 'axios'

import './OwnerContents.css'

const OwnerContents = ({user}) => {
    const [BlogList , setBlogList] = useState([])


    useEffect(() => {
        console.log("Usernameeeeeeeeeeeeeeeeeeeeeeeeee : " + user)
        axios.post('http://localhost:3300/blog/owner' , {username : user}).then((res) => {
            if(res.data.status === 'ok'){
                // alert("Load complete")
                setBlogList(res.data.data);
                console.log("load data")
                console.log(BlogList)
            }else if(res.data.status === 'none'){
                alert(res.data.msg)
            }
        }).catch((err) => console.log(err))
        // axios.get('http://localhost:3300/blog/showtotal').then((res) => {
        //     if(res.data.status === 'ok'){
        //         // alert("Load complete")
        //         setBlogList(res.data.data);
        //         console.log("load data")
        //         console.log(BlogList)
        //     }else if(res.data.status === 'none'){
        //         alert(res.data.msg)
        //     }
        // }).catch((err) => console.log(err))
    } , [])

  return (
    <div className='owner-show-contents'>
        <div className="owner-show-container">
            <div className="owner-show-contents-grid">
                {BlogList.map((newblogitem) =>(
                     <div className="owner-blog-item">
                     <div className="owner-blog-img">
                         <img src={`http://localhost:3300/images/${newblogitem.blog_imgSrc}`}/>
                     </div>
                     
                     <div className="owner-blog-title">
                         <Link to={`/post/${newblogitem.blog_id}`}>{newblogitem.blog_title}</Link>
                     </div>
                     
 
                     <div className="owner-blog-description">
                         <p>{newblogitem.blog_description.substring(0 , 20) + '....'}</p>
                     </div>
 
                     <div className="owner-blog-footer">
                         <div className="owner-blog-authur">
                             <span>Authur : </span>
                             <p >{newblogitem.username}</p>
                         </div>
 
                         <div className="owner-blog-date">
                             <span>Date : </span>
                             <p>11 / 08 / 2900</p>
                         </div>
                        
                     </div>
 
                 </div>

                ))}
               

            </div>
        </div>

    </div>
  )
}

export default OwnerContents