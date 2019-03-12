const expect = require('expect');
const request = require('supertest');

const {
    app
} = require('./07-server');
const {
    Todo
} = require('./../server/models/todo');

// Before each is going to let us run some code before every single test case.
// Tehe following code is commented out because we do have a GET /route.
/*beforeEach((done) => {
    Todo.remove({}).then(() => {
        done();
    });
});*/
// With this, the database is going to be empty before every request.

// In server.js there is another route GET /todos. 
// In this case a test for the GET /todos this case pretty much lives off the fact that there are actually 'todos' stored in the database.
// So it is convenient to replace the beforeEach deletion with a deletion and insertio.

// Create an array of dummy todos.
const todos = [{
    text: 'Fisrt test todo'
}, {
    text: 'Second test todo'
}];

// beforeEach statement modified.
// Remove all todos and insert the two above.
beforeEach((done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => {
        done();
    });
});

describe('POST /todos', () => {
    it('should create a new todo', (done) => {
        request(app)
            .post('/todos')
            .send({
                text: 'Test todo text'
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe('Test todo text');
            })
            .end((err, response) => {
                if (err) {
                    return done(err);
                }
                Todo.find({ // Fixing the dummy todos issue.
                    text: "Test todo text"
                }).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe('Test todo text');
                    done();
                }).catch((err) => done(err));
            });
    });

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
                    expect(todos.length).toBe(2); // 0 replaced with 2 so all tests pass.
                    done();
                }).catch((err) => done(err));
            });
    });
});

describe('GET /todos', () => {
    it('should get all todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((response) => {
                expect(response.body.todos.length).toBe(2);
            })
            .end(done);
    });
});