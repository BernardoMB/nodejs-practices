// Rendering a page on views.

const express = require('express');
const hbs = require('hbs'); // Templateing

var app = express();

// Set some express configurations:
// Tell express what view engige I want to use.
app.set('view engine', 'hbs');
// The default directory express use for our templates is 'views'.

// In order to run the help page, I need a middleware function called 'use'.
app.use(express.static('./public'));

// Routeing:

app.get('/', (req, res) => {
    res.send({
        name: 'Bernardo',
        likes: [
            'football',
            'math'
        ]
    });
});

app.get('/about', (req, res) => {
    // Render the about page.
    res.render('about.hbs')
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});