// Delete documents of DB.

const { MongoClient, ObjectID } = require("mongodb");

var url = 'mongodb://localhost:27017/TodoApp';
MongoClient.connect(url, (err, db) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

    var todosCollection = db.collection('Todos');

    // deleteMany. Delete all docs that have the same text propperty.
    todosCollection.deleteMany({
        text: 'Nothing'
    }).then((res) => {
        // Analyse the response object.
        //console.log(res);
        console.log(`deleteMany: ${res.deletedCount} files deleted`);
    }, (err) => {
        console.log(err);
    });

    // deleteOne. Delete the first doc that match the deletion criteria.
    todosCollection.deleteOne({
        text: 'Create new drawing'
    }).then((res) => {
        // Analyse the response object.
        //console.log(res);
        console.log(`deleteOne: ${res.deletedCount} files deleted`);
    }, (err) => {
        console.log(err);
    });

    // findOneAndDelete.
    todosCollection.findOneAndDelete({
        text: 'Create new drawing'
    }).then((res) => {
        // The response object is different.
        // Analyse the response object.
        //console.log(res);
        console.log(`find OneAndDelete: ${res.lastErrorObject.n} files deleted`);
        if (res.lastErrorObject.n == 1) {
            console.log('doc deteleted:');
            console.log(JSON.stringify(res.value, undefined, 2));
        }
    }, (err) => {
        console.log(err);
    });

    db.close();
});