import express from "express"
import mongoose from "mongoose"
import morgan from "morgan"  
import tasks from "./Routers/tasks.js"  
import auth from "./Routers/auth.js"    



const app = express()   
const PORT = 5000



app.use(morgan("tiny"))
app.use(express.json())


app.get("/", (req,res) => {
    res.send("backend is running")
})

app.use("/tasks",tasks)  
app.use("/auth",auth)                                                            

mongoose
.connect(process.env.MONGODB)
.then(()=>console.log("mongodb is connected"))
.catch((err)=>console.log("error",err));












app.listen(PORT, () => {
    console.log(`app is running: ${PORT}`)
})
