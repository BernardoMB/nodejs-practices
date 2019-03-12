// Require the  ObjectID object from the mongodb librery.
const {ObjectID} = require('mongodb');

// Require our mongoose connection and model.
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');

// Use the following id for all queries.
var id = '594811e9fa6eea10b8b6d5c6';
// Invalid id.
//var id = '594811e9fa6eea10b8b6d5c611'; 

// Query find.
Todo.find({
    _id: id // Mongoose feature: No need to pass a new instance of ObjectId.
}).then((todo) => {
    console.log('Todos:', todo);
});

// Query findOne.
Todo.findOne({
    _id: id
}).then((todo) => {
    if (!todo) {
        return console.log('Id not found.');
    }
    console.log('Todo by find one:', todo);
});

// Query findById.
Todo.findById(id).then((todo) => {
    if (!todo) { // Handle the case where the specified id is not found.
        return console.log('Id not found.');
    }
    console.log('Todo by id:', todo);
}).catch((error) => { // Handle the case where the specified id is not valid.
    console.log(error);
});

// Instead of handling the invalid id error like above we can use the ObjectID object.
if (!ObjectID.isValid(id)) {
    console.log('Id not valid.');
}

// Challenge.
const {User} = require('./../server/models/user');
var userId = '5948412f05cf3407f4e10628';
User.find({
    _id: userId
}).then((user) => {
    console.log('User:', user);
});
User.findOne({
    _id: userId
}).then((user) => {
    if (!user) {
        return console.log('Id not found.');
    }
    console.log('User by find one:', todo);
});
User.findById(userId).then((user) => {
    if (!user) {
        return console.log('Id not found.');
    }
    console.log('User by id:', user);
}).catch((error) => {
    console.log(error);
});
