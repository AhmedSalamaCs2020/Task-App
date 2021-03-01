const mongoose=require('mongoose')

const taskSchema=mongoose.Schema({
    description:{
        type:String,
        trim:true,
        required:true
    },
    completed:{ 
        type:Boolean,
        default:false 
    }

})

const model = mongoose.model('Tasks',taskSchema)

module.exports=model