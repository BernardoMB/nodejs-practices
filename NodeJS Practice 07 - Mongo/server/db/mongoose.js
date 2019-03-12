var mongoose = require('mongoose');

// Tell mongoose to use promises.
mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGODB_URI);

// Export the connection.
module.exports = {mongoose};