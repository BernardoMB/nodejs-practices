// Rendering a page on views.

const path = require('path'); // native module: function to manipulate file or directory paths
const express = require('express');
const hbs = require('hbs'); // Templateing

var app = express();
const publicDirectoryPath = path.join(__dirname, '../public');

// Set some express configurations:
// Tell express what view engige I want to use.
app.set('view engine', 'hbs');
// The default directory express use for our templates is 'views'.

// This is very useful because with this I can recicle elements such as header and footer

// In order to run the help page, I need a middleware function called 'use'.
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Some title weather app',
        name: 'Bernardo'
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});