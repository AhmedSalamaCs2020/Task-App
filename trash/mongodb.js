//CRUD create read update delete
//const mongodb=require('mongodb')
//const MongoClient = mongodb.MongoClient
const { MongoClient, ObjectID } = require('mongodb')
//const id = new ObjectID()
//console.log(id) // Print new id to the console 
const connectionURL = 'mongodb://localhost:27017'
const databaseName = 'mongodbm'

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client)=> {
 if (error) {
 return console.log('Unable to connect to database!')
 }
const db = client.db(databaseName)
 // Start to interact with the database
db.collection('tasks').deleteOne({// delete the first element only 
    description:"Renew inseption"
}).then((val)=>{
    console.log(val)
}).catch((error)=>{
    console.log(error)
})


})
////This all methods of database//
const readData=function(){
    db.collection('tasks').find({ completed: false }).toArray((error, tasks) => {
        if(error)
        return error
        console.log(tasks)
       })
}

const insermany=function(){
db.collection('users').insertMany(
   [ {
        "name":"omar",
        "age":"17"
    },
    {
        "name":"atef",
        "age":"23"
    }]
    )
}
//
const insertOne=function(){
db.collection('users').insertOne(
{
    "name":"Ahmed",
    "age":"23"
},
(error,results)=>{
    console.log(results.ops)
}
)
}
//
const insertManyTasks=function(){
db.collection('tasks').insertMany([
    {"description":"clean house","completed":true},
    {"description":"Renew inseption","completed":false},
    {"description":"pot plants","completed":false},
],
(error,result)=>{
    console.log(result)
}
)}

const searchByID=function(){
    db.collection('tasks').find({"_id":new ObjectID("5fca417be22f9f337051a8b4") }).toArray((error, tasks) => {
        console.log(tasks)
       })
}
 /*
 db.collection('tasks').find({"_id":new ObjectID("5fca417be22f9f337051a8b4") }).toArray((error, tasks) => {
    console.log(tasks)
   })
 */
/*
db.collection('tasks').updateOne({
    _id: new ObjectID("5fca4033863250335cb055bd") //put id here 
   }, {
   $set:{ //here the function of to update operation max ,min , inc  // behaviour must be 
    "description":"NODE JS COURSE"
   }}).then((result) => { //this is the defination of promise if sucess
    console.log(result)
   }).catch((error) => {// this if rejected 
    console.log(error)
   })*/
  //
  /*
db.collection('tasks').updateMany( //here u will update more than one .
    {
        completed:false
    },
    {
       $set: {
        completed:true  
       }
    }
).then((value)=>{
    console.log(value)
}).catch((error)=>{
    console.log(error)
})

  */