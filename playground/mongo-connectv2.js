// Connect to the Mongo Server
const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient('mongodb://localhost:27017');
client.connect(function(err) {
  if(err){
    return console.log('Unable to connect to MongoDB');
  }
  console.log("Connected successfully to server");
  const db = client.db('TodoApp');
//----------------------Insert Document in Users collection
  // db.collection('Users').insertOne({
  //   name: 'Priyanshu',
  //   age: 20,
  //   location: 'India'
  // },(err, result) => {
  //   if (err) {
  //     return console.log('Unable to insert user', err);
  //   }console.log(result.ops);
  // });
//----------------------Insert Document in Todos collection
  // db.collection('Todos').insertOne({
  //   text: 'Go to Gym',
  //   completed:false
  // },(err, result) => {
  //   if (err) {
  //     return console.log('Unable to insert user', err);
  //   }console.log(result.ops);
  // });
    client.close();
  });
