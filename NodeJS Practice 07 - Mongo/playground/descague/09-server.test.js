// This is a test file for 07-server.js

const expect = require('expect');
const request = require('supertest');

// We need the express app in order to test it.
const {app} = require('./07-server');

// This test will only require the todo model and not the user model.
const {Todo} = require('./../server/models/todo');

// lets use 'describe()' to make things look greate in the output.

// The following test is going to fail because it asumes that there are currently no todos stored in the database.
/*describe('POST /todos', () => {
    it('should create a  new todo', (done) => {
        request(app)
        .post('/todos')
        .send({
            text: 'Test todo text'
        })
        .expect(200)
        .expect((res) => { // Remember that expect allows us to acces the response object.
            expect(res.body.text).toBe('Test todo text');
        })
        .end((err, response) => {
            if (err) {
                return done(err);
            }
            Todo.find().then((todos) => {
                expect(todos.length).toBe(1);
                expect(todos[0].text).toBe('Test todo text');
            }).catch((err) => done(err));
        });
    });
});*/

// Better use the beforeEach statement.

// Before each is going to let us run some code before every single test case.
beforeEach((done) => {
    Todo.remove({}).then(() => {
        done();
    });
});
// With this, the database is going to be empty before every request.

describe('POST /todos', () => {
    it('should create a  new todo', (done) => {
        request(app)
        .post('/todos')
        .send({
            text: 'Test todo text'
        })
        .expect(200)
        .expect((res) => { // Remember that expect allows us to acces the response object.
            expect(res.body.text).toBe('Test todo text');
        })
        .end((err, response) => {
            if (err) {
                return done(err);
            }
            Todo.find().then((todos) => {
                expect(todos.length).toBe(1);
                expect(todos[0].text).toBe('Test todo text');
                done();
            }).catch((err) => done(err));
        });
    });

    // Thanks to the beforeEach statement, the todo created above is going to be deleted before the code below runs.  
    // Challenge.
    it('should not create todo with invalid body data', (done) => {
        request(app)
        .post('/todos')
        .send({})
        .expect(400)
        .end((err, response) => {
            if (err) {
                return done(done);
            }
            Todo.find().then((todos) => {
                expect(todos.length).toBe(0);
                done();
            }).catch((err) => done(err));
        });
    });
});