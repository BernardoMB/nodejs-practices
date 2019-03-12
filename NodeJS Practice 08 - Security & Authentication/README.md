# HASHING DATA

 - Install a third party library to hash data: 
    ```
    $ npm install crypto-js -- save
    ```
    This library is only for playground porpouses.

 - See `playground/hashing.js` file.

# JSON WEB TOKEN

 - Install a library to send tokens:
    ```
    $ npm install jsonwebtoken --save
    ```

 - In <https://jwt.io> we can paste the `token variable` and see what we get. 

 - See `playground/hashing.1.js` file.

# VALIDATING MONGOOSE MODELS

 - Use a third party library to get access to a lot of `validation functions`: 
    ```
    $ npm install validator --save
    ```

 - See `playground/03-server/models/user.js` file.

 - Run the server and try yo make a `post` to the server sending invalid data.

# MODEL METHODS & INSTANCE METHODS

 - Regarding the `User` model we can call methods on the model itself or on an instance of that model:
    ```javascript
    var cursor = User.findByToken(myToken);
    
    user.generateAuthToken();  
    ```

 - See `server/models/user.js` and `server/server.js` files.

 - Use private routes.

# BYCRYPT.JS

 - Install the encription algorythm:
    ```
    $ npm install bcryptjs --save
    ```

 - See `playground/04-bycryptjs.js` file.

# TESTING

- See `server/test/server.test.js` and `server/test/seed/seed.js` files.

# AUTHENTICATIOM

 - Some authentications routes added and `POST /todos` and `GET /todos` route modified. 

 - The `test cases` for `POST /todos` and `GET /todos` were modified.

# MODIFY CONFIGURATION
 - There is some info we do not want to store in **Github** like the `secret string`. That is why there is a better way to set those variables via setting `environment variables`.

 - See `server/config/config.js` and `server/config/config.json` files.

 - It is very important to `gitignore` the `config.json` file.

# DEPLOYING TO HEROKU
 - See `Heroku's configuration` or `deployment configuration`:
    ```
    $ heroku config
    ```
 - Set a `production environment variable` (NAME):
    ```
    $ heroku config:set NAME=Bernardo
    ```
 - Get the configurated variable:
    ```
    $ heroku config:get NAME
    ```
 - Remove an `environment variable`:
    ```
    $ heroku config:unset NAME
    ```
 - Finally set the `JWT_SECRET environment variable`:
    ```
    $ heroku config:set JWT_SECRET=asdfghjkl
    ```
 - Connect to the deployed database.
    - Run the following:
        ```
        $ heroku config:get MONGODB_URI
        ```
    Expected output:
        ```
        mongodb://heroku_d0mkgd4b:f7hpgsjnemg196ibk4h0fv7glb@ds135532.mlab.com:35532/heroku_d0mkgd4b
        ```
    - Protocol: mongodb:// (mongodb connection request)
    - Username: heroku_d0mkgd4b
    - Password: f7hpgsjnemg196ibk4h0fv7glb
    - Database Address: ds135532.mlab.com
    - Port: 35532
    - Database: heroku_d0mkgd4b

    - Create a new connection in **Robomongo** specifying the values above.

 - Deploy to **Heroku**:
    ```
    $ git push heroku master
    ```
# ADVANCED POSTMAN FOR TESTING

 - It is a pain to grab `ids` and `auth tokens` all the time. So it is better to convert the `auth token` to a **Postman** `environment variable`.

 - Go Test section inside of Postman in the `POST /users` route to run some code after the `request` comes back.

 - Insert code to set the `token` to a `Postman environment variable`.
    ```javascript
    var token = postman.getResponseHeader('x-auth');
    postman.setEnvironmentVariable('x-auth', token);
    ```
    Save the method in Postman and do the same for the login route.

 - Modify all the methods to use the `x-auth global environment variable`.

 - Go to Test in the `POST /todos` route and set the `id` that gets back to a `global Postman environment variable`:
    ```javascript
    var body = JSON.parse(responseBody);
    postman.setEnvironmentVariable('todoId', body._id);
    ```
