const userModel = require('../src/models/user_model');
const express = require('express')
const router = express.Router()
const auth=require('../src/auth/auth');

router.post('/users',async (req, res) => {
  //done
  const userone =await userModel.find({"phone":req.body["phone"]})
if(userone.length>0){
res.send({"message":"false"})
return
}
  const data = userModel(req.body)
  try {
    await data.save()
    //sendWelcomeEmail(email,name)
  const token= await data.generateAuthToken()// here we generate token by id of user
    
    res.status(201).send({token,data})
  } catch (error) {
    res.status(400).send(error)
  }

}
)
//
router.post('/getUsers', auth,async(req, res) => {
//done 
try {
  const data =await userModel.find({"type":req.body["type"]})
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
//
router.put("/users",auth,async (req,res)=>{
  const data =await userModel.findByIdAndUpdate(req.body["id"],{activated: req.body["activated"]},{ new: true })
  res.send(data)
})
//
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
 //sendCancelationEmail(email,name)
 res.send(req.user)

} catch (error) {
  res.send({"message":"error request"})
}

})

///////////////////Login/////////////////////////////////
router.post('/login',async function (req,res){
  const phone=req.body["phone"]
  const passwords=req.body["password"]
  try {
 var user=await userModel.findByCredentials(phone,passwords);//beacuase static method 
 const token=await user.generateAuthToken();// not static 
    res.send({"user":user.getPublicProfile(),token});// not static 
  } catch (error) {
    res.send(error)
  }


})

//
router.put("/locationUser",auth,async (req,res)=>{
  const data =await userModel.findByIdAndUpdate(req.body["id"],{lat: req.body["lat"],long: req.body["long"]},{ new: true })
  res.send(data)
})
//



module.exports = router
