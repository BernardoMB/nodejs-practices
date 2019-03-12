// MongooseJS enable us to do things easier.

// Require 'mongodb' module.
const {ObjectID} = require('mongodb');

// Require 'mongoose' module.
var mongoose = require('mongoose');

// Tell mongoose to use the promises we know.
mongoose.Promise = global.Promise;

// Set up connection.
mongoose.connect('mongodb://localhost:27017/TodoApp');

// SAVE: Saving docs in the database.

// Create a mongoose 'Todo' model with validation.
var Todo = mongoose.model('Todo', {
    text: {
        // Visit documentation to see all the things we can specify to the text propperty.
        type: String,
        required: true,
        // Visit http://mongoosejs.com/docs/validation.html for more validators.
        minlenght: 1,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number,
        default: null
    }
});

// Create two new todos.
var newTodo = new Todo({
    text: 'Cook dinner'
});

var newTodo2 = new Todo({
    text: 'Walk the dog',
    completed: true,
    completedAt: new Date().getTime()
});

// Save the todos in the database.
newTodo.save().then((result) => {
    console.log('Saved todo: ', result);
}, (dbError) => {
    console.log('Uanble to save todo: ', dbError);
});

newTodo2.save().then((result) => {
    console.log('Saved todo: ', result);
}, (dbError) => {
    console.log('Uanble to save todo: ', dbError);
});

// Challenge (Create a user model, instanciate a user and store it to the database).

// Create a mongoose 'User' model with validation.
var User = mongoose.model('User', {
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    }
});

// Create a new user.
var user = new User({
    email: 'bmondragonbrozon@gmail.com   ',
    name: "Bernardo Mondragon Brozon"
});

// Save the user in the database.
user.save().then((doc) => {
    console.log('Saved user: ', doc);
}, (error) => {
    console.log('Unable to save user: ', error);
});

// FIND: Querying.

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

// REMOVE: remove.

var id = '594b14a3a4be62bf90aa1bad';

// Remove. Remove all.
Todo.remove({}).then((res) => {
    console.log('REMOVE ALL');
    console.log('Result:');
    console.log(res);
}, (err) => {
    console.log('Unable to remove id:');
    console.log(err);
});

// Remove. 
// Remove by id.
// On the result we do not get the docs that got removed.
Todo.remove({
    _id: id
}).then((res) => {
    console.log('REMOVE BY ID');
    console.log('Result:');
    console.log(res);
}, (err) => {
    console.log('Unable to remove id:');
    console.log(err);
});

// findByIdAndREmove.
// On the result we get the doc that got removed.
Todo.findByIdAndRemove(id).then((todo) => {
    console.log('FIND BY ID AND REMOVE:');
    console.log('Result:');
    if (todo) {
        console.log('Removed todo:');
        console.log(todo);
    } else {
        console.log('Nothing got removed.');
    }
}, (err) => {
    console.log('Unable to remove id:');
    console.log(err);
});

// findOneAndRemove. 
// Find one and remove by specified propperty.
Todo.findOneAndRemove({
    text: "Fifth test todo"
}).then((res) => {
    console.log('FIND ONE AND REMOVE BY TEXT PROPPERTY');
    console.log('Result:');
    console.log(res);
}, (err) => {
    console.log('Unable to remove id:');
    console.log(err);
});

// UPDATE: update.

Todo.findByIdAndUpdate('5951dcc9a42f9c1f38d1bca9', {
    $set: {
        text: 'Been updated'
    }
}, {
    new: true
}).then((todo) => {
    if (!todo) {
        console.log('No todos updated');
    }
    console.log('Single todo updated');
}).catch((error) => {
    console.log('Error updating todo');
})

// Close connection.
mongoose.connection.close();