import express from "express"
import jwtParse from "../middleware/JwtParse.js";
import jwtCheck from "../middleware/JwtCheck.js";
import { createEvent, deleteEvent, getEvent, remindEvent, updateEvent } from "../controller/Events.js";


const app=express.Router();


app.get("/",jwtCheck,jwtParse,getEvent)

app.post("/",jwtCheck,jwtParse,createEvent)

app.put("/:id",jwtCheck,jwtParse,updateEvent)

app.delete("/:id",jwtCheck,jwtParse,deleteEvent)

app.put("/remind/:id",jwtCheck,jwtParse,remindEvent)





export default app;

