const express = require('express');

var app = express();

// Simple route:
app.get('/', (req, res) => {
    res.send('Hellso world!');
});

// We can also send the following:
app.get('/pageNotFound', (req, res) => {
    res.status(404).send({
       error: 'Page not found.' 
    });
});

app.get('/someRoute', (req, res) => {
    res.status(404).send({
       error: 'Page not found.'  
    });
});

app.get('/users', (req, res) => {
    res.status(200).send([
        {
            fullName: 'Bernardo Mondragon',
            age: '23',
            likes: ['football', 'math']
        },
        {
            fullName: 'Fernanda Salcido',
            age: '22',
            likes: ['sleeping', 'economics']
        }
    ]);
});

app.listen(3000);

// Export the app
module.exports.app = app;