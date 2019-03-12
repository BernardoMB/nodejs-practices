// Hbs Variables (pageTitle, welcomeMessage, currentYear).

const express = require('express');
const hbs = require('hbs');

var app = express();

app.set('view engine', 'hbs');

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
    res.render('about.1.hbs', {
        pageTitle: 'About Page',
        currentYear: new Date().getFullYear()
    })
});

app.get('/home', (req, res) => {
    // Render the about page.
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome!',
        currentYear: new Date().getFullYear()
    })
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});