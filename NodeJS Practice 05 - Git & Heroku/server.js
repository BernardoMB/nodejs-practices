const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

// Heroku will set the following variable.
const port = process.env.PORT || 3000;

var app = express();

// Hbs configuration (register partials and helpers):
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

// Express configuration (using middle ware):
app.set('view engine', 'hbs');

// Append to log file every request that gets processed using a middleware.
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log.');
        }
    });
    next();
});

// Render maintenance page if site is in maintenance using a middleware.
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
// To have acces to the 'help.html' page.
// To learn more about the express.static() call enter the following page: https://expressjs.com/en/starter/static-files.html
app.use(express.static(__dirname + '/public'));

// Routing: 

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
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

app.get('/home', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome!'
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});