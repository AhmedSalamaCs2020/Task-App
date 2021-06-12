const mongoose=require('mongoose')
var validator = require("validator");
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const Task=require('./task_model');
const { Double } = require('mongodb');
//
const schema=mongoose.Schema({
  name:{
      type:String,
      required: true,
      trim:true,
  },
  phone:{
    type:String,
    unique: true,
    required: true,
    trim:true,
    lowercase:true,
  
  },
  password:{
    type:String,
    trim:true,
    minlength:7,
    required:true,
    validate(value){
      if(value.toLowerCase().includes("password")){
        throw new Error('Password cannot contain "password"')
      }
    }
  },
  type:{
    type:String,
    trim:true,
  },
  activated:{
    type:Boolean,
    trim:true,
  },
  lat:{
    type: Double,
    trim:true,
  },
  long:{
    type:Double,
    trim:true,
  }
},
{
  timestamps:true  
})
//
schema.virtual('tasks',{//name of virtual relation
  ref:'Tasks',//table name
  localField:"_id",//pk
  foreignField: 'owner'//fk
})
schema.virtual('issues',{//name of virtual relation
  ref:'Issues',//table name
  localField:"_id",//pk
  foreignField: 'owner'//fk
})
//
schema.statics.findByCredentials=async(phone,password)=>{
const user= await model.findOne({phone:phone})
//console.log(user);
 if(!user)
 throw new Error('Unable to login')
 const isMatch=await bcrypt.compare(password,user.password)
 if(!isMatch)
 throw new Error('Unable to login')
return user
}

schema.methods.generateAuthToken= async function () {
  const user=this
  const token=jwt.sign({ _id: user._id},process.env.JWT)

  return token
}

schema.methods.getPublicProfile=function(){
const user=this
var userObject=user.toObject()
delete userObject.password

return  userObject 
}

schema.pre('save',async function(next){//used in Create User and update
  // arrow function not binding values 
  const user =this
  if(user.isModified("password")){
   user.password =await bcrypt.hash(user.password,8)
  }

})
//delete user's tasks when user deleted
schema.pre('remove',async function(next){
  const user=this
  await Task.deleteMany({'owner':user._id})
  next()
})

const model=mongoose.model('Users',schema)

module.exports=model