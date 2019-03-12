// Object destructuring and find documents of DB.

// Object destructuring example: 
var user = {name: 'Bernardo', age: 32};
// Pull out just the name propperty and print it.
var {name} = user;
console.log(name);

// Apply destructuring to MongoClient.
//const {MongoClient} = require("mongodb");
// The line above does the same as
//const MongoClient = require("mongodb").MongoClient;

// Better.
// Also require 'ObjectID' to handle '_id's propperties in a better way.
const {MongoClient, ObjectID} = require("mongodb");

// Create a new instance of ObjectID.
var obj = ObjectID();

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');
    
    // Get the collection and fetch everything inside that collection and then store everything into a Array.
    db.collection('Todos').find().toArray().then((docsArray) => {
        if (docsArray.length == 0) {
            return console.log("There are no todos.");
        }
        console.log('Todos:');
        console.log(JSON.stringify(docsArray, undefined, 2));
    }, (err) => {
        console.log('Ubale to fectch todos', err);
    });

    // Fetch only completed items.
    db.collection('Todos').find({
        completed: true
    }).toArray().then((docsArray) => {
        if (docsArray.length == 0) {
            return console.log("There are no completed todos.");
        }
        console.log('Completed Todos:');
        console.log(JSON.stringify(docsArray, undefined, 2));
    }, (err) => {
        console.log('Unable to fectch completed todos', err);
    });

    // Fectch a specific entry by '_id' propperty.
    db.collection('Todos').find({
        _id: new ObjectID('593d7d146f52d5ab34c1fa0c')
    }).toArray().then((docsArray) => {
        if (docsArray.length == 0) {
            return console.log(`There are no todos with id ${new ObjectID('593d7d146f52d5ab34c1fa0c')}.`);
        }
        console.log('Todos:');
        console.log(JSON.stringify(docsArray, undefined, 2));
    }, (err) => {
        console.log('Ubale to fectch todos', err);
    });

    // Count up all todos in 'Todos' collection.
    // Visit http://mongodb.github.io/node-mongodb-native/2.2/api/Cursor.html#count.
    // Set collection to a variable.
    var collection = db.collection('Todos');
    // Insert some docs.
    // Call 'find()' on 'collection' to get the cursor count.
    var cursor = collection.find();
    // Get the cursor count.
    cursor.count(function (err, count) {
        if (err) {
            return console.log('Unable to count todos.', err);
        }
        console.log(`Todos count (1): ${count}`);
    });
    // Because count returns a promise if there is no callback provided, then, alternatively, we can do the following:
    cursor.count().then((count) => {
        console.log(`Todos count (2): ${count}`);
    }, (err) => {
        console.log('Unable to count todos.', err);
    });

    // Challenge:

    var todosCollection = db.collection('Todos');

    var cursor = todosCollection.find({
        User: 'Bernardo'
    });

    var docs = cursor.toArray().then((docsArray) => {
        if (docsArray.length == 0) {
            console.log("There are no todos who's name is Bernardo.");
        }
        console.log("Docs who's user is Bernardo:");
        console.log(JSON.stringify(docsArray, undefined, 2));
    }, (err) => {
        console.log('Unable to fetch into array the docs.', err ``);
    });
    var count = cursor.count().then((count) => {
        console.log(`Total of docs who's user is Bernardo: ${count}`);
    }, (err) => {
        console.log(err)
    });

    db.close();
}); 