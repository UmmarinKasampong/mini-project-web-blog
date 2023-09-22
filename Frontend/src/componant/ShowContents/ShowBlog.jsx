import React , {useState , useEffect} from 'react'
import {Link} from 'react-router-dom'
import date from 'date-and-time'
import axios from 'axios'
import './ShowBlog.css'

const ShowBlog = () => {
    const [BlogList , setBlogList] = useState([])


    useEffect(() => {
        axios.get('http://localhost:3300/blog/showtotal').then((res) => {
            if(res.data.status === 'ok'){
                // alert("Load complete")
                setBlogList(res.data.data);
                console.log("load data")
                console.log(BlogList)
            }else if(res.data.status === 'none'){
                alert(res.data.msg)
            }
        }).catch((err) => console.log(err))
    } , [])

  return (
    <div className='show-contents'>
        <div className="show-container">
            <div className="show-contents-grid">
                {BlogList.map((newblogitem) =>(
                     <div className="blog-item">
                     <div className="blog-img">
                         <img src={`http://localhost:3300/images/${newblogitem.blog_imgSrc}`}/>
                     </div>
                     
                     <div className="blog-title">
                         <Link to={`/post/${newblogitem.blog_id}`}>{newblogitem.blog_title}</Link>
                     </div>
                     
 
                     <div className="blog-description">
                         <p>{newblogitem.blog_description.substring(0 , 20) + '....'}</p>
                     </div>
 
                     <div className="blog-footer">
                         <div className="blog-authur">
                             <span>Authur : </span>
                             <p ><Link to={`/Owner_Blog/${newblogitem.username}`}>{newblogitem.username}</Link></p>
                         </div>
 
                         <div className="blog-date">
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

export default ShowBlog