var express = require('express')
var cors = require('cors')
var app = express()
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()

var bcrypt = require('bcrypt')
const saltRound = 10

var jwt = require('jsonwebtoken');
var key = 'welcome to my webblog'

var mysql = require('mysql2')

var multer = require('multer')

var path = require('path')

var fs = require('fs');

app.use(cors())

app.use(express.static("./public"))

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))

// parse application/json
app.use(express.json())



const connect  = mysql.createConnection({
    host : 'localhost',
    user: 'root' ,
    database : 'webblog'
    
})


//! Use of Multer
var storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, './public/images/')     // './public/images/' directory name where save the file
    },
    filename: (req, file, callBack) => {
        callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
 
var upload = multer({
    storage: storage
});
 


app.post('/user/Info' , jsonParser , function(req , res ){
    var username = req.body.username;
    var sql = `select * from user_table where username = '${username}'`
    console.log(sql)
   connect.query(sql , function(err , result ){
        if(err){
            res.json({status : 'error', msg : "Error To connect " , error : err})
            return ;
        }
        res.json({ status : 'ok', msg : 'Load complete !!!' , data : result , sql : sql})
   })
})


app.get('/blog/showtotal' , jsonParser , function(req , res) {
    
    var sql = 'SELECT T1.* , T2.username  FROM `blog_post` as T1 left JOIN user_table T2 on T1.blog_owner = T2.ID'

    connect.query(sql , function(err , result){
        if(err) {
            res.json({status : 'error' , msg : err})
            return ;
        }
        if(result === 0 ) {
            res.json({status : 'none' , msg : "No This Data"})
            return ;
        }

        res.json({status : 'ok' , msg : 'Load data complete',  data : result})
    })

})

app.post('/blog/owner' , jsonParser , function(req , res) {
    var user = req.body.username;
    
    var sql = 'SELECT T1.* , T2.username FROM `blog_post` as T1 left JOIN user_table T2 on T1.blog_owner = T2.ID where T2.username = ?'

    connect.query(sql , [user] , function(err , result){
        if(err) {
            res.json({status : 'error' , msg : err})
            return ;
        }
        if(result === 0 ) {
            res.json({status : 'none' , msg : "No This Data"})
            return ;
        }

        res.json({status : 'ok' , msg : 'Load data complete',  data : result})
    })

})



app.post('/blog/single' , jsonParser , function(req , res) {
    var blogId = req.body.blogId;
    console.log("data send blog Id " + blogId)
    var sql = 'SELECT T1.* , T2.username  FROM `blog_post` as T1 left JOIN user_table T2 on T1.blog_owner = T2.ID where T1.blog_id = ?'

    connect.query(sql , [blogId] ,  function(err , result){
        if(err) {
            res.json({status : 'error' , msg : err})
            return ;
        }
        if(result === 0 ) {
            res.json({status : 'none' , msg : "No This Data"})
            return ;
        }

        res.json({status : 'ok' , msg : 'Load data complete',  data : result})
    })

})



app.post('/blog/create' ,  upload.single('image') , function(req , res){

    var blog_title = req.body.blog_title;
    var blog_description = req.body.blog_description;
  
    var blog_owner = req.body.blog_owner;
    var blog_imgSrc;



    if (req.file) {
        
        blog_imgSrc = req.file.filename;
    
        console.log(blog_title)
  
    }else {
        res.json({ status : 'error' , msg : "No file upload" })
        // res.send(req.file)
        return ;

    } 
    
    var sql = 'insert into blog_post(blog_title , blog_description ,  blog_imgSrc , blog_owner  ) values(? , ? , ?  , ?  )';
  

    connect.query(sql , [blog_title , blog_description , blog_imgSrc , blog_owner ] , function(err,  result){
        if(err){
            res.json({msg : "Error To connect " , error : err})
            return ;
        }

        res.json({status : 'ok' , msg : 'Blog has been create !!!'})

    })


   
})


app.post('/blog/update' ,  upload.single('image') , function(req , res){

    var blog_title = req.body.blog_title;
    var blog_description = req.body.blog_description;
  
    var prevantImg = req.body.prevantImg;

    var blog_id = req.body.blog_id;
    var blog_imgSrc;



    if (req.file) {
        
        blog_imgSrc = req.file.filename;

            // ลบไฟล์เก่าทิ้ง 
        fs.unlink(`./public/images/${prevantImg}`, (err) => {
            if (err) {
                throw err;
            }
        
            console.log("Delete File successfully.");
        });
    
        console.log("ได้ไฟล์ใหม่")
  
    }else {
        blog_imgSrc = prevantImg
        console.log("ไม่มีไฟล์" + blog_title)
    } 
    
    // var sql = `UPDATE blog_post SET blog_title= "${blog_title}", blog_description = "${blog_description}" , blog_imgSrc = "${blog_imgSrc}" WHERE blog_id = "${blog_id}"`;

    var sql = 'UPDATE blog_post SET blog_title= ?, blog_description = ? , blog_imgSrc = ? WHERE blog_id = ?';
    // , [blog_title , blog_description , blog_imgSrc , blog_id ] 

    connect.query(sql, [blog_title , blog_description , blog_imgSrc , blog_id ] , function(err,  result){
        if(err){
            res.json({msg : "Error To connect " , error : err})
            return ;
        }

        res.json({status : 'ok' , msg : 'Blog has been Update !!!' , sql : sql , result : result})

    })


   
})


app.post('/blog/delete', jsonParser ,(req, res) => {
    // var { id } = req.params;
    var blog_id = req.body.blog_id;
    var prevantImg = req.body.preventImg;
    console.log("ID BLog " + blog_id )
    fs.unlink(`./public/images/${prevantImg}`, (err) => {
        if (err) {
            console.log("not have this File");
        }else {
            console.log("Delete File successfully.");
        }
    
 
    });


    var sql = `DELETE FROM blog_post WHERE blog_id = ${blog_id}`;
    connect.query(sql , function(err,  result){
        if(err){
            res.json({msg : "Error To connect " , error : err})
            return ;
        }

        res.json({status : 'ok' , msg : 'This Blog had been deleted'})

    })

})


app.post('/user/registor' , jsonParser , function(req , res){

    var username = req.body.username;
    var userImg = req.body.userImg;
    var password = req.body.password;
    var email = req.body.email;
    
    var sql = 'insert into user_table(username , user_img ,  user_email , user_password ) values(? , ? , ?  , ? )';
    bcrypt.hash(password , saltRound , function(err , hash){

        connect.query(sql , [username , userImg , email , hash] , function(err,  result){
            if(err){
                res.json({msg : "Error To connect " , error : err})
                return ;
            }
            res.json({status : 'ok' , msg : 'User has been create !!!'})
    
        })

    })
   
})

app.post('/user/login' , jsonParser , function(req , res){
    var email = req.body.email;
    var password = req.body.password;

    var checkuser = 'select * from user_table where user_email = ?'
    console.log(email)

    connect.query(checkuser , [email] , function(err , user){
        if(err){
            res.json({status : 'error' , msg : "Error To connect " , error : err})
            return ;
        }
        if(user === 0 || user === undefined){
            res.json({status : 'none' , msg : 'haven t this account'})
            return ;
        }

        console.log("password " + user[0].user_password)


        bcrypt.compare(password, user[0].user_password , function(err, result) {
            // result == true
            if(err){
                res.json({status : 'error' , error : err})
                return ;
            }
            
            
            if(result){
                var token = jwt.sign({ email: user[0].user_email , username : user[0].username }, key , { expiresIn: '1h' } );
                res.json({status : 'ok' , msg : 'Login' , token : token , username : user[0].username , userImg : user[0].user_img , userId : user[0].ID})
            }else{
                res.json({status : 'none' , msg : 'password incurrect' , data : result})
                return ;
            }
        });
    

    } )


})

app.post('/user/login/checktoken' , jsonParser , function(req , res) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        var decoded = jwt.verify(token,  key);


        res.json({ status : 'ok' , decoded : decoded})
    } catch (error) {
        res.json({status : 'error' , msg : error})
    }
})

app.listen(3300, function () {
    console.log('CORS-enabled web server listening on port 3300')
})