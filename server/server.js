const express = require('express');
const bodyParser = require('body-parser');
const {ObjectId}= require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} =require('./models/todo');
var {User} = require('./models/user');

const port =(process.env.PORT || 3000 );
var app = express();
app.use(bodyParser.json());

app.post("/todos", (req, res)=>{
  var todo = new Todo({
    text: req.body.text
  });
  todo.save().then((doc)=>{
    res.send(doc);
  },(e)=>{
    res.status(400).send(e);
  });
});

app.get("/todos", (req, res)=>{
  Todo.find().then((todos)=>{
    res.send({todos});
  },(e)=>{
    res.status(400).send(e);
  });
});

app.get('/todos/:id', (req, res)=>{ /////////////-------------Find Specific todo by ID
  var id = req.params.id;
  if(!ObjectId.isValid(id)){  //Check if Object Id is valid
    return res.status(404).send();
  }
  Todo.findById(id).then((todo)=>{   //Find the todo :if valid
    if(!todo){
      return res.status(404).send();   //if todo with the Id is not found
    }
    res.send(todo); //happy case: todo found
  }).catch((e)=>{
    res.status(404).send(); // catch any error
  })
})

app.listen(port,()=>{
  console.log(`server is running at ${port} `);
});

module.exports = {app};
