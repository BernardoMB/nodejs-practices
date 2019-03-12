const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/user');

// Dummy users.
const userOneId = new ObjectID();
const userTwoId = new ObjectID();
const users = [{
    // User with authentication tokens.
    _id: userOneId,
    email: 'andrew@example.com',
    password: 'userOnePass',
    tokens: [{
        access: 'auth',
        token: jwt.sign({_id: userOneId, access: 'auth'}, process.env.JWT_SECRET).toString()
    }]
}, {
    // User with no authentication data.
    _id: userTwoId,
    email: 'jen@example.com',
    password: 'userTwoPass',
    tokens: [{
        access: 'auth',
        token: jwt.sign({_id: userTwoId, access: 'auth'}, process.env.JWT_SECRET).toString()
    }]
}];

// Dummy todos.
const todos = [{
    // Default todo.
    _id: new ObjectID(),
    text: 'First test todo',
    _creator: userOneId
}, {
    // Completed todo.
    _id: new ObjectID(),
    text: 'Second test todo',
    completed: true,
    completedAt: 333,
    _creator: userTwoId
}];

const populateTodos = (done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());
};

// Cannot use insertMany because we also want to store the users with a hashed password.
const populateUsers = (done) => {
    User.remove({}).then(() => {
        // Remember that save() returns a promise.
        
        // Promise (1).
        var userOne = new User(users[0]).save();
        
        // Promise (2).
        var userTwo = new User(users[1]).save();
        
        return Promise.all([userOne, userTwo]);
    }).then(() => done()); // this then() callback is gonna get fired if and only if all promises in the array resolve.
};

module.exports = {todos, populateTodos, users, populateUsers};
