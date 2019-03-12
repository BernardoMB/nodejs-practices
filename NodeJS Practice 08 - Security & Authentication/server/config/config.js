// Define environment.
var env = process.env.NODE_ENV || 'development';

// Specify the port and database uri dependig on which environment the app is running.
/*if (env === 'development') {
    process.env.port = 3000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp';
} else if (env === 'test') {
    process.env.port = 3000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest';
}*/

// Better do the following.

if (env === 'development' || env === 'test') {
    // Load in a separate json that store the development and test configuration of our project.
    var config = require('./config.json');
    var envConfig = config[env];
    // Object.keys() function returns an array with al the keys of the object provided.
    // In this case ["PORT", "MONGODB_URI"]
    //console.log(Object.keys(envConfig));
    Object.keys(envConfig).forEach((key) => {
        process.env[key] = envConfig[key];
    });
}