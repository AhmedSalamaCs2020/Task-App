const mongoose=require('mongoose')

var validator = require("validator");
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

const schema=mongoose.Schema({
  name:{
      type:String,
      required: true,
      trim:true,
  },
  email:{
    unique : true,
    type:String,
    required: true,
    trim:true,
    lowercase:true,
    validate(value){
     if( !validator.isEmail(value))
     throw new Error('Email is invalid')
    }
  },
  age:{
      type:Number,
      trim:true,
      validate(value){
        if(value<0){
          throw new Error('Age must be a positive number')
        }
      }
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
  }

})
schema.statics.findByCredentials=async(email,password)=>{
const user= await model.findOne({email:email})
console.log(user);
 if(!user)
 throw new Error('Unable to login')
 const isMatch=await bcrypt.compare(password,user.password)
 if(!isMatch)
 throw new Error('Unable to login')
return user
}
schema.statics.generateAuthToken=async function (userID) {
  const token=jwt.sign({ _id: userID},"Ahmed Salama")
  console.log(userID);
  return token
}


schema.pre('save',async function(next){//used in Create User and update
  // arrow function not binding values 
  const user =this
  if(user.isModified("password")){
   user.password =await bcrypt.hash(user.password,8)
  }

})

const model=mongoose.model('Users',schema)

module.exports=model