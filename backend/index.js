const express=require ('express');
const cors=require('cors');
const mongoose=require('mongoose');
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const User=require('./models/user.js')
const cookieParser=require('cookie-parser')
// const imageDownloader=require('image-downloader')
// const multer=require('multer')
// const fs=require('fs')
require('dotenv').config()
const app=express()
const bcryptSalt=bcrypt.genSaltSync(10)
const jwtSecret='fase2j34gj4h5gjdnjs';
app.use(express.json())
app.use(cookieParser())
// {
//     credentials:true,
//     origin:'http://localhost:5173'
// }
app.use(cors())
mongoose.connect(process.env.MONGOURL)
app.get('/test',(req,res)=>{
    res.json('test ok');
});
app.post('/signup',async (req,res)=>{
    const{name,email,password}=req.body;
    try{const UserDoc=await User.create({
        name,
        email,
        password:bcrypt.hashSync(password,bcryptSalt)
    })
    res.json(UserDoc);}
   catch(e){
    res.status(422).json(e);
   }
})
app.post('/login',async (req,res)=>{
    const {email,password}=req.body;
    const UserDoc=await User.findOne({email})
    if(UserDoc){
        const passOk=bcrypt.compareSync(password,UserDoc.password)
        if(passOk){
            jwt.sign({email:UserDoc.email,id:UserDoc.id},jwtSecret,{},(err,token)=>{
                if(err) throw err;
                res.cookie('token',token).json(UserDoc)
            })
            
        }
        else{
            res.status(422).json('pass not ok')
        }
    }
    else{
        res.json('not found')
    }
})
app.get('/profile',(req,res)=>{
    const {token}=req.cookies;
    if(token){
        jwt.verify(token,jwtSecret,{},async (err,userData)=>{
            if(err) throw err;
            const {name,email,id}=await User.findById (userData.id) 
            res.json({name,email,id})
        })
    }
    else{
        res.json(null);
    }
    
})
app.post('/logout',(req,res)=>{
    res.cookie('token','').json(true);
})

app.listen(4000);