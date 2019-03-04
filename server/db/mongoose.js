const mongoose = require('mongoose');

mongoose.Promise =  global.Promise;
var URL = 'mongodb://priyanshu:password123@ds137703.mlab.com:37703/todo-api'
if(!process.env.PORT){
  mongoose.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true });
}else{
  mongoose.connect( URL , { useNewUrlParser: true });
}




module.exports ={mongoose};
