import './WriteBlog.css'
import { useState } from 'react';
import axios from 'axios'

const WriteBlog = () => {
    const [blog_title , setBlog_title] = useState('') 
    const [blog_description , setBlog_description] = useState('') 
    const blog_owner = localStorage.getItem('userId')

    const [file, setFile] = useState();

 
    const PublishBlog =(e)=> {
        e.preventDefault();
        console.log("ทำงาน ++++++++++++")

        const formData = new FormData();
        formData.append("image", file);

        formData.append("blog_title", blog_title);
        formData.append("blog_description", blog_description);
        formData.append("blog_owner", blog_owner);
      
        

        // { blog_title : blog_title , blog_description : blog_description , image : file , fileName : fileName}
        axios.post('http://localhost:3300/blog/create' , formData).then((res)=>{
            if(res.data.status === 'ok'){
                alert('Blog Created')
       
                window.location = '/'
            }else {
                alert('Publice Error !!! : ' + res.data.msg);
                console.log(res.data)
            }
        }).catch((error) =>{
            console.log(error);
        })
    }



    const loadFile = async (e) =>{
        const imageFile = e.target.files;

        var showImg = document.getElementById('new-img')

        if(imageFile.length > 0){
            console.log(imageFile)
            const imageSrc = URL.createObjectURL(imageFile[0]);

            showImg.src = imageSrc;

            await setFile(imageFile[0]);
          

        }

      
    }
  return (
    <div className='new-blog'>
        <div className="new-blog-container">
            <form className='new-blog-input' enctype="multipart/form-data" onSubmit={(e) => PublishBlog(e)}>

                <div className="new-blog-img">
                    <img src="https://images.unsplash.com/photo-1531256509352-ed2b27db4b22?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1331&q=80" id="new-img" alt="" />

                    
                </div>
                
                <div className="new-blog-btn">
                    <button className='btn-add-blog' type='submit'>Publish</button>

                </div>
     

                <div className="new-blog-title-addimg">
                    <label htmlFor="new-blog-img" className='btn-add-img'>
                        <i class="fa fa-plus-circle" aria-hidden="true"></i>
                    </label>
                    <input type="file" id="new-blog-img" style={{display : 'none'}} name="image" accept="image/png, image/jpeg" 
                    onChange={(e) => loadFile(e)}
                    />

                    <input type="text" className='add-title' placeholder='Title' value={blog_title} onChange={(e) => setBlog_title(e.target.value) } />
                </div>


                <div className="new-blog-description">
                    <textarea placeholder='Tell your story...' onChange={(e) => setBlog_description(e.target.value) }>{blog_description}</textarea>
                </div>
            </form>


        </div>

    </div>
  )
}

export default WriteBlog