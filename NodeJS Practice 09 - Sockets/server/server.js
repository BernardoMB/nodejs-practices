const path = require('path');
// Require 'http' built in module to make some http requests. 
const http = require('http');
const express = require('express');
// Require 'socket.io' to enable real-time communication.
const socketIO = require('socket.io');

// Require own modules.
const {generateMessage, generateLocationMessage} = require('./utils/message');
// Require some validation functions.
const {isRealString} = require('./utils/validation');
// Require the user class.
const {Users} = require('./utils/users');

// Start the server.
const port = process.env.PORT || 3000;
var app = express();

var server = http.createServer(app);
// Integrate our server with socket.io.
var io = socketIO(server);

// Configure middleware
const publicPath = path.join(__dirname, '../public');
app.use(express.static(publicPath));

// Instanciate the users class.
var users = new Users();

// With io.on() we start listening to an event. In this case the event we are listening to is 'connection'.
// Stablish what happens (on the server) when the client connects to the server.
io.on('connection', (socket) => {
  console.log('New user connected');

  // (-->) newEmail
  // Emit a 'newEmail' event to the client.
  // 'socket.emit' emits an event to a single connection.
  // In this case we are sending an email object to the client.

  //socket.emit('newEmail', generateMessage('mike@example.com', 'Hey. What is going on.'));

  // (<--) createEmail
  // Stablish what happens (on the server) when the client emits a 'createEmail' event.
  socket.on('createEmail', (newEmail) => {
    console.log('Client emitted "createEmail" event. Email:', newEmail);
  });

  // (-->) newMessage
  // Challenge.

  //socket.emit('newMessage', generateMessage("Bernardo Mondragon Brozon", "Se compran colchones, lavadoras, refrijeradores, estufas, hornos y viejos fierros que vendan!"));

  // (<--) createMessageForAll
  // Challenge.
  socket.on('createMessageForAll', (newMessage) => {
    console.log('Client emitted "createMessage" event. Message:', newMessage);
    // (-->) newMessage
    // 'io.emit' emits an event to all connections.
    io.emit('newMessage', generateMessage(newMessage.from, newMessage.text));
  });

  // (<--) createBroadcast
  socket.on('createBroadcast', (broadcast) => {
    console.log('Client emitted "createBroadcast" event. Broadcast: ', broadcast);
    // (-->) newMessage
    // 'socket.broadcast.emit' emits an event to all connections except the one that emited the 'createMessage' event.
    socket.broadcast.emit('newMessage', generateMessage(broadcast.from, broadcast.text));
  });

  // (<--) createMessage
  // Aknowledgements.
  socket.on('createMessage', (newMessage, callback) => {
    console.log('Client emitted "createMessage" event. Message:', newMessage);
    // Fire the callback function provided.
    callback('This is from the server.');
  });

  // DICONNECT
  // Stablish what happens (on the server) when a client disconnects from the server.
  socket.on('disconnect', () => {
    console.log('User was disconnected');
    // Remove the user from the room and update the users list.
    var user = users.removeUser(socket.id);
    // If the user was indeed removed, then notify all the users in that room.
    if (user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newChatMessage', generateMessage('Admin', `${user.name} has left.`));
    }
  });

  // (<--) createChatMessage
  // Aknowledgements: Note that we are passing a second argument 'callback'.
  socket.on('createChatMessage', (newMessage, callback) => {
    console.log('Client emitted "createChatMessage" event. Message:', newMessage);
    // get the user who emited the 'createChatMessage' event from the client.
    var user = users.getUser(socket.id);
    if (user && isRealString(newMessage.text)) {
      // (-->) newChatMessage
      io.to(user.room).emit('newChatMessage', generateMessage(user.name, newMessage.text));
    }
    // Fire the callback function provided.
    callback('This is from server');
  });

  // (<--) createLocationMessage
  socket.on('createLocationMessage', (locationMessage) => {
    console.log('Client emitted "createLocationMessage" event. Message:', locationMessage);
    var user = users.getUser(socket.id);
    if (user) {
      // (-->) newLocationMessage
      io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, locationMessage.latitude, locationMessage.longitude));
    }
  });

  // (<--) join
  socket.on('join', (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      return callback('Name and room name are required.');
    }
    // Socket.io has its own method to only talk to connection who are in the same room.
    // User .join().
    socket.join(params.room);

    // Add the just logged user.
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);

    // (-->) updateUserList
    // Send to everyone
    io.to(params.room).emit('updateUserList', users.getUserList(params.room));

    // socket.emit <-- emits an event just to one user.
    // io.emit <-- emits an event to all connections.
    // socket.broadcast.emit <-- emits an event to all connections but not to the emiter.
    
    // (-->) newChatMessage
    // Send a message to the connection that just fired the join event.
    socket.emit('newChatMessage', generateMessage('Admin', 'Welcome to the chat app'));
    
    // Lets emit an event to all the connections inside the room. 
    //socket.emit.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`));
    // Better with a broadcast.
    socket.broadcast.to(params.room).emit('newChatMessage', generateMessage('Admin', `${params.name} has joined.`));

    // Fire the callback with null because there is no error.
    callback(null);
  });

});

// Instead of calling app.listen(), better use server.listen().
server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});