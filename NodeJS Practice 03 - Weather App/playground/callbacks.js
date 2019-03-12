console.log("Starting App");

var getUser = (id, callback) => {
  var user = {
    id: 420,
    name: 'Bernardo'
  };

  // Do something with the information that was just fectched. 
  setTimeout(() => {
    callback(user);
  }, 3000);
};

var logUser = (userObject) => console.log(userObject); 

getUser(31, logUser);

console.log("Finiching up");