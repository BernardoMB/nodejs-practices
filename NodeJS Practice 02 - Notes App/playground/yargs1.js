// Apps can run with arguments. Yargs is just a nicer array of arguments.

// run '$ node app.js list' and see that nothing happens. 
// run '$ node app.js greet' and see that nothing happens. 

// This tells us the following:
// (1) The executable of NodeJS that was used
// (2) The file that we are running
// (3) The list of arguments the app is running with
// To proof that run the following: $ node playground/yargs1.js comando --flag="parametro"
console.log("Process arguments:");
console.log(process.argv);

// Get the command.
var command = process.argv[2];
console.log("Command: ", command);

// Telling our app what to do if we run '$ node app.js greet'.
if (command === 'greet') {
    console.log("Hi!");
}

// run '$ node playgorund/yargs1.js list' and see what happens.
// run '$ $ node playgorund/yargs1.js greet' and see what happens.

// Now run this file passing the following arguments and see what happens:
// greet --way=1
// greet --way="1 special"
// greet --way='1' (will not work on windows)
// greet --way "1" ('process.argv will' be parsed differently and that is why we use 'argv')

// See how the arguments array is parsed differently in some cases.