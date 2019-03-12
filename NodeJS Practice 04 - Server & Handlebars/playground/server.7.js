// Rendering a template page and reuseing html code with 'partials' and 'helpers'.

const express = require('express');
const hbs = require('hbs'); // Templateing

var app = express();

hbs.registerPartials('./views/partials');

// A helper to remove some code from our rendering calls.
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});
// A helper as a function.
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

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
    res.render('about.3.hbs', {
        pageTitle: 'About Page'
    })
});

app.get('/home', (req, res) => {
    // Render the about page.
    res.render('home.2.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome!'
    })
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});