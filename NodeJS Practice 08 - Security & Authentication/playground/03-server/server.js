require('./config/config');

var express = require('express');
var bodyParser = require('body-parser');
var { ObjectID } = require('mongodb');
const _ = require('lodash');

var { Todo } = require('./models/todo');
var { User } = require('./models/user');

var app = express();
var port = process.env.PORT;

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

// GET /todos/:id
app.get('/todos/:id', (request, response) => {
    var id = request.params.id;
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
        response.status(400).send(error);
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
        response.status(400).send(error);
    });
});

// PATCH /todos/:id
app.patch('/todos/:id', (request, response) => {
    var id = request.params.id;
    var body = _.pick(request.body, [ 'text', 'completed' ]);
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

// POST /users
app.post('/users', (request, response) => {
    console.log('Request body: ', request.body);
    var body = _.pick(request.body, [ 'email', 'password' ]);
    var user = new User(body);
    // If user contains invalid data, the following promise will fire the reject handler thanks for what we do in 'user.js'.
    user.save().then((user) => {
        console.log('Saving new user:\n', JSON.stringify(user, undefined, 2));
        response.send(user);
    }, (dbError) => {
        console.log('Error saving new user:\n', JSON.stringify(dbError, undefined, 2));
        response.status(400).send(dbError);
    });
});

app.listen(port, () => {
    console.log(`App started on port: ${port}`);
});

// Export the module.
module.exports = { app };