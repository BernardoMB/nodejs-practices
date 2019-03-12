// Use middle ware:
// (1) Append to log file (see server.log).
// (2) Render maintenance.html if site is on maintenance.

const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

// Hbs configuration (registering partials and helpers):
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

// Express configuration:
app.set('view engine', 'hbs');

// The following line is comment out because if the page is on maintenance we dont want help.html to be accesible.
// So we move the line bellow.
//app.use(express.static(__dirname + '/public'));

// Use Express middleware: 

// Append to log file.
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`; // We can call methods on the request object.
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log.');
        }
    }); // appendFile here takes a callback function handling an error if it exists. This is due to a NodeUpgrade (ignore).
    next(); // If we dont call 'next()' then the page will load forever.
});

// Render maintenance if site is on maintenance.
app.use((req, res, next) => {
var maintenance = false;
    if (maintenance) {
        res.render('maintenance.hbs', {
            pageTitle: 'Maintenance',
            maintenanceMessage: 'Sorry! The site is currently on maintenance.'
        });
    } else {
        next();
    }
});

// To acces 'help.html' page.
app.use(express.static(__dirname + '/public'));

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
    });
});

app.get('/home', (req, res) => {
    res.render('home.3.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome!'
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});