import mongoose from "mongoose";
import User from "./User.js";


const eventSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    time:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:User,
        required:true
    },
    remind:{
        type:Boolean,
        default:false
    }
})

const Event=mongoose.model("Event",eventSchema)

export default Event;