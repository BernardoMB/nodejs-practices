// Connect to DB.

const MongoClient = require("mongodb").MongoClient;

// Connect.
// We will normly use Heroku urls for production, but for now we will use localhost.
// If 'TodoApp' data base does not exists, then it will be created if and only if we write data into it.
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

    // Do something...

    // Disconnect from the server.
    db.close();
});