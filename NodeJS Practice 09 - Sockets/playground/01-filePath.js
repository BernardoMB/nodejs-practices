// Require path to use some useful functions.
// See documentation: https://nodejs.org/api/path.html
const path = require('path');

// In case the page we are going to server is not in the appropiate directory, we will need to go back some directories.
// '__dirname' is a reference to the current directory.

// The old way.
var uglyPublicPath = __dirname + '/../public';
console.log(uglyPublicPath);

// Better way to do it.
var betterPublicPath = path.join(__dirname, '../public');
console.log(betterPublicPath);

