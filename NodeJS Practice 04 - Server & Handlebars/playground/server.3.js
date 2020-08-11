// Use of a middleware function to display the help.html page.
const express = require('express');
const path = require('path'); // native module: function to manipulate file or directory paths

var app = express();

// Configura an entire directory to serve static files. (Serve the files in public)
// Express cant serve static files providing relative path. It need the absolute path.
console.log(__dirname);
console.log(__filename);

// Point to the public folder
console.log(path.join(__dirname, '../public'));

const publicDirectoryPath = path.join(__dirname, '../public');

// In order to run the help page. I need a middleware function called use.
app.use(express.static(publicDirectoryPath));

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});