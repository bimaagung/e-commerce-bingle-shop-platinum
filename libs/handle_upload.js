require("dotenv").config();
const cloudinary = require('cloudinary').v2
const multer = require('multer')
const path = require('path')
const fs = require('fs');

// cloudinary.url("sample.jpg", {width: 300, height: 100, crop: "scale",default_image: "avatar.png"})

dirPath = './public'
if(!fs.existsSync(dirPath)){
    fs.mkdirSync(dirPath)
}

const storage = multer.diskStorage({
    destination: (req ,file , cb)=>{
        cb(null, path.join(__dirname, '../public'))
    },
    filename : (req, file ,cb)=>{
        cb(null, Date.now()+ '_' + file.originalname)
    }
})

const fileFIlter = (req, file ,cb)=>{
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg'){
cb(null , true)
    }else{
        cb(null, false)
    }
}

const upload = multer ({
    storage:storage,
    limits:{
        fileSize: 1024 * 1024 * 3
    },
    fileFilter: fileFIlter
})


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key : process.env.API_KEY,
    api_secret : process.env.API_SECRET
})


async function uploadCloudinary(filePath){
   
    
    let result
    try {
        result = await cloudinary.uploader.upload(filePath, {
            use_filename: true
        })
        fs.unlinkSync(filePath)
        return result.url
    } catch (error) {
        fs.unlinkSync(filePath)
        return null
    }
}





module.exports= {upload, uploadCloudinary,dirPath}