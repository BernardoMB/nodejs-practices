// To enable real-time communication call 'io()' which is available because we loaded in the socket library in the previous script.
// In the 'io()' call we are initiating the request from the client to the server to open up a web socket and keep the connection open.
// What we get back from that call is very important. 
var socket = io(); // This variable is critical to communicating.
// 'socket' is what we need in order to listen for data from the server and in order to send data to the server.

// Either tha client or the server can emit or listen to events.

// Stablish what happens (on the client) when the client connects to the server.
socket.on('connect', function () {
  console.log('Client connected to server');
  // Get the params from the url when the user access the chat route.
  var params = jQuery.deparam(window.location.search);
  // Tell the server what room the user is joining.
  // (<--) join
  socket.emit('join', params, function (err) {
    if (err) {
      alert(err);
      window.location.href = '/';
    } else {
      console.log('No error');
    }
  });
});

// (-->) newEmail
// Stablish what happens (on the cleint) when the server emits a 'newEmail' event.
// Notice that we must use a regular function expression instead of using an arrow function because not all browsers support arrow functions.
socket.on('newEmail', function (email) {
  console.log('Server emitted "newEmail" event. Email:', email);
});

// (<--) createEmail
// Emit a 'createEmail' event to the server.
// In this case we are sending an email object to the server.
/*socket.emit('createEmail', {
  to: 'jen@example.com',
  text: 'Hey. This is Andrew.'
});*/

// (-->) newMessage
// Challenge.
socket.on('newMessage', function (message) {
  console.log('Server emitted "newMessage" event. Message:', message);
});

// (<--) createMessageForAll
// Challenge:
/*socket.emit('createMessageForAll', {
  from: 'Elber Galarga',
  text: 'Trabajo en Semarnat'
});*/

// (<--) createBroadcast
/*socket.emit('createBroadcast', {
  from: "El broadcasteador",
  text: "This is a broadcast"
});*/

// (<--) createMessage
// We can also use aknowledgements providing a callback function as the third argument of the emit() call.
// In order to fire the function the server must call the function provided as a callback.
/*socket.emit('createMessage', {
  from: 'Frank',
  text: 'Hi all!'
}, function (data) {
  console.log('Got it.', data);
});*/

// DISCONNECT
// Stablish what happens (on the client) when the client disconnects from the server.
socket.on('disconnect', function () {
  console.log('Client disconnected from server');
});

// (-->) updateUserList
// Add the users to the users list.
socket.on('updateUserList', function (users) {
  var ol = jQuery('<ol></ol>');
  users.forEach(function (user) {
    ol.append(jQuery('<li></li>').text(user));
  });
  jQuery('#users').html(ol);
});

// If there are many messages, then we need a function to scroll down the view in order to see the new messages.
// If the user wants to see the messages above then we shouldnt scroll down to the bottom.
// Create a function to handle that behavior.
function scrollToBottom () {
  // Selectors
  var messages = jQuery('#messages');
  var newMessage = messages.children('li:last-child');
  // Heights
  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();

  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    messages.scrollTop(scrollHeight);
  }
};

// (-->) newChatMessage
socket.on('newChatMessage', function (message) {
  console.log('Server emitted "newChatMessage" event. Message:', message);
  // Create the moment at which the location was sent.
  var formattedTime = moment(message.createdAt).format('h:mm a');
  
  /*// Create a list element with jQuery.
  var li = jQuery('<li></li>');
  // Set the text.
  li.text(`${message.from} ${formattedTime}: ${message.text}`);
  jQuery('#messages').append(li);*/

  // Better do the following:
  var template = jQuery('#message-template').html();
  var html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });
  jQuery('#messages').append(html);
  // Fix scroll if needed.
  scrollToBottom();
});

// (-->) newLocationMessage
socket.on('newLocationMessage', function (locationMessage) {
  console.log('Server emitted "newLocationMessage" event. Message:', locationMessage);
  // Create the moment at which the location was sent.
  var formattedTime = moment(locationMessage.createdAt).format('h:mm a');
  
  /*// Create a list element with jQuery.
  var li = jQuery('<li></li>');
  var a = jQuery(`<a target="_blank">My current location: ${locationMessage.url}</a>`);
  li.text(`${locationMessage.from} ${formattedTime}: `);
  a.attr('href', locationMessage.url);
  li.append(a);
  jQuery('#messages').append(li);*/

  // Better do the following:
  var template = jQuery('#location-message-template').html();
  var html = Mustache.render(template, {
    from: locationMessage.from,
    createdAt: formattedTime,
    url: locationMessage.url
  });
  jQuery('#messages').append(html);

  // Fix scroll if needed.
  scrollToBottom();
});

// Add some behavior to the input tag in the html.
// When the user submits the form the callback function will be fired.
jQuery('#message-form').on('submit', function (e) {
  // Prevent the default behavior: prevent the page from reloading and change the route.
  e.preventDefault();
  var messageTextbox = jQuery('[name=message]');
  // (<--) createChatMessage
  socket.emit('createChatMessage', {
    text: messageTextbox.val() // This is going to select any element that has the name attribute equal to message. And then get the value.
  }, function () {
    // Aknowledgement
    messageTextbox.val('')
  });
});

// Add some behavior to the Send Location button.
// Store the reference to the button in a variable.
var locationButton = jQuery('#send-location');
// Stablish what happens when the user clics the button.
locationButton.on('click', function () {
  // Check if the user has acces to the location API.
  // The geolocation API exists on the navigator.geolocation object.
  if (!navigator.geolocation) {
    // alert available in all browsers.
    return alert('Geolocation not supported by your browser.');
  }
  // Disable the location button while the location is beeing sent.
  // And set the text to sending location.
  locationButton.attr('disabled', 'disabled')
  .text('Sending location...');
  // Fetch the user location. 
  navigator.geolocation.getCurrentPosition(function (position) {
    // Re-enable the location button and text to normal.
    locationButton.removeAttr('disabled')
    .text('Send location');
    // (<--) createLocationMessage
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function () { // Error handler function.
    // Re-enable the location button and text to normal.
    locationButton.removeAttr('disabled')
    .text('Send location');
    alert('Unable to fetch location.');
  });
});