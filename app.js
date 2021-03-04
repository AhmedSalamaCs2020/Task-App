//tools
const express=require('express')
const app=express()
const port=process.env.PORT || 3000
const taskRoute=require('./routes/task')

const userRoute=require('./routes/user')

//connect database mongose db 
require('./src/database/databaseConnection')


//middlewares
var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }))
app.use(taskRoute)
app.use(userRoute)

//
app.listen(port)
//"nodemon -e * app.js"