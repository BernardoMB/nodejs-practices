var info = require('./notes.json');
console.log(info);

// Declare an JavaScript object.
var personObject = { name: 'Bernardo', age: 23 };
// Parse the object to a JSON string.
var stringObj = JSON.stringify(personObject);
// Check the return value of JSON.stringify.
console.log(typeof stringObj);
console.log(stringObj);

// Declare a JSON string.
var personString = '{"name": "Bernardo", "age": 23}';
// Parse the JSON string to an object.
var person = JSON.parse(personString);
// Check the return value of JSON.parse.
console.log(typeof person);
console.log(person);

// Require the FileSystem module to write to a file.
const fs = require('fs');
// Create a note object.
var note = {
  title: 'Some title',
  body: 'Some body'
};
// Parse the note to a JSON string so we can later safe that to the .json file.
var noteString = JSON.stringify(note);
// Write the JSON string to notes.json.
fs.writeFileSync('playground/notes.json', noteString);
// Read the JSON string.
var noteAsString = fs.readFileSync('playground/notes.json');
// Parse the JSON string to an object.
var note = JSON.parse(noteAsString);
// Check if we have what we expected.
console.log(typeof note);
console.log(note.title);
