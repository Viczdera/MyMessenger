import { mongo, Mongoose } from "mongoose";
import mongoose from 'mongoose';
const userSchem= new mongoose.Schema({
    name:{
        type: String,
        required:  true
    },
    email:{
        type: String,
        required:  true,
        unique: true
    },
    password:{
        type: String,
        required:  true
    },
    role:{
        type: String,
        default: 'user'
    },
    profilepic:{
        type: String,
        default: 'https://res.cloudinary.com/db9dt41gx/image/upload/v1625578212/NextShop/image873_d6jrxl.png'
    },
    root:{
        type: Boolean,
        default: false
    }


},
{
    timestamps: true
})

//dataset
let Dataset= mongoose.models.user || mongoose.model('user',userSchem)
//now export
export default Dataset;