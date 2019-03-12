const {
    ObjectID
} = require('mongodb');
const {
    mongoose
} = require('./../server/db/mongoose');
const {
    Todo
} = require('./../server/models/todo');

var id = '594b14a3a4be62bf90aa1bad';

// Remove. Remove all.
Todo.remove({}).then((res) => {
    console.log('REMOVE ALL');
    console.log('Result:');
    console.log(res);
}, (err) => {
    console.log('Unable to remove id:');
    console.log(err);
});

// Remove. 
// Remove by id.
// On the result we do not get the docs that got removed.
Todo.remove({
    _id: id
}).then((res) => {
    console.log('REMOVE BY ID');
    console.log('Result:');
    console.log(res);
}, (err) => {
    console.log('Unable to remove id:');
    console.log(err);
});

// findByIdAndREmove.
// On the result we get the doc that got removed.
Todo.findByIdAndRemove(id).then((todo) => {
    console.log('FIND BY ID AND REMOVE:');
    console.log('Result:');
    if (todo) {
        console.log('Removed todo:');
        console.log(todo);
    } else {
        console.log('Nothing got removed.');
    }
}, (err) => {
    console.log('Unable to remove id:');
    console.log(err);
});

// findOneAndRemove. 
// Find one and remove by specified propperty.
Todo.findOneAndRemove({
    text: "Fifth test todo"
}).then((res) => {
    console.log('FIND ONE AND REMOVE BY TEXT PROPPERTY');
    console.log('Result:');
    console.log(res);
}, (err) => {
    console.log('Unable to remove id:');
    console.log(err);
});