// Use of a middleware function to display the help.html page.

const express = require('express');

var app = express();

// In order to run the help page. I need a middleware function called use.
app.use(express.static('./public'));

app.get('/', (req, res) => {
    res.send({
        name: 'Bernardo',
        likes: [
            'football',
            'math'
        ]
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});