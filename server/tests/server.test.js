const expect = require('expect');
const request = require('supertest');

const {app}= require('./../server');
const {Todo}= require('./../models/todo');

const todos=[
  {text: 'First test todo'},
  {text: 'Secons test todo'}
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
