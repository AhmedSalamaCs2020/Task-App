const mongoose = require('mongoose'); //primary
//const validator = require('validator');
const url = 'mongodb+srv://taskapp:Salamas%23s$s123@cluster0.zuhkc.mongodb.net/TaskApp?retryWrites=true'//database name
mongoose.connect(url, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false,audoIndex: true}); 