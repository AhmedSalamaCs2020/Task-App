//tools
const express=require('express')
const app=express()
const port=process.env.PORT 
const taskRoute=require('./routes/task')

const userRoute=require('./routes/user')
const issueRoute=require('./routes/issues')

//connect database mongose db 
require('./src/database/databaseConnection')


//middlewares
var bodyParser = require('body-parser')
/*app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }))
app.use(taskRoute)
app.use(userRoute)
app.use(issueRoute)*/
//
app.listen(port,()=>{
  console.log("server is up on port"+port)
})
//"nodemon -e * app.js"
//https://guarded-chamber-64457.herokuapp.com/

//const Task = require('./src/models/task_model')
//const User = require('./src/models/user_model')

//const main = async () => {
   /* const task = await Task.findById('604a32c4005d9a0e8c129139')
     await task.populate('owner').execPopulate()
     console.log(task.owner)*/

   // const user = await User.findById('604a323c005d9a0e8c129137')
  //  await user.populate('tasks').execPopulate()
 //   console.log(user.tasks)
//}

//main()