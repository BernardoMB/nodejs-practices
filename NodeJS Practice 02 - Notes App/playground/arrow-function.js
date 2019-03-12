// Better see README.md file.

// There are several ways to declare a function:
var square1 = x => x * x;
var square2 = (x) => x * x;
var square3 = (x) => {
    return x * x;
};
var square4 = function(x) {
  return x * x;  
};

// The output should be the same.
console.log(square1(9));
console.log(square2(9));
console.log(square3(9));
console.log(square4(9));

// Usefull.
var user = {
  name: 'Bernardo',
  sayHi: () => {
    console.log('Arguments: ',arguments);
    console.log(`Hi. I'm ${this.name}`);
  },
  sayHiAlt () {
    console.log('Arguments: ', arguments);
    console.log(`Hi. I'm ${this.name}`);
  }
};

console.log('\nBegin bad printing /*\n');

// This will not work as spected.
user.sayHi(1, 2, 3);

console.log('\nEnd bad printing */\n');

// This will work as spected.
user.sayHiAlt(1, 2, 3);
