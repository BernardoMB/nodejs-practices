[{
  id: '/#12poiajdspfoif', // Socket id
  name: 'Andrew', // Display name for the user
  room: 'The Office Fans' // The room the user join.
}]

// addUser(id, name, room)
// removeUser(id)
// getUser(id)
// getUserList(room)

// Create a ES6 User class.
class Users {
    // This contructor function gets called when we create a new User with new.
  constructor () {
    this.users = [];
  }
  addUser (id, name, room) {
    var user = {id, name, room};
    this.users.push(user);
    return user;
  }
  removeUser (id) {
    var user = this.getUser(id);
    if (user) {
      this.users = this.users.filter((user) => user.id !== id);
    }
    return user;
  }
  getUser (id) {
    return this.users.filter((user) => user.id === id)[0]
  }
  getUserList (room) {
    var users = this.users.filter((user) => user.room === room);
    // .map let us get the specified propperty only.
    var namesArray = users.map((user) => user.name);
    return namesArray;
  }
}

module.exports = {Users};