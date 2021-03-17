const mongoose = require('mongoose'); //primary
//const validator = require('validator');
const url = process.env.MONGODB_URL //database name
mongoose.connect(url, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false}); 