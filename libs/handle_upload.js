const cloudinary = require('cloudinary').v2
const multer = require('multer')
const path = require('path')
const fs = require('fs')


const strorage = multer.diskStorage({
    destination : (req, file , cb)=>{
        cb(null, ate.now()+ '_' + file.originalname)
    }
})

const fileFilter = (req, file, cb)=>{
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg'){
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const upload = multer ({
    storage :strorage,
    limits:{
        fileSize: 1024 * 1024 * 3
    },
    fileFilter :fileFilter
})

cloudinary.config({
    cloud_name : process.env.CLOUD_NAME,
    api_key : process.env.API_KEY,
    api_secret : process.env.API_SECRET
})

async function uploadClodudinary(filePath){
    let result
    try{
        result = await cloudinary.uploader.upload(filePath, {
            use_filename : true
        })
        fs.unlinkSync(filePath)
        return result.url
    } catch (err){
        fs.unlinkSync(filePath)    
        return null
    } 
}

module.exports = {
    upload, uploadClodudinary
}