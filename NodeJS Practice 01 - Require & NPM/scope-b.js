// Require.

// Requireing our own modules.
// The function require will return the module object.
const module_a = require('./scope-a.js');

console.log("\n\tNUMBERS");

// The two following lines are commented out because the console will print an error because the variables one and two are not defined.
//console.log(one);
//console.log(two);

// These variables are declared in the global nameSpace of scope-a.js
// Not recomended pattern.
console.log(three);
console.log(four());

// Recomended pattern.
console.log(module_a.five); 
console.log(module_a.six);
console.log(module_a.seven());

// This will print undefined because the varible three is not under the exports object of moduleA object.
// Instead, three es declared global (see above).
console.log(module_a.three);

console.log("\n\tSee greetings.txt");

// Requireing modules from NodeJS' API.
var fs = require('fs'); // module to write to a file.
fs.appendFile('greetings.txt', 'Hello world!');
var os = require('os'); // module to get some info about the windows user.
console.log("\n\tUSER INFO:")
console.log(os.userInfo());
// Instead of concatenating strings with '+', one can use template strings:
console.log(`Hello ${os.userInfo().username}!`);
// Now append to the same file.
fs.appendFile('greetings.txt', `\n\nHello ${os.userInfo().username}!`); // Note the "`".

// Requireing modules from thirth party library (use of npm).
var _ = require('lodash');
// Use _ to see if the provided parameter is a string.
console.log("\n\tTESTING LODASH");
console.log(_.isString(true));
console.log(_.isString('Bernardo'));
// Use another functionality of _. Eliminate duplicates in the array provided.
var arrayWithDuplicates = ['1','2','2','3','4','5','5','5','6',1,2,1,1,3,4,4];
console.log("Array with duplicates:");
console.log(arrayWithDuplicates);
var filteredArray = _.uniq(arrayWithDuplicates);
console.log("Array without duplicates:")
console.log(filteredArray);

// Callbacks.
function odds(numbers, callback) {
	var oddNums = numbers.filter(function(n) { return n % 2; });
	var err = numbers.indexOf(3) > -1 ? new Error('MENSAJE!!!!!!!!!!:No 3s Allowed') : null;
	console.log('A');
	setTimeout(function () {
		callback(err, oddNums);
	}, 5000);
}

console.log("\n\tCALLBACKS");
var myFunction = function(err, data) {
	if (err) {
		throw err;
	} else {
		console.log('data:', data);
	}
}

var numbers = [1,2,4,5,6,7,8,9,10];

odds(numbers, myFunction);

console.log("Este mensaje es llamado despues de la ejecusión de odds().");
