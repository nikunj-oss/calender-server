import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    auth0Id:{
        type:String,
        required:true,
        unique:true
    },
    name:{
        type:String,
    },
    email:{
        type:String,
        required:true
    },
    company:{
        type:String,
    },
    role:{
        type:String,
    }
})

const User=mongoose.model("User",userSchema)

export default User