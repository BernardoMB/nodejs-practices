#### GENERAL KNOWLEDGE

# TEMPLATE STRINGS
 - Example: 
    ```javascript
    console.log(`Hello ${os.userInfo().username}!`);

    // Hello bmond!
    ```

# JSON
 - JSON.stringify:
    ```javascript
    var person = {
        name: 'Bernardo',
        lastName: 'Mondragon Brozon',
        age: 23
    };
    
    var personString = JSON.stringify(person);
    
    console.log(personString);
    
    // {"name":"Bernardo","lastName":"Mondragon Brozon","age":23}
    ```

 - JSON.parse:
    ```javascript
    var personString = '{"name": "Bernardo", "lastName": "Mondragon Brozon", "age": 23}';
    
    var person = JSON.parse(personString);
    
    console.log(person);
    
    // {name:'Bernardo', lastName: 'Mondragon Brozon', age: 23}
    ```

# ARROW FUNCTIONS
 - Arrow functions are just a different notation of a regular JavaScript function. For example, consider the following function that squares the number given as an argument: 
    ```javascript
    var square = function (x) {
        return x * x;
    }

    square(9); // 81
    ```
 - This can be done in serveral ways using **ES6 arrow functions**:
    ```javascript
    // ES6 arrow function notation.
    var square1 = (x) => {
        return x * x;
    };

    // If the function has only one line of code then we can simply return the value by pointing at it.
    var square2 = (x) => x * x;

    // If the function only takes one argument then we can simply provide the argument with no braces.  
    var square3 = x => x * x;
    
    square1(4); // 16
    square2(4); // 16
    square3(4); // 16
    ```
 - SE6 also give us some usefull functionality like giving an object a funciton that takes as arguments its own propperties:
    ```javascript
    // Creating a user object and giving functions as propperties.
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

    // This will not work as spected.
    user.sayHi(1, 2, 3);

    /*
    Arguments:  { '0': {},
    '1':
    { [Function: require]
      resolve: [Function: resolve],
      main:
       Module {

           [...]

       '3': 'C:\\Users\\bmond\\Documents\\Programming\\NodeJS\\NodeJS Practices\\NodeJS Practice 02 - Notes App\\playground\\arrow-function.js',
       '4': 'C:\\Users\\bmond\\Documents\\Programming\\NodeJS\\NodeJS Practices\\NodeJS Practice 02 - Notes App\\playground' }
    Hi. I'm undefined
    */

    // This will work as spected.
    user.sayHiAlt(1, 2, 3);

    /*
    Arguments:  { '0': 1, '1': 2, '2': 3 }
    Hi. I'm Bernardo
    */
    ```

# USER INPUT
 - See ```playground/yargs1.js``` file.

 - Process.argv
 
# YARGS
<p>Yargs be a node.js library fer hearties tryin' ter parse optstrings. With yargs, ye be havin' a map that leads straight to yer treasure! Treasure of course, being a simple option hash.</p>

 - yargs.argv.

 - Configureing yargs.

 - Advanced yargs.

 - See ```playground/yargs2.js``` file.

# NODEMON:
 - Install nodemon so apps.js restarts automatically when saving: <pre><code>$ npm install nodemon --save</code></pre>
 or <pre><code>$ npm i nodemon --save</code></pre> 
 
 - Some commands:
    ```
    $ npm install -g nodemon
    $ nodemon app.js
    $ nodemon debug app.js
    ```
# DEBUGGING
```
$ node debug app.js
$ | c
$ | n
$ | quit or ctr-C
debugging; statment
```