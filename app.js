import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import cors from "cors"
import corsOptions from "./constants/config.js"
import userRoute from "./routes/UserRoutes.js"
import eventRoute from "./routes/EventRoutes.js"
import "./services/cron.js"

dotenv.config({
    path: './.env'
})
mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB Connected..."))

const app=express()
const PORT=process.env.PORT || 3000



app.use(express.json());
app.use(cors(corsOptions))

app.use("/api/v1/user",userRoute)
app.use("/api/v1/event",eventRoute)


app.listen(PORT,()=>{
    console.log(`Server running on the port ${PORT}`)
})
