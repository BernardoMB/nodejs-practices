const mongoose = require('mongoose');
const validator = require('validator');

// {
//   email: 'andrew@example.com',
//   password: 'adpsofijasdfmpoijwerew',
//   tokens: [{
//     access: 'auth',
//     token: 'poijasdpfoimasdpfjiweproijwer'
//   }]
// }

var User = mongoose.model('User', {
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    // The user has to be unique.
    unique: true,
    // Search in google: 'mongoose custom validation' and read mongoose docs.
    validate: {
      // Provide a function that returns true if the email is valid or false if the email is invalid.
      validator: validator.isEmail,
      // Message in case it is invalid.
      message: '{VALUE} is not a valid email'
    }
    // Alternatively.
    /*validate: {
      validator: (value) => {
        return validator.isEmail(value);
      },
      message: '{VALUE} is not a valid email'
    }*/
  },
  password: {
    type: String,
    require: true,
    minlength: 6
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
});

module.exports = {User}
