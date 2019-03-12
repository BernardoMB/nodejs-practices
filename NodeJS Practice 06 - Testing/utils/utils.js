// Very simple function.
module.exports.add = function(a, b) {
    return a + b;
}

module.exports.square = (x) => x * x;

module.exports.setName = (user, fullName) => {
    var names = fullName.split(' ');
    user.firstName = names[0];
    user.lastName = names[1];
    return user; 
}

// The following function is for async testing.
module.exports.asyncAdd = (a, b, callback) => {
    // If we set a timeour greater than 1 second, Mocha is going to assume something failed.
    setTimeout(() => {
        callback(a + b);
    }, 1000);
}