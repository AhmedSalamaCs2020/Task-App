const mongoose=require('mongoose')

const issuesSchema=mongoose.Schema({
    description:{
        type:String,
        trim:true,
        required:true
    },
   owner:{ 
        type:mongoose.Schema.Types.ObjectId,
        required:true ,
        ref:"Users"//reference to user table
    },
    data:{ type: Schema.Types.ObjectId, ref:'Users' }
    
},
{
    timestamps:true
}
)


const model = mongoose.model('Issues',issuesSchema)

module.exports=model