// Links on the headers.

const express = require('express');
const hbs = require('hbs');

var app = express();

hbs.registerPartials('./views/partials');
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});
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
    res.render('about.4.hbs', {
        pageTitle: 'About Page'
    })
});

app.get('/home', (req, res) => {
    res.render('home.3.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome!'
    })
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});