var mongoose = require('mongoose');

var Todo = mongoose.model('Todo', {
    text: {
        // Visit documentation to see all the things we can specify to the text propperty.
        type: String,
        required: true,
        // Visit http://mongoosejs.com/docs/validation.html for more validators.
        minlenght: 1,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number,
        default: null
    }
});
module.exports = { Todo };