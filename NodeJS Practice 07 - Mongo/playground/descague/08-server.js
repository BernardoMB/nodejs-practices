var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./07-mongoose');
var {Todo} = require('./../server/models/todo');
var {User} = require('./../server/models/user');

const port = 3000;
var app = express();

// Use a middleware to parse the body of the request and response.
app.use(bodyParser.json());

// POST /todos
app.post('/todos', (req, res) => {
    console.log('Request body: ', req.body);
    var todo = new Todo({
        text: req.body.text
    });
    todo.save().then((resp) => {
        console.log('Saving saving new todo:\n', JSON.stringify(resp, undefined, 2));
        res.send(resp);
    }, (dbError) => {
        console.log('Error saving new todo:\n', JSON.stringify(dbError, undefined, 2));
        res.status(400).send(dbError);
    });
});

// Get all the todos.
app.get('/todos', (request, response) => {
    Todo.find().then((todos) => {
        response.send({todos}); // ES 6 sintax.    
    }, (dbError) => {
        response.status(400).send(dbError);
    }); 
});

app.listen(port, () => {
    console.log(`App started on port: ${port}`);
});

// Export the module.
module.exports = {app};