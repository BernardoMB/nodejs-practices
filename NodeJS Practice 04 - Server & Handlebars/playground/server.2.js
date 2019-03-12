// Routeing.

const express = require('express');

var app = express();

var myFunction = (req, res) => {
    var myObject = {
        name: 'Bernardo',
        likes: [
            'football',
            'math'
        ]
    }
    res.send(myObject);
}

// Gets the 'root' route. 
app.get('/', myFunction);

var myFunction2 = (req, res) => {
    res.send("Hidden content");
}

// Gets the 'hidden' route.
app.get('/hidden', myFunction2);

app.listen(3000);
// http://localhost:3000/local