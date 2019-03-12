// Here on this file is where I configure the various routes.
// Starts the server biding it to a port of my machine.

// Load express.
const express = require('express');

// Call 'express' as a function.
var app = express();

// Set route handler for http 'get' request. 
// The following callback function takes two parameters:
// (1) req: Stores information about the request comming in: headers, body, path, etc.
// (2) res: Has a lot of methods so one can respond to the request in whatever way you like.  
app.get('/', (req, res) => {
    // Respond to the http 'get' request sending some data back.
    res.send('<h1>Hello Express!</h1>'); // If someone views the website they're gonna see 'Hello Expres!'.
    // Alternatively
    //res.contentType('xml');
    //res.send('<hm>Hello Express!</hm>');
    // Alternatively
    //res.contentType('json/Application');
    //res.send('{}');
});

// Bind the application to a port on the machine.
app.listen(3000); // 3000 is a very common port for a localhost app.
// Visit http://localhost:3000/
// The app will never stop running; it has to be shut down manually.