const {MongoClient, ObjectId} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');
  const db = client.db('TodoApp');


//   db.collection('Todos').findOneAndUpdate(
//     {text: 'Eat lunch'},
//     {$set: {completed: true}},
//     {returnOriginal: false}
// ).then((result)=>{
//     console.log(result);
//   });
db.collection('Users').findOneAndUpdate(
  {"_id" : new ObjectId("5c7687617950c715182bc4b9")},
  {$set: {name: 'Priyanshu'},
  $inc: {age: 1}},
  {returnOriginal: false}
).then((result)=>{
  console.log(result);
});

  client.close();
});
