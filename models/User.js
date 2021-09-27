const mongoose= require('mongoose');

const UserSchema=  new mongoose.Schema({
    name:{
        type: String
    },
    email:{
        type: String
    },
    password:{
        type: String,
        required: true,
        min:6
    },
    profpicture:{
        type:String,
        default:"https://res.cloudinary.com/db9dt41gx/image/upload/v1632610856/NextChat/user_uherdj.svg",
    }
},{timestamps:true})


module.exports = mongoose.models.User || mongoose.model('User', UserSchema)