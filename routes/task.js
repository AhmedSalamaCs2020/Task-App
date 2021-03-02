const taskModel=require('../src/models/task_model')

const express=require('express')

const router=express.Router()

router.post("/tasks",async(req, res)=>{

   try {
      const response =taskModel(req.body)
      console.log(req.body);
      const data= await response.save() // await == then
      res.status(201).send(data)
   } catch (error) {
      res.status(400).send(error)
   }

})
//
router.get("/getTasks",async(req,res)=>{

   try {
  const tasks  = await taskModel.find({})
  res.status(200).send(tasks)
   } catch (error) {
      res.status(500).send(error)
   }

})
//
router.get("/getTask",async(req,res)=>{

   const data=req.body;
   try {
      const task= await taskModel.findById({_id:data["id"]})
     if(!task)
     return  res.status(404).send({"Message":"Invalid Task ID"})
     res.status(200).send(task) 
   } catch (error) {
      res.status(500).send({"Message":"Invalid Task ID"})
   }

})
//
router.patch('/task',async(req,res)=>{
   const allowedUpdates=["completed","description"]
   var updates=Object.keys(req.body)

   updates = updates.filter((item)=> {
      return item !== "id"
  })
  //remove id from update 
   const isValidOperation = updates.every((update) =>
   allowedUpdates.includes(update)
   )
   if(!isValidOperation)
      return res.status(400).send({ error: 'Invalid updates!' })
   
    try {
      const task= await taskModel.findById(req.body["id"]);
      if(!task)
      return res.status(404).send({ error: 'Invalid Task!' })
     updates.forEach((item)=>{task[item]=req.body[item]})
     res.status(200).send(task);

    } catch (error) {
      res.status(404).send({"Message":"Invalid"});
    }

})
//
router.delete("/task",async(req,res)=>{

   try {
     const item=await taskModel.deleteOne({_id:req.body["id"]}) 
     if(item["deletedCount"]==1)
     res.status(200).send({"message":"Item Deleted"})
     else{
       res.status(200).send({"message":"Item Already Deleted"})
     }
   
   } catch (error) {
     res.send({"message":"error request"})
   }
   
   })

module.exports=router