const {MongoClient, ObjectId} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');
  const db = client.db('TodoApp');

  // db.collection('Todos').deleteMany({text: 'Read Books'}).then((result)=>{
  //   console.log(result);
  // });
  // db.collection('Todos').deleteOne({text: 'Read Books'}).then((result)=>{
  //   console.log(result);
  // });
  db.collection('Todos').findOneAndDelete({_id: new ObjectId('5c7a2bddc14e9b9b5d29969c')}).then((result)=>{
    console.log(result);
  });

  client.close();
});
