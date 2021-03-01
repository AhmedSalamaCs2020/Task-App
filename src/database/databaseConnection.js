const mongoose = require('mongoose'); //primary
//const validator = require('validator');
const url = 'mongodb://localhost:27017/TaskApp'//database name
mongoose.connect(url, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false }); 