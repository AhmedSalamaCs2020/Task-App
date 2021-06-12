const issuesModel = require('../src/models/issues_model');
const userModel = require('../src/models/user_model');
const express = require('express')
const router = express.Router()
const auth=require('../src/auth/auth');

router.post("/issue",auth,async(req, res)=>{
 
    try {
       const response =issuesModel({...req.body,"owner":req.user._id})
       const data= await response.save()
       res.status(201).send(data)
    } catch (error) {
       res.status(400).send(error)
    }
 
 })
 //
router.get('/issue', auth,async(req, res) => {
  // const match = {"owner":req.user._id}
    //done 
    try {
      const data =await issuesModel.find({})
  

      await req.user.populate({path:"issues"
 }).execPopulate()
      res.status(200).send(req.user.issues) 
        //  
    } catch (error) {
      res.status(400).send(error)
    }
    
    }) 
module.exports=router