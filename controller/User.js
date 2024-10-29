import User from "../models/User.js";

export const createUser = async (req, res) => {
  try {
    const { auth0Id, email, name, company, role } = req.body;

    const existingUser = await User.findOne({ auth0Id });

    if (existingUser) {
      return res.status(200).json({ message: "User already exists" });
    }

    const newUser = new User({
      auth0Id,
      email,
      name,
      company,
      role,
    });

    await newUser.save();

    res.status(201).json(newUser.toObject());
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Error creating user" });
  }
};


export const getUser=async(req,res)=>{
    try {
        const user=await User.findById(req.userId);

        if(!user){
            return res.status(400).json({
                message:"User Not Found"
            })
        }
        return res.status(200).json(user.toObject())
    } catch (error) {
        console.error("User Not Found",error)
        res.status(500).json({
            message:"Error Fetching User"
        })
    }
}



export const editUser=async (req,res)=>{
    try {
        const user=await User.findById(req.userId)
        if(!user){
            return res.status(404).json({
                message:"User Not Found"
            })
        }
        const {name,email,company,role}=req.body
        user.name=name
        user.email=email
        user.company=company
        user.role=role
        await user.save();
        res.status(200).json(user.toObject())
    } catch (error) {
        console.error("Error making changes",error)
        res.status(500).json({
            message:"Error Making Changes"
        })
    }
}