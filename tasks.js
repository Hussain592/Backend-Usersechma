import express from "express"
import Tasks from "..Routers/tasks.js"
import sendre from "../Help/sendre"
const app = express.Router()



app.post("/",async(req,res)=>{
    const {tasks} = req.body
    let newtasks = new Tasks ({tasks})
    newtasks = await newtasks.save()
   sendre(res,201,newtasks,false,"tasks add successfull")
})

app.get("/",async(req,res)=>{
   const tasks = await Tasks.find()
    sendre(res,200,tasks,false,"tasks fetch successfull")
})

app.get("/:id", async (req, res) => {
    const tasks = await Tasks.findById(req.params.id)
    if (!tasks) {
        return sendre(res, 404, null, true, "task is not found")
    }
     sendre(res, 200, tasks, false, "task is successfull")
})




export default app 