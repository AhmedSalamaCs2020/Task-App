const userModel = require('../src/models/user_model');
const express = require('express')
const router = express.Router()
const auth=require('../src/auth/auth');

router.post('/users',async (req, res) => {
  //done
  const userone =await userModel.find({"phone":req.body["phone"]})
if(userone.length>0)
res.send({"message":"false"})
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
/*const upload = multer({
//  dest: 'avatars',
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
    return cb(new Error('Please upload a image'))
    }
    cb(undefined, true)
    }
 })*/
 //
 /*router.post('/users/me/avatar',auth, upload.single('avatar'), async(req, res) => {
  req.user.avatar =req.file.buffer
  await req.user.save()
 res.send()
}, (error, req, res, next) => {
 res.status(400).send({ error: error.message })
})*/
//
/*router.delete('/users/me/avatar',auth,async(req,res)=>{
req.user.avatar=undefined
await req.user.save()
res.status(200).send()

})*/
//
/*router.get('/users/me/avatar',auth,async(req,res)=>{
  try {
    const user =userModel.findById(req.user._id)
    if(!user||!user.avatar){
   throw new Error()
    }
    res.set('Content-Type', 'image/png')

    res.sendStatus(200).send(user.avatar)
  } catch (error) {
    res.sendStatus(400).send()
  }
})*/


module.exports = router
