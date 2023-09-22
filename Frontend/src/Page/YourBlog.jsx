import './Css/YourBlog.css'
import { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
import axios from 'axios';
// Components
import { Navbar } from '../componant/Navbar/Navbar';
import Ownerheader from '../componant/OwnerBanner/Ownerheader';
import OwnerContents from '../componant/OwnerContents/OwnerContents';
import Sidebar from '../componant/SideBar/Sidebar';



function YourBlog() {
  const OwnerBLog = useParams();
  const [ OwnerImage , setOwnerImage ] = useState('')

  console.log('เจ้าของ' + OwnerBLog.user)

  useEffect(()=>{
    axios.post('http://localhost:3300/user/Info' , { username : OwnerBLog.user })
    .then((res) => {
      if(res.data.status === 'ok'){
        setOwnerImage(res.data.data[0].user_img)
        console.log('this img '+ res.data.data[0].user_img)
      }
    }).catch((err)=> {
      console.log(err)
    })
  },[])

  return (
    <>
      <Navbar/>
      <Ownerheader blogOwner={OwnerBLog.user} OwnerImg={OwnerImage}/>
      <div className="Owner-contents">
           <OwnerContents user={OwnerBLog.user}/>
        <div className="side-bar">
           <Sidebar blogOwner={OwnerBLog.user} OwnerImg={OwnerImage}/>
        </div>
 
      </div>
    
    </>
  )
}

export default YourBlog