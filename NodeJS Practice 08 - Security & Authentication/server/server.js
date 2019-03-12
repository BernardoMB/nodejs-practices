require('./config/config');

var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');
const _ = require('lodash');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
var port = process.env.PORT;

// Middleware.
var {authenticate} = require('./middleware/authenticate');
app.use(bodyParser.json());

// TODOS ROUTES:

// POST /todos
// In order to save a todo in the database, the user who is 
// storing the todo must be identified so we know who saved that todo, so we must post sending the user token 
// (the user token is the enconded version it the user's id and the secret string and the last part of the token
// is different every time the token is generated for en specific user) in the request header.
// The second parameter of 'post()', which is 'authenticate', is a function that gets fired
// when the client send a post request. This function grabs the token from the resquet header
// and tries to find the user whose token is the one we are sending.
// If it finds the user, then the request object wil hold the user found so we can extract it's id and 
// set it to a creator propperty of the todo. 
app.post('/todos', authenticate, (request, response) => {
  var todo = new Todo({
    text: request.body.text,
    _creator: request.user._id
  });
  todo.save().then((resp) => {
        response.send(resp);
  }, (dbError) => {
        response.status(400).send(dbError);
  });
});

// GET /todos
// Given that a user should only have acces to its own todos, when the client sends a get request it must
// send the request with the user token in the request header.
// Use the athentication function like we do above.
app.get('/todos', authenticate, (request, response) => {
    Todo.find({
        _creator: request.user._id
    }).then((todos) => {
        response.send({todos});
    }, (dbError) => {
        response.status(400).send(dbError);
    });
});

// GET /todos/:id
app.get('/todos/:id', authenticate, (request, response) => {
    var id = request.params.id;
    if (!ObjectID.isValid(id)) {
        return response.status(400).send();
    }
    Todo.findOne({
        _id: id, // todo's id.
        _creator: request.user._id // thanks to authenticate we have 'request.user._id'.
    }).then((todo) => {
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
app.delete('/todos/:id', authenticate, (request, response) => {
    var id = request.params.id;
    if (!ObjectID.isValid(id)) {
        return response.status(400).send();
    }
    // Change to findOneAnd Remove
    //Todo.findByIdAndRemove(id).then((todo) => {
    Todo.findOneAndRemove({
        _id: id,
        _creator: request.user._id
    }).then((todo) => {
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
app.patch('/todos/:id', authenticate, (request, response) => {
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
    // Change.
    //Todo.findByIdAndUpdate(id, {
    Todo.findOneAndUpdate({
        _id: id,
        _creator: request.user._id
    }, {
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

// USERS ROUTES:

// POST /users
app.post('/users', (request, response) => {
    var body = _.pick(request.body, ['email', 'password']);
    var user = new User(body);

    user.save().then(() => {
        // return a promise whose resolve case gives us the token just created.
        return user.generateAuthToken();
    }).then((token) => {
        // Respond to the client sending back the token in the 'x-auth' header.
        response.header('x-auth', token).send(user);
    }).catch((error) => {
        response.status(400).send(error);
    });
});

// GET /users/me
app.get('/users/me', authenticate, (request, response) => {
  response.send(request.user);
});

// POST /users/login
// Every time a user logs in a new token will be generated for that user.
app.post('/users/login', (request, response) => {
  var body = _.pick(request.body, ['email', 'password']);
  // We will use a custom model method.
  User.findByCredentials(body.email, body.password).then((user) => {
    // Send Back the user.
    //response.status(200).send(user);
    // Better do the following.
    return user.generateAuthToken().then((token) => {
      response.header('x-auth', token).send(user);
    });
  }).catch((e) => {
    response.status(400).send();
  });
});

// DELETE /users/me/token
app.delete('/users/me/token', authenticate, (request, res) => {
  request.user.removeToken(request.token).then(() => {
    res.status(200).send();
  }, () => {
    res.status(400).send();
  });
});

app.listen(port, () => {
    console.log(`App started on port: ${port}`);
});

// Export the module.
module.exports = {app};