const bcrypt = require('bcryptjs');

var password = '123abc';

// Creates a random value at the end of what is going to be 
// hashed so nobody can create a list of hashed words and match the tables to 
// get the real password.
bcrypt.genSalt(10, (error, salt) => {
    bcrypt.hash(password, salt, (error, hash) => {
        console.log('hash', hash);
    });
});

// The generated hash in the previous function call is similar to the following:
var hashedPassword = '$2a$10$uPyqtONXNmTwGWqnrNLM/.PbLrU7AxhzrsaUM6joSS7PIAy0wi//G';

bcrypt.compare(password, hashedPassword, (error, response) => {
    console.log('response', response);
});

bcrypt.compare('123abcd', hashedPassword, (error, response) => {
    console.log('response', response);
});