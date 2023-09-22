import React  , {useEffect} from 'react'
import axios from 'axios'

// Components
import { Navbar } from '../componant/Navbar/Navbar'
import HomeBanner from '../componant/HomeBanner/HomeBanner'
import ShowBlog from '../componant/ShowContents/ShowBlog'


function Home() {

  const token = localStorage.getItem('token')

 

  useEffect(()=>{
    if(token){
      axios.post('http://localhost:3300/user/login/checktoken' , '' , { headers : {Authorization: `Bearer ${token}`} }).then((res) =>{
          if(res.data.status === 'ok'){
            alert('Welcome To Blog Web Site')
          }else {
            alert('Invalid token')
            localStorage.removeItem('token')
            window.location = '/Login'
          }
      }
      ).catch((err) =>{
        alert("Errorrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr")
        console.log(err)
        window.location = '/Login'
      })
    }else {
      // localStorage.removeItem('token')
      alert('ไม่มี Token')
      window.location = '/Login'
    }
  })
  return (
    <div>
      <Navbar/>
      <HomeBanner/>

      <div className="home-contents">
        <ShowBlog mode='home'/>
      </div>
    </div>
  )
}

export default Home