const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

// The 'Schema' propperty of 'mongoose' let us define a new schema for the user model. 
// We need the Schema propperty to define on the model-methods and the instance-methods.
// The Schema constructor takes an object which are going to be all the atributes of the user model.
var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    require: true,
    minlength: 6
  },
  tokens: [ {
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  } ]
});

// Define the INSTANCE METHODS.

// Tell what mongoose should send back when the user model is converted to a json object.
UserSchema.methods.toJSON = function () {
  var user = this;
  var userObject = user.toObject();
  return _.pick(userObject, [ '_id', 'email' ]);
};

UserSchema.methods.generateAuthToken = function () {
  var user = this;
  var access = 'auth';
  var token = jwt.sign({
    _id: user._id.toHexString(),
    access
  }, process.env.JWT_SECRET).toString();
  user.tokens.push({
    access,
    token
  });
  // Update and save the user object.
  // Return a promise: If there is no error saving, then pass the token to the next .then() call.
  return user.save().then(() => {
    return token;
  });
};

UserSchema.methods.removeToken = function (token) {
  console.log('\n\nTaken\n\n', token);
  var user = this;
  // Remember that update returns a promise if no then() callback provided.
  return user.update({
    // MongoDB operator '$pull' let us remove items from an array that match certain criterea. 
    $pull: {
      // Define what we want to pull.
      tokens: { token }
    }
  });
};

// Define the MODEL METHODS.

// Hash the password before storeing it.
// Visit the documentation to see how 'pre' operates.
UserSchema.pre('save', function (next) {
  // Get acces to the individual document.
  var user = this;
  // To do not rehash the value every time we update the doc we should use 'isModified()'.
  if (user.isModified('password')) {
    bcrypt.genSalt(10, (error, salt) => {
      bcrypt.hash(user.password, salt, (error, hash) => {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

UserSchema.statics.findByToken = function (token) {
  var User = this;
  var decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (e) {
    return new Promise((resolve, reject) => {
      reject();
    });
    // Alternatively.
    //return Promise.reject();
  }
  // Return a promise so we can add a .then() call to the findByToken() call. 
  return User.findOne({
    '_id': decoded._id,
    // alternatively.
    //_id: decoded._id,
    'tokens.access': 'auth',
    'tokens.token': token
  });
};

UserSchema.statics.findByCredentials = function (email, password) {
  var User = this;
  return User.findOne({ email }).then((user) => {
    if (!user) {
      return Promise.reject();
    }
    return new Promise((resolve, reject) => {
      // Use bcrypt.compare to compare password and user.password
      bcrypt.compare(password, user.password, (error, result) => {
        if (result) {
          resolve(user);
        } else {
          reject();
        }
      });
    });
  });
};

// Pass the 'UserSchema'.
var User = mongoose.model('User', UserSchema);

module.exports = { User }
