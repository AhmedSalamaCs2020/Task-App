const userModel = require('../src/models/user_model');

const express = require('express')
 
const router = express.Router()
//
router.post('/users',async (req, res) => {

  const data = userModel(req.body)
  try {
    await data.save()
  const token= await userModel.generateAuthToken()// here we generate token by id of user
    
  //  res.status(201).send({token,data})
  
  } catch (error) {
   // res.status(400).send(error)
  }
}
)
//
router.get('/getUsers', async(req, res) => {

try {
  const data =await userModel.find({})
  res.status(200).send(data)
} catch (error) {
  res.status(400).send(error)
}

})
//
router.get('/users', async(req, res) => {

  const passedID = req.body
  try {
const user= await userModel.findById({_id:passedID["id"]})
  if(!user)
   return res.status(404).send({"Message":"Invalid User ID"})
   res.status(200).send(user)
  } catch (error) {
    res.status(500).send({"Message":"Invalid User ID"})
  }
 
})
//
/*{
  "_id": "603ea4a1490e5d00157beeac",
  "name": "Ahmed salama",
  "email": "ahmeds@gmail.com",
  "password": "$2a$08$NyQ11NQsc8qRVMfyw70gXe3k.fo.fZRJlS0N8lEx5DZe9DqtyfqpO",
  "age": 27,
  "__v": 0
},*/
router.patch("/users",async (req,res)=>{
const allowedUpdates = ['name', 'email', 'password', 'age']
  var updates = Object.keys(req.body)
  //console.log(updates)
  const data=req.body;
  const id=data["id"]
  updates = updates.filter(function(item) {
    return item !== "id"
})
const isValidOperation = updates.every((update) =>
allowedUpdates.includes(update)
)
if (!isValidOperation) {
 return res.status(400).send({ error: 'Invalid updates!' })
}
  try {
    const user= await userModel.findById({"_id":id})
     if(!user)
     return res.status(404).send({ error: 'Invalid User!' })
    allowedUpdates.forEach((element)=>user[element]=data[element])
  await user.save()
   res.send(user)

  } catch (error) {
    res.send({"Message":"Check Your Token"})
  }

})

router.delete("/user",async(req,res)=>{

try {

  const item=await userModel.deleteOne({_id:req.body["id"]}) 
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
router.post('/login',async (req,res)=>{
  console.log(req.body)
  const email=req.body["email"]
  const password=req.body["password"]
  try {
 const user=await userModel.findByCredentials(email,password);
 const token=await userModel.generateAuthToken();
    res.send({user,token})
  } catch (error) {
    res.send({"Message":"Invalid User"})
  }


})

module.exports = router
