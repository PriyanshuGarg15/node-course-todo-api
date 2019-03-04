const expect = require('expect');
const request = require('supertest');
const {ObjectId} = require('mongodb');

const {app}= require('./../server');
const {Todo}= require('./../models/todo');

const todos=[
  {_id: new ObjectId ,text: 'First test todo'},
  {_id: new ObjectId ,text: 'Secons test todo'}
]
beforeEach((done)=>{
  Todo.deleteMany({}).then(()=>{
    return Todo.insertMany(todos); // seeding the database to test Get route
  }).then(()=>done());
});
describe('POST /todos',()=>{
  it('should create a todo',(done)=>{
    var text ="create a todo";

    request(app)
      .post("/todos")
      .send({text})
      .expect(200)
      .expect((res)=>{
        expect(res.body.text).toBe(text);
      })
      .end((err, res)=>{
        if(err){
          return done(err);
        }

        Todo.find({text}).then((todos)=>{
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((e)=>done(e));
      })
  })

  it('should not create an empty todo',(done)=>{
    request(app)
      .post("/todos")
      .send()
      .expect(400)
      .end((err, res)=>{
        if(err){
          return done(err);
        }
        Todo.find().then((todos)=>{
          expect(todos.length).toBe(2);
          done();
        }).catch((e)=>done(e));
      });
  });
});

describe("GET /todos", ()=>{
  it('Should get all todos', (done)=>{
    request(app)
      .get('/todos')
      .expect(200)
      .expect((res)=>{
        expect(res.body.todos.length).toBe(2);
      })
      .end(done);
  })
})
describe(" GET /todos/:id", ()=>{
  it('should get todo for valid id present in DB', (done)=>{
    request(app)
      .get(`/todos/${todos[1]._id}`)
      .expect(200)
      .expect((res)=>{
        expect(res.body.text).toBe(todos[1].text);
      })
      .end(done);
  });
  it('should give 404 for valid id but not in DB', (done)=>{
    request(app)
      .get(`/todos/${new ObjectId}`)
      .expect(404)
      .end(done);
  });
  it('should get 404 for invalid id', (done)=>{
    request(app)
      .get('/todos/123')
      .expect(404)
      .end(done);
  });
})
