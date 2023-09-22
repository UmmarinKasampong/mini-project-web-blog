import React , {useState , useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import './SingleBlog.css'

// Components


const SingleBlog = () => {
    const blogId = useParams();
    const username = localStorage.getItem('username')
    const [blogInfo , setBlogInfo ] = useState([])
   
    var PageStatus;
    const [openEdit , setOpenEdit ] = useState('')
    const [editClick , setEditClick ] = useState('')

    // set Edit Data
    const [auther , setAuther] = useState('')
    const [Blog_title , setBlog_title] = useState('') 
    const [blog_description , setBlog_description] = useState('') 
    const [file, setFile] = useState();
    const [imageB , setImageB] = useState('');
    

    const loadFile = async (e) =>{
        const imageFile = e.target.files;

        var showImg = document.getElementById('blog-img')

        if(imageFile.length > 0){
            console.log(imageFile)
            const imageSrc = URL.createObjectURL(imageFile[0]);

            showImg.src = imageSrc;

            await setFile(imageFile[0]);
          

        }

      
    }


    const handleEdit =()=> {
        console.log("Edit Blog")
        setEditClick('edit')

    }


    // const handleSetTitle =(test)=> {
      
    //     setBlog_title(test)
    //     console.log("New " + Blog_title)
   
    // }

    
    const UpdateBlog =(e)=> {
        e.preventDefault();
        console.log("ทำงาน ++++++++++++")

        const formData = new FormData();
        formData.append("image", file);

        formData.append("blog_title", Blog_title);
        formData.append("blog_description", blog_description);
        formData.append("blog_id", blogId.id);
        formData.append("prevantImg", imageB);
      
        

        // { blog_title : blog_title , blog_description : blog_description , image : file , fileName : fileName}
        axios.post('http://localhost:3300/blog/update' , formData).then((res)=>{
            if(res.data.status === 'ok'){
                alert(res.data.msg)
                console.log(res.data)
                console.log(res.data.sql)
                window.location = `/Owner_Blog/${username}`
            }else {
                alert('Publice Error !!! : ' + res.data.msg);
                console.log(res.data)
            }
        }).catch((error) =>{
            console.log(error);
        })
    }

    const DeleteBlog =()=> {
        axios.post(`http://localhost:3300/blog/delete` , { blog_id : blogId.id, preventImg : imageB}).then((res)=>{
            if(res.data.status === 'ok'){
                alert(res.data.msg)
            
                window.location = `/Owner_Blog/${username}`
            }else {
                alert('Publice Error !!! : ' + res.data.msg);
                console.log(res.data)
            }
        }).catch((error) =>{
            console.log(error);
        })
    }

    useEffect( () => {
        setEditClick('readonly')
        axios.post('http://localhost:3300/blog/single' , { blogId : blogId.id}).then((res) => {
            if(res.data.status === 'ok'){
                // alert("Load complete")
                setBlogInfo(res.data.data);

                setBlog_title(res.data.data[0].blog_title) 
                setBlog_description(res.data.data[0].blog_description)
                setImageB(res.data.data[0].blog_imgSrc)
                setAuther(res.data.data[0].username)
                console.log("load data")

                if(res.data.data[0].username === username) {
                    setOpenEdit('owner')
                    console.log(res.data.data[0].username + " = " + username )
                }else {
                    setOpenEdit('visiter')
                    console.log(res.data.data[0].username + " = " + username )
                }
          
        
            }else if(res.data.status === 'none'){
                alert(res.data.msg)
            }
            // console.log(blogInfo[0].blog_title)
        }).catch((err) => console.log(err))
         
    } , [])
  return (
    <div className='single-blog'>
        <div className="single-blog-container">
            <form className='blog-edit-input' enctype="multipart/form-data" onSubmit={UpdateBlog}>
                
                    <div className="blog-Info">
                        <div className="single-blog-img">
                            <img src={`http://localhost:3300/images/${imageB}`} id="blog-img" alt="" />

                            <div className={`blog-setting-menu-${openEdit}`}>
                                <div className="dots-menu">
                                    <i class="fa fa-ellipsis-h" aria-hidden="true"></i>
                                </div>
                    
                                <div className="setting-dropdown">
                                    <ul >
                                        <li>
                                            <a onClick={handleEdit}>
                                                <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                                                <span>Edit Blog</span>
                                                    
                                            </a>
                                        </li>
                                        <li>
                                            <a onClick={DeleteBlog}>
                                                <i class="fa fa-trash" aria-hidden="true"></i>
                                                <span>Delete Blog</span>
                                                    
                                            </a>
                                        </li>
                                    </ul>
                                </div> 
                            </div>

                        </div>

                  
                        <div className={`single-blog-title-${editClick}`}>
                            <div className="single-edit-title-img">
                                <label htmlFor="single-edit-blog-img" className='btn-edit-img'>
                                    <i class="fa fa-plus-circle" aria-hidden="true"></i>
                                </label>
                                <input type="file" id="single-edit-blog-img" style={{display : 'none'}} name="image" accept="image/png, image/jpeg" 
                                onChange={(e) => loadFile(e)}
                                />

                                <input type="text"  className='add-title'  value={Blog_title} onChange={(e)=> 
                                setBlog_title(e.target.value)
                                
                                
                                } placeholder='Title' />

                            </div>
                
                            <div className="single-blog-authur">
                                <span>Auther : {auther}</span>
                                <span>11 / 08 / 2900</span>
                            </div>
                        </div>
                    
                


                        <div className={`single-blog-description-${editClick}`}>
                            <textarea placeholder='Tell your story...' value={blog_description} onChange={(e) => setBlog_description(e.target.value)}></textarea>

                            <div className="blog-btn-edit">
                                <button className='btn-edit-blog' type='submit'>Edit Blog</button>

                            </div>
                        
                        </div>


                    </div>
                

         

            </form>
                
              


          
        </div>

    </div>
  )
}

export default SingleBlog