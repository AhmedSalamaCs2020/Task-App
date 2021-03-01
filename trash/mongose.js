//the usage of mongoose is to create models
//the usage of mongoose is data validation and sanitaiztion
/*const mongoose = require('mongoose');
const validator = require('validator');
const url='mongodb://localhost:27017/mongodbm2'//database name
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});
////////////////////////Here Define Tasks ///////////////////////////
const Task = mongoose.model('Task', 
{
    description:{
    type:String,
    },
    completed:{ 
        type:Boolean // can put defalut value 
        },
}
);
*/
// definations of model
//module.exports=Task

/*Task.updateMany({completed:true}, function (err, result) { 
    if (err){ 
        console.log(err) 
    }else{ 
        console.log("Result :", result)  
    } 
});*/
/*const tasks=new Task({
    description:"HELLO AHMED SALAMA IN NODE JS WITH FLUTTER INTEGRATION",
   completed:false
})*/
/*tasks.save().then((value)=>{
    console.log(value)
}).catch((error)=>{
    console.log(error)
})*/
//////////////////////HERE Define User//////////////////////
/*const User = mongoose.model('User', 
{
    name:{
        type:String,
        required: true,
        trim: true
    },
    age:{
        type:Number,
        required: true,
        trim: true,
        validate(age){
            if(age<=0||age>70){
                throw new Error('Age Must be Positive Number');
            }
        }
    },
    email:{
        type:String,
        required: true,
        trim: true,//data sanitazation
        lowercase: true,
          validate(value){
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
                }
          }
    },
    password:{
        type:String,
        required:true,
        trim: true,//data sanitazation
        validate(password){
          if(password.length<=6)
             throw new Error('Invalid Password')
        }
    }
           
}
);// definations of model
const me =new User({// fill the model
    name:'Ahmed salama',
    age:5,
    email:"acmainshams@gmail.com",
    password:"1111111111111111112"
}
)



me.save().then((value)=>{//here we using promises
    console.log(value)
}).catch((error)=>{

    console.log(error)
})*/

require('../src/database/databaseConnection')//connect database mongose db 
const Task=require("../src/models/task_model")
 
Task.findByIdAndRemove("602bcb4607b44c163493f615").then((result)=>{
  //  console.log(result);
    return Task.countDocuments({"completed":false})
}).then((count)=>{
 console.log(count);
})
