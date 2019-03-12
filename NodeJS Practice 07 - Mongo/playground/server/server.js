var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');
const _ = require('lodash');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
var port = process.env.PORT || 3000;

// Middleware.
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

// GET /todos
app.get('/todos', (request, response) => {
    Todo.find().then((todos) => {
        response.send({
            todos
        });
    }, (dbError) => {
        response.status(400).send(dbError);
    });
});

// GET /todosDEMO/:id
// Fetching a todo providing the id in the url.
// The id is going to be available in the request object.
app.get('/todosDEMO/:id', (request, response) => {
    response.send(request.params);
});

// GET /todos/:id
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
        response.status(200).send({
            todo
        });
    }).catch((error) => {
        response.status(400).send();
    });
});

// DELETE /todos/:id
app.delete('/todos/:id', (request, response) => {
    var id = request.params.id;
    if (!ObjectID.isValid(id)) {
        return response.status(400).send();
    }
    Todo.findByIdAndRemove(id).then((todo) => {
        if (!todo) {
            return response.status(404).send();
        }
        response.status(200).send({
            todo
        });
    }).catch((error) => {
        response.status(400).send();
    });
});

// PATCH /todos/:id
app.patch('/todos/:id', (request, response) => {
    var id = request.params.id;
    var body = _.pick(request.body, ['text', 'completed']);
    if (!ObjectID.isValid(id)) {
        return response.status(400).send();
    }
    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, {
        $set: body
    }, {
        new: true
    }).then((todo) => {
        if (!todo) {
            return response.status(404).send();
        }
        response.status(200).send({
            todo
        });
    }).catch((err) => {
        response.status(400).send();
    })
});

// Start listening the specified port.  
app.listen(port, () => {
    console.log(`App started on port: ${port}`);
});

// Export the module.
module.exports = {app};