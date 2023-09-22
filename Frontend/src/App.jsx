import { BrowserRouter , Route , Routes } from 'react-router-dom'
import { useState } from 'react'
import './App.css'

// Component
import Login from './Page/Login'
import Home from './Page/Home'
import Profile from './Page/Profile'
import CreateBlog from './Page/CreateBlog'
import ShowBlogInfo from './Page/ShowBlogInfo'
import YourBlog from './Page/YourBlog'


function App() {  


  return (

 
    <BrowserRouter>

      <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/Login' element={<Login/>}/>
          <Route path='/Profile' element={<Profile/>}/>
          <Route path='/Write' element={<CreateBlog/>} />
          <Route path='/Owner_Blog/:user' element={<YourBlog/>} />
          
          <Route path='/post/:id' element={<ShowBlogInfo/>} />
      </Routes>
    </BrowserRouter>

  
  )
}

export default App
