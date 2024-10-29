import Event from "../models/Event.js"
import User from "../models/User.js"

export const getEvent=async (req,res)=>{
    try {
        const user=req.userId;
        const currUser=await User.findById(user)
        if(!currUser){
            res.status(404).json({message:"User Not Found"})
        }
        const event=await Event.find({user:currUser})
        res.status(200).json(event)

    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Error Fetching events"})
    }
}

export const updateEvent=async (req,res)=>{
    try {
        const user=req.userId;
        const id=req.params.id
        const currUser=await User.findById(user)
        if(!currUser){
            res.status(404).json({message:"User Not Found"})
        }
        const {title,description,date,time}=req.body;
        const event=await Event.findById(id)
        if(!event){
            res.status(404).json({message:"Event Not Found"})
        }
        event.title=title
        event.description=description
        event.date=date
        event.time=time

        await event.save();

        res.status(200).json("Updated Successfully")
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Error Updating the event"})
    }
}


export const deleteEvent=async (req,res)=>{
    try {
        const user=req.userId
        const id=req.params.id
        const currUser=await User.findById(user)
        if(!currUser){
            res.status(404).json("User not found")
        }
        const event=await Event.findById(id)
        if(!event){
            res.status(404).json("Event not found")
        }
        await Event.deleteOne({_id:id})
        res.status(200).json("Event Deleted Successfully")

    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Error removing event"})
    }
}


export const createEvent=async (req,res)=>{
    try {
        const {title,description,time,date}=req.body
        const user=req.userId;
        const exist=User.findById({user});
        if(!exist){
            return res.status(400).json({message:"User not found"})
        }
        const newEvent=new Event({
            title:title,
            description:description,
            time:time,
            date:date,
            user:user
        })

        await newEvent.save();
        res.status(201).json({message:"Event created successfully"})

    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Error creating events"})
    }
}


export const remindEvent=async (req,res)=>{
    try {
        const user=req.userId
        const id=req.params.id
        const currUser=await User.findById(user)
        if(!currUser){
            res.status(404).json("User not found")
        }
        const event=await Event.findById(id)
        if(!event){
            res.status(404).json("Event not found")
        }
        event.remind=!event.remind;

        await event.save();
        res.status(200).json({message:"Event reminder set"})

    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Error creating reminder"})
    }
}