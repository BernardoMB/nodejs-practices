#### TESTING 

# MOCHA #
<p>For running test suites.</p> 
 
 - Visit the website: mocha.org
 
 - Install the package for development porpuses: <pre><code>$ npm i mocha@3.0.0 --save-dev</code></pre>
 
 - Mocha is going to run every file with the '.test' extension. (see utils.test.js) and for that do the following:
    - In 'package.json' set the following test command: <pre>"test": mocha **/*.test.js</pre> or <pre>"test": mocha utils/*.test.js</pre> for a specific directory.
 
 - Run the test script: <pre><code>$ npm test</code></pre>

# TESTING WITH NODEMON #
 - To test every time we save a file tun the following command: <pre><code>$ nodemon --exec "npm test"</code></pre>
 
 - Instead of running the preveous command we can do the same add the following to the package.jason: <pre>"test-watch": "nodemon --exec \"npm test\""</pre> <p>And then running the following command:</p> <pre><code>$ npm run test-watch</code></pre>

# EXPECT #
 <p>Expect is an assertion library so we can save time using it instead of validating data and manually throwing erros.</p>
 
 - To test we can install the assertion library: <pre><code>$ npm install expect@1.20.2 --save-dev</code></pre> <p>See file utils.test.js</p>

 # MOCHA ASYNC TESTING #
  - Pass the done argumento to the its statements.

# SUPERTEST #
<p>HTTP assertions made easy via superagent.</p>
 
 - Install using npm: <pre><code>$ npm i supertest@2.0.0 --save-dev</code></pre>
 
 - Assertions about the response.
 
 # DESCRIBE #
  - Calling the function describe() and make the assertions inside is better: <pre>describe('Section', () => {
    it('Should...', callback);
    });</pre>
    <p>See utils.test.js</p>

# SPIES #
 - Assertions about how functions are called.
 
 - For more info google mjackson npm library.

# REWIRE #
 - Install Rewire: <<pre><code>$ npm i rewire --save-dev</code></pre>