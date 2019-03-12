var db = require('./db.js');

module.exports.handleSignup = (email, password) => {
  // Check if email already exists

  // Save the user to the database.
  db.saveUser({email, password});
  // Alternatively
  /*db.saveUser({
    email: email,
    password: password
  });*/
  
  // Send the welcome email
};
