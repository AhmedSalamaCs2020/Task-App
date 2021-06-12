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
router.get("/tasks",auth,async(req,res)=>{
   const match = {"owner":req.user._id}
   const sort = {}
   //using query String 
  if (req.query.completed&&(req.query.completed=="true"||req.query.completed=="false")) {
      match.completed=req.query.completed
     }
//
     if(req.query.sort&&req.query.sort=="desc"){
      sort.createdAt=-1
     }
     else if(req.query.sort&&req.query.sort=="asc"){
      sort.createdAt=1
     }
    
      
   try {
  //const tasks  = await taskModel.find(match).limit(parseInt(req.query.limit))
  await req.user.populate({path:"tasks"
  ,match,
  options:{
    limit:parseInt(req.query.limit),
    skip:parseInt(req.query.skip),
    sort:sort
  }}).execPopulate()
  res.status(200).send(req.user.tasks) 
   } catch (error) {
      res.status(500).send(error)
   }

})
//
router.get('/tasks/:id',auth,async(req,res)=>{
    const _id=req.params.id
   try {
      const task= await taskModel.findOne({_id,"owner":req.user._id})
     if(!task)
     return  res.status(404).send({"Message":"Invalid Task ID"})
     res.status(200).send(task) 
   } catch (error) {
      res.status(500).send({"Message":"Invalid Task ID"})
   }

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
router.delete("/tasks/:id",auth,async(req,res)=>{

   try {
     const item=await taskModel.deleteOne({_id:req.params.id,"owner":req.user._id}) 
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