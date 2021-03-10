const userModel = require('../src/models/user_model');

const express = require('express')
 
const router = express.Router()
const auth=require('../src/auth/auth')
//
router.post('/users',async (req, res) => {
  //done
  const userone =await userModel.find({"email":req.body["email"]})
if(userone.length>0)
res.send({"message":"Email Is Already Exists"})
  const data = userModel(req.body)
  try {
    await data.save()
  const token= await data.generateAuthToken()// here we generate token by id of user
    
    res.status(201).send({token,data})
  } catch (error) {
    res.status(400).send(error)
  }

}
)
//
router.get('/getUsers', auth,async(req, res) => {
//done 
try {
  const data =await userModel.find({})
  res.status(200).send(data)
} catch (error) {
  res.status(400).send(error)
}

})
//
router.get('/users/me', auth,async(req, res) => {//profile
  //done
  try {
res.send(req.user)
  } catch (error) {
    res.status(500).send({"Message":"Invalid User ID"})
  }
 
})
router.patch("/users",auth,async (req,res)=>{
const allowedUpdates = ['name', 'email', 'password', 'age']
  var updates = Object.keys(req.body)
  //console.log(updates)
  //const data=req.body;
  //const id=data["id"]
  /*updates = updates.filter(function(item) {
    return item !== "id"
})*/
const isValidOperation = updates.every((update) =>
allowedUpdates.includes(update)
)
if (!isValidOperation) {
 return res.status(400).send({ error: 'Invalid updates!' })
}

  try {
   /* const user= await userModel.findById({"_id":id})
     if(!user)
     return res.status(404).send({ error: 'Invalid User!' })*/
    allowedUpdates.forEach((element)=>req.user[element]=req.body[element])
  await req.user.save()
   res.send(req.user)

  } catch (error) {
    res.send({"Message":"Check Your Token"})
  }

})
// delete using token also
 router.delete("/user/me",auth,async(req,res)=>{
 //done
try {

/*  const item=await userModel.deleteOne({_id:req.body["id"]}) 
  if(item["deletedCount"]==1)
  res.status(200).send({"message":"Item Deleted"})
  else{
    res.status(200).send({"message":"Item Already Deleted"})
  }*/

 await req.user.remove()
 res.send(req.user)

} catch (error) {
  res.send({"message":"error request"})
}

})

///
router.post('/login',async function (req,res){
  const email=req.body["email"]
  const passwords=req.body["password"]
  try {
 var user=await userModel.findByCredentials(email,passwords);//beacuase static method 
 const token=await user.generateAuthToken();// not static 
    res.send({"user":user.getPublicProfile(),token});// not static 
  } catch (error) {
    console.log(error);
    res.send({"Message":"Invalid User"})
  }


})

module.exports = router
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MTUyMDYzMTd9.QWHYwJqgUvnUxxbLGDWo6PVI4yG5qGRj6ucMymL-naY