const taskModel=require('../src/models/task_model')
const auth=require('../src/auth/auth')
const express=require('express')
//
const router=express.Router()
//
router.post("/tasks",auth,async(req, res)=>{
   try {
      const response =taskModel({...req.body,"owner":req.body['id']})
      const data= await response.save()
      res.status(201).send(data)
   } catch (error) {
      res.status(400).send(error)
   }

})
//
router.post("/getTasks",auth,async(req,res)=>{
      
   try {
  const tasks = await taskModel.find({"marketID":req.body['marketID']})
  
  res.status(200).send(tasks) 
   } catch (error) {
      res.status(500).send(error)
   }

})
//
router.post("/getTasksUser",auth,async(req,res)=>{
      
   try {
  const tasks = await taskModel.find({"owner":req.body['owner']})
  
  res.status(200).send(tasks) 
   } catch (error) {
      res.status(500).send(error)
   }

})
//
router.post("/allTasks",auth,async(req,res)=>{
      
   try {
  const tasks = await taskModel.find()
  
  res.status(200).send(tasks) 
   } catch (error) {
      res.status(500).send(error)
   }

})

//
router.post("/getDelievery",auth,async(req,res)=>{
      
   try {
  const tasks = await taskModel.find({"owner":req.body['owner'],"done":req.body['done']})
  
  res.status(200).send(tasks) 
   } catch (error) {
      res.status(500).send(error)
   }

})
//
router.put("/getDelievery",auth,async(req,res)=>{
      
   try {
  const tasks = await taskModel.findByIdAndUpdate(req.body['id'],{"done":req.body['done']},{ new: true })
  
  res.status(200).send(tasks) 
   } catch (error) {
      res.status(500).send(error)
   }

})
//
router.put("/tasks",auth,async (req,res)=>{
   const data =await taskModel.findByIdAndUpdate(req.body["id"],{completed: req.body["completed"]},{ new: true })
   res.send(data)
 })
 //
 router.put("/distanceTotal",auth,async (req,res)=>{
   const data =await taskModel.findByIdAndUpdate(req.body["id"],{total: req.body["total"],distance:req.body['distance']},{ new: true })
   res.send(data)
 })
//
 router.put("/changeStatus",auth,async (req,res)=>{
   const data =await taskModel.findByIdAndUpdate(req.body["id"],{status: req.body["status"]},{ new: true })
   res.send(data)
 })

//
router.patch('/tasks/:id',auth,async(req,res)=>{
   const allowedUpdates=["completed","description"]
   var updates=Object.keys(req.body)

  /* updates = updates.filter((item)=> {
      return item !== "id"
  })*/
  //remove id from update 
   const isValidOperation = updates.every((update) =>
   allowedUpdates.includes(update)
   )
   console.log(isValidOperation);
   if(!isValidOperation)
      return res.status(400).send({ error: 'Invalid updates!' })
   
    try {
      const task= await taskModel.findOne({_id:req.params.id,"owner":req.user._id});
      if(!task)
      return res.status(404).send({ error: 'Invalid Task!' })
     updates.forEach((item)=>{task[item]=req.body[item]})
     res.status(200).send(task);

    } catch (error) {
      res.status(404).send({"Message":"Invalid"});
    }

})
//
router.delete("/tasks",auth,async(req,res)=>{

   try {
     const item=await taskModel.deleteOne({_id:req.body['id'],"owner":req.body['owner']}) 
     if(item["deletedCount"]==1)
     res.status(200).send({"message":"Item Deleted"})
     else{
       res.status(200).send({"message":"Item Already Deleted"})
     }
   
   } catch (error) {
     res.send({"message":"error request"})
   }
   
   })
 ///
 router.delete("/specificTask",auth,async(req,res)=>{

   try {
     const item=await taskModel.deleteOne({_id:req.body['id']}) 
     if(item["deletedCount"]==1)
     res.status(200).send({"message":"Item Deleted"})
     else{
       res.status(200).send({"message":"Item Already Deleted"})
     }
   
   } catch (error) {
     res.send({"message":"error request"})
   }
   
   })
   //
   router.delete('/deleteAllTasks', auth,async(req, res) => {
      //done 
      try {
        const data =await taskModel.remove()
        res.status(200).send(data)
      } catch (error) {
        res.status(400).send(error)
      }
      
      }) 


module.exports=router