// See 'package.json' and note that in the test command the variable 'process.env.NODE_ENV' is set to 'test'.
 
// Define environment.
var env = process.env.NODE_ENV || 'development';

// So, if we test the server, the variable 'process.env.NODE_ENV' is set to 'test'.
// If we run the app locally, the variable 'process.env.NODE_ENV' is set to 'development'
// If the app is running on herokus servers, the variable 'process.env.NODE_ENV' is set to the current environment.

// Specify the port and database uri dependig on which environment the app is running.
if (env == 'development') {
    process.env.port = 3000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp';
} else if (env === 'test') {
    process.env.port = 3000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest';
}