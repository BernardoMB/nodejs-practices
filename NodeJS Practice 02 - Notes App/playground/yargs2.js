// Requireing the module.
const yargs = require('yargs');

// Printing all arguments.
console.log('Process:', process.argv);

// 'yargs.argv' is a nicer list of arguments.
const argv = yargs.argv; 
console.log('Yargs:', argv);
// If we run '$ node playground/yargs2.js greet badly --way=1', the variable 'argv' will store the 2 commands and then the option:
// Yargs: { _: [ 'greet', 'badly' ], way: 1, '$0': 'playground\\yargs2.js' }

var command1 = process.argv[2];
var command2 = argv._[0];
console.log("Command1: ", command1);
console.log("Command2: ", command2);