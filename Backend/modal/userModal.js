const mongoose = require("mongoose");
const {Schema} = mongoose;
const userSchema = new Schema({
    username:{
        type:String,
        required:true,
        min:4,
        max:20,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        max:50,
    },password:{
        type:String,
        required:true,
        max:6,
    },
    isAvatarImageSet:{
        type:Boolean,
        default:false
    },
    avatarImage:{
        type:String,
        default:"",
    },
});
module.exports = mongoose.model("Users" ,userSchema );