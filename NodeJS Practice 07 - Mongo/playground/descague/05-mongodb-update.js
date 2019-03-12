// Update documents of DB.

const { MongoClient, ObjectID } = require("mongodb");

var url = 'mongodb://localhost:27017/TodoApp';
MongoClient.connect(url, (err, db) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

    var todosCollection = db.collection('Todos');

    // findOneAndUpdate.
    todosCollection.findOneAndUpdate(
        {
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
    usersCollection.findOneAndUpdate(
        {
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

    db.close();
});