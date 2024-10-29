import express from "express"
import jwtCheck from "../middleware/JwtCheck.js";
import { createUser,editUser, getUser } from "../controller/User.js";
import jwtParse from "../middleware/JwtParse.js";

const app=express.Router();

app.get("/",jwtCheck,jwtParse,getUser)
app.post("/",jwtCheck,createUser)
app.put("/",jwtCheck,jwtParse,editUser)


export default app