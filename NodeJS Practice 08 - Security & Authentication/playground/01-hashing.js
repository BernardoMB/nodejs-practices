// Require the module to hash data.
const { SHA256 } = require('crypto-js');

var message = 'I am user number 3';
var hash = SHA256(message).toString();

console.log(`Message: ${message}`);
console.log(`Hash: ${hash}`);

// It is a bad idea to store plain text password in the database.
// We need to store the passwords in a hashed format.

// Data we are going to send to the client.
var data = {
    id: 4
};

// 'token' is what we are goint to send back to the client. 
// This is what we pass back and forward.
var token = {
    // 'data': data above.
    // 'hash': hashed value of the data.
    // 'somesecret' string is only on the server and the man in the middle wont know that.
    data,
    hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
}

// Man in the middle.
token.data.id = 5;
token.hash = SHA256(JSON.stringify(token.data)).toString();

// Data that may have been manipulated.
var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();

if (resultHash === token.hash) {
    console.log('Data was not changed');
} else {
    console.log('Data was changed. Do not trust!');
}