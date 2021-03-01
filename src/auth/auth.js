const jwt =require('jsonwebtoken')
const user =require('../models/user_model')
const auth=async (req,res,next)=>{
try {
    const token=req.header('token')
   const isCorrect= jwt.verify(token,"Ahmed Salama")

  const validateUser=user.findOne({"_id":isCorrect._id})
  if(!validateUser){
      throw new Error()
  }
 // req.user=validateUser
  next()
  
} catch (error) {
    res.send({"error":'please Authienticated'})
}
}

module.exports=auth