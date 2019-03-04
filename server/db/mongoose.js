const mongoose = require('mongoose');

mongoose.Promise =  global.Promise;
mongoose.connect('mongodb://priyanshu:Qwerty@1234@ds137703.mlab.com:37703/todo-api'||'mongodb://localhost:27017/TodoApp', { useNewUrlParser: true });


module.exports ={mongoose};
