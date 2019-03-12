// Require 'JsonWebToken' the token handler.
const jwt = require('jsonwebtoken');

var data = {
    id: 10
};

// Generate token.
// '123abc' is the secret string.
var token = jwt.sign(data, '123abc');
// 'token' is the value that we are going to be sending to the user.
// This 'token' is what we are going to store in the 'tokens' array of the 'user' model. 

console.log('token', token);
// In https://jwt.io we can paste the 'token variable' and see what we get. 

// Verify that the data was not manipulated with the secret.

// Succes case.
var decoded = jwt.verify(token, '123abc');
console.log('Decoded', decoded);

// Failure case.
//var decoded = jwt.verify(token, '123abs');
//console.log('Decoded', decoded);