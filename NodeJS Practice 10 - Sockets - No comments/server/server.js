const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const port = process.env.PORT || 3000;
var app = express();

var server = http.createServer(app);
var io = socketIO(server);

const publicPath = path.join(__dirname, '../public');
app.use(express.static(publicPath));

var users = new Users();

io.on('connection', (socket) => {
  
  socket.on('join', (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      return callback('Name and room name are required.');
    }
    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);
    io.to(params.room).emit('updateUserList', users.getUserList(params.room));
    socket.emit('newChatMessage', generateMessage('Admin', 'Welcome to the chat app'));
    socket.broadcast.to(params.room).emit('newChatMessage', generateMessage('Admin', `${params.name} has joined.`));
    callback(null);
  });

  socket.on('disconnect', () => {
    var user = users.removeUser(socket.id);
    if (user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newChatMessage', generateMessage('Admin', `${user.name} has left.`));
    }
  });
  
  socket.on('createChatMessage', (newMessage, callback) => {
    var user = users.getUser(socket.id);
    if (user && isRealString(newMessage.text)) {
      io.to(user.room).emit('newChatMessage', generateMessage(user.name, newMessage.text));
    }
    callback('This is from server');
  });

  socket.on('createLocationMessage', (locationMessage) => {
    var user = users.getUser(socket.id);
    if (user) {
      io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, locationMessage.latitude, locationMessage.longitude));
    }
  });
  
});

server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});