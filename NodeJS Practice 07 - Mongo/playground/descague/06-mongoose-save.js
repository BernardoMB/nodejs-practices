// Introduceing MongooseJS

var mongoose = require('mongoose');

// Set mongoose to use promises.
mongoose.Promise = global.Promise;

// Set up connection.
mongoose.connect('mongodb://localhost:27017/TodoApp');

// Create a mongoose model with validation.
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

// Create a new todo.
var newTodo = new Todo({
    text: 'Cook dinner'
});

// Save the todo.
newTodo.save().then((result) => {
    console.log('Saved todo: ', result);
}, (dbError) => {
    console.log('Uanble to save todo: ', dbError);
});

// Challenge.
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

var user = new User({
  email: 'bmondragonbrozon@gmail.com   ',
  name: "Bernardo Mondragon"
});

user.save().then((doc) => {
  console.log('Saved user: ', doc);
}, (e) => {
  console.log('Unable to save user: ', e);
});

// Close connection.
mongoose.connection.close();