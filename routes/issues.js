const issuesModel = require('../src/models/issues_model');
const express = require('express')
const router = express.Router()
const auth=require('../src/auth/auth');

router.post("/issue",auth,async(req, res)=>{
 
    try {
       const response =issuesModel({...req.body,"owner":req.user._id})
       const data= await response.save()
       res.status(201).send(response)
    } catch (error) {
       res.status(400).send(error)
    }
 
 })
 //
router.get('/issue', auth,async(req, res) => {
    //done 
    try {
      const data =await issuesModel.find({})
      res.status(200).send(data)
    } catch (error) {
      res.status(400).send(error)
    }
    
    }) 
module.exports=router