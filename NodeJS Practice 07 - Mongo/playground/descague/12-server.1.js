var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');

var {mongoose} = require('./07-mongoose');
var {Todo} = require('./../server/models/todo');
var {User} = require('./../server/models/user');

var app = express();
var port = process.env.port || 3000;

app.use(bodyParser.json());

// Make a post.
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
        response.send({
            todos
        });
    }, (dbError) => {
        response.status(400).send(dbError);
    });
});

// Fetching a todo providing the id in the url.
// The id is oging to be available in the request object.
app.get('/todosDEMO/:id', (request, response) => {
    response.send(request.params);
});

// Challenge.
app.get('/todos/:id', (request, response) => {
    // Now make a get request to 'localhost:3000/todos/id' and the response will give us the id="123" provided in the url.
    // Get the id.
    var id = request.params.id;
    // Validate id.
    if (!ObjectID.isValid(id)) {
        return response.status(400).send();
    }
    Todo.findById(id).then((todo) => {
        if (!todo) {
            return response.status(404).send();
        }
        response.status(200).send({todo});
    }).catch((error) => {
        response.status(400).send();
    });
});

app.listen(port, () => {
    console.log(`App started on port: ${port}`);
});

// Export the module.
module.exports = {
    app
};