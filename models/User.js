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
},{timestamps:true})


module.exports = mongoose.models.User || mongoose.model('User', UserSchema)