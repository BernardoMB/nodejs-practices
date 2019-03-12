// Inserting documents to DB.

const MongoClient = require("mongodb").MongoClient;

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

    // Add some data to the 'Todos' collection.
    // There is no need to create the collection, just give the name and it gets created if not exists.
    // 'insertOne' let us create a new document into our collection.
    db.collection('Todos').insertOne({
        text: 'Something to do',
        completed: false
    }, (err, result) => {
        // Handle the error.
        if (err) {
            return console.log('Unable to insert todo', err);
        }
        // Print the doc that was inseted.
        console.log(JSON.stringify(result.ops, undefined, 2));
    });

    // Insert a user.
    // Remember that if 'Users' collection does no exists, it will be created.
    db.collection('Users').insertOne({
        // We can set our own custom _id
        //_id: 123,
        // for now we will not specify the '_id' propperty because we want mongo to do that for us.
        name: 'Bernardo Mondragon Brozon',
        age: 23,
        likes: [
            'football',
            'math'
        ]
    }, (err, result) => {
        // Handle the error.
        if (err) {
            return console.log('Unable to insert user', err);
        }
        // Print the doc that was inserted.
        console.log(JSON.stringify(result.ops, undefined, 2));
        
        // Acces the '_id' propperty of the results array.
        var id = result.ops[0]._id;
        
        // We can get the TimeStapm from the id.
        console.log('Time stamp:', id.getTimestamp());
    });

    db.close();
});