// Require the 'MongoClient' in order to use a database.
//const MongoClient = require('mongodb').MongoClient;

// A better way to do it is by applying object destructuring to MongoClient.
//const {MongoClient} = require("mongodb");
// The line above does the same as
//const MongoClient = require("mongodb").MongoClient;

// Each doc of the database is stored by MongoDB adding an '_id' propperty automatically.
// This '_id' propperty has to be treated differently, so we need to require a MongoDB module called 'ObjectID'.
const {MongoClient, ObjectID} = require("mongodb");

// Connect to database.
// We will normally use Heroku urls for production, but for now we will use localhost.
// We will use a 'TodoApp' database for this app.
// If the 'TodoApp' data base does not exists, then it will be created if and only if we write data into it.
MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, db) => {
    // Handle the error in case we are not able to connect to the database.
    if (error) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

    // The connection is now established. Now we can store, update, or delete data from the database. 

    // Add some data to the 'Todos' collection.
    // There is no need to create the collection, just give the name and it gets created if not exists.
    // 'insertOne' let us create a new document into our collection.
    db.collection('Todos').insertOne({
        text: 'Something to do from insertOne',
        completed: false
    }, (error, result) => {
        // Handle the error.
        if (error) {
            // Start the following line with 'return' to prevent the execution of the rest of the function.
            return console.log('Unable to insert todo', JSON.stringify(error, undefined, 2));
        }
        // Print the result.
        console.log('Result', JSON.stringify(result, undefined, 2));
        // Print the doc that was inseted.
        console.log('Inserted doc', JSON.stringify(result.ops, undefined, 2));
    });

    // Add some users to the 'Users' collection.
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
        ],
        notes: "User from insertOne"
    }, (error, result) => {
        // Handle the error.
        if (error) {
            return console.log('Unable to insert user', JSON.stringify(error, undefined, 2));
        }
        // Print the doc that was inserted.
        console.log(JSON.stringify('Result', result.ops, undefined, 2));

        // Acces the '_id' propperty of the results array.
        var id = result.ops[0]._id;

        // We can get the TimeStapm from the id.
        console.log('Time stamp:', id.getTimestamp());
    });

    // Querying data.

    // Get the collection and fetch everything inside that collection and then store everything into a Array.
    db.collection('Todos').find().toArray().then((docsArray) => {
        if (docsArray.length == 0) {
            return console.log("There are no todos.");
        }
        console.log('Todos:');
        console.log(JSON.stringify(docsArray, undefined, 2));
    }, (error) => {
        console.log('Ubale to fectch todos', JSON.stringify(error, undefined, 2));
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
    }, (error) => {
        console.log('Unable to fectch completed todos', JSON.stringify(error, undefined, 2));
    });

    // Fectch a specific doc by its '_id' propperty.
    db.collection('Todos').find({
        _id: new ObjectID('593d7d146f52d5ab34c1fa0c')
    }).toArray().then((docsArray) => {
        if (docsArray.length == 0) {
            return console.log(`There are no todos with id ${new ObjectID('593d7d146f52d5ab34c1fa0c')}.`);
        }
        console.log('Todos:');
        console.log(JSON.stringify(docsArray, undefined, 2));
    }, (error) => {
        console.log('Ubale to fectch todos', JSON.stringify(error, undefined, 2));
    });

    // Count up all todos in 'Todos' collection.
    // Visit http://mongodb.github.io/node-mongodb-native/2.2/api/Cursor.html#count.
    // Set collection to a variable.
    var collection = db.collection('Todos');
    // If needed, insert some docs here...
    // Store in 'cursor' a set of docs.
    var cursor = collection.find();
    // Get the cursor count.
    cursor.count(function (error, count) {
        if (error) {
            return console.log('Unable to count todos.', JSON.stringify(error, undefined, 2));
        }
        console.log(`Todos count (1): ${count}`);
    });
    // Because 'count()' returns a promise, if there is no callback provided, then, alternatively, we can do the following:
    cursor.count().then((count) => {
        console.log(`Todos count (2): ${count}`);
    }, (error) => {
        console.log('Unable to count todos.', JSON.stringify(error, undefined, 2));
    });

    // We can also delete data from the database.

    // Get the collection.
    var todosCollection = db.collection('Todos');

    // deleteMany. Delete all docs that match  with the specified propperty.
    todosCollection.deleteMany({
        text: 'Nothing'
    }).then((result) => {
        // Analyse the result object.
        console.log('Result', JSON.stringify(result, undefined, 2));
        console.log(`deleteMany: ${result.deletedCount} files deleted`);
    }, (error) => {
        console.log('Error', JSON.stringify(error, undefined, 2));
    });

    // deleteOne. Delete the first doc that match the deletion criteria.
    todosCollection.deleteOne({
        text: 'Create new drawing'
    }).then((res) => {
        // Analyse the response object.
        //console.log(res);
        console.log(`deleteOne: ${res.deletedCount} files deleted`);
    }, (error) => {
        console.log('Error', JSON.stringify(error, undefined, 2));
    });

    // findOneAndDelete.
    todosCollection.findOneAndDelete({
        text: 'Create new drawing'
    }).then((result) => {
        // The result object is different.
        // Analyse the result object.
        console.log('Result', JSON.stringify(result, undefined, 2));
        console.log(`find OneAndDelete: ${result.lastErrorObject.n} files deleted`);
        if (result.lastErrorObject.n == 1) {
            console.log('doc deteleted:');
            console.log(JSON.stringify(result.value, undefined, 2));
        }
    }, (error) => {
        console.log(JSON.stringify(error, undefined, 2));
    });

    // We can also update docs from the database.

    // findOneAndUpdate.
    todosCollection.findOneAndUpdate({
        // Match criterea.
        // The following line would not work. 
        //_id: '593d73854ecd7e188c7ab6d0'
        // We have to use the ObjectID.
        _id: new ObjectID('593d73854ecd7e188c7ab6d0')
    }, {
        // Operations to perform to the matched document.
        // For operators visit https://docs.mongodb.com/manual/reference/operator/
        $set: {
            completed: true
        }
    }, {
        // Options.
        // For more options visit http://mongodb.github.io/node-mongodb-native/2.2/api/Collection.html#findOneAndUpdate
        returnOriginal: false // This give us the updated document.
    }).then((res) => {
        console.log(res);
    });

    // Challenge:
    var usersCollection = db.collection('Users');

    // findOneAndUpdate.
    usersCollection.findOneAndUpdate({
        name: 'Bernardo'
    }, {
        $set: {
            name: 'Bernardo Mondragon Brozon'
        },
        // New operator:
        $inc: {
            age: 1
        }
    }, {
        returnOriginal: false
    }).then((res) => {
        console.log(res);
    });

    // Disconnect from the server.
    db.close();
});