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
    },
   owner:{ 
        type:mongoose.Schema.Types.ObjectId,
        required:true ,
        ref:"Users"//reference to user table
    },
    deleveryName:{
        type:String,
        trim:true,
        required:true
    },
    marketID:{
        type:String,
        trim:true,
        required:true
    }
},
{
    timestamps:true
}
)


const model = mongoose.model('Tasks',taskSchema)

module.exports=model