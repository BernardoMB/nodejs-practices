#### GENERAL KNOWLEDGE

Install node globaly:
```
$ npm install node --global
```
or 
```
$ npm i node -g
```
Run every file of this project using `node`. For example
```
$ node playground/callbaks.js
```

# ASYNC Basics:
 - setTimeout
 
 - Call stack
 
 - Event loop
 
# CALLBACKS 
 - User callback.

 - See `playground/callbacks.js` file.

# PRETTY PRINTNG OBJECTS & ERROR HANDLING
- Stringyfy overload: 
    ```ajavascript
    console.log(JSON.Stringify(response, undefined, 3));

    ``` 
 - See `app-1.js` file. 

# REQUEST
<p>Request is a 3rd party module.</p> Request is designed to be the simplest way possible to make http calls. It supports HTTPS and follows redirects by default.

 - Install the library:
    ```
    $ npm install require --save
    ```
 
 - Using the module.
 
 - callbacks.
 
 - For `statusCodes` visit <https://httpstatuses.com/>.
 
 - Google's API for weather and geocoding.
 
 - See `app-1.js`, `app-2.js`, and `app-3.js` files.

# PROMISSES
 <p>To handle async code</p>
 
 - resolve
 
 - reject
 
 - then
 
 - Chains of promises
 
 - catch
 
 - See all `promise.js` files in `/playground` directory.

# THROW ERROR
 - We can throw errors if somethings do not went as spected: 
    ```
    throw new error('Error message');
    ``` 

 - See `app-4.js` file.

# EXTENSIONS

Install EsLint so EsLint Visual Studio Code extension works:
```
$ npm i eslint --save-dev
``` 