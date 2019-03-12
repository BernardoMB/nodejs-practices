// Rendering a template page and reuseing html code with 'partials'.

const express = require('express');
const hbs = require('hbs'); // Templateing

var app = express();

hbs.registerPartials('./views/partials');

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
    res.render('about.2.hbs', {
        pageTitle: 'About Page',
        currentYear: new Date().getFullYear()
    })
});

app.get('/home', (req, res) => {
    // Render the about page.
    res.render('home.1.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome!',
        currentYear: new Date().getFullYear()
    })
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});