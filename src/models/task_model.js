const mongoose=require('mongoose')

const taskSchema=mongoose.Schema({
    description:{
        type:String,
        trim:true
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
    },
    phone:{
        type:String,
        trim:true,
        required:true
    },
    status:{
        type:String,
        trim:true,
        required:true
    },
    total:{ 
        type:String,
        default:0 
    },
    distance:{ 
        type:String,
        default:0 
    },
},
{
    timestamps:true
}
)


const model = mongoose.model('Tasks',taskSchema)

module.exports=model