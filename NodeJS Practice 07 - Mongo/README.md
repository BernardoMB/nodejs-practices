#### MONGO, HEROKU, AND POSTMAN

Start this practice by reading this document and seeing the playground folder first.

# MONGO DB

Create a local **MongoDB** server to connect to that server with **NodeJS** and read or write to that database.

- Install **Mocha** globaly:
   ```bash
   $ npm i mocha -g
   ```
 
- Install the data base software by going to Mongo's website: <https://www.mongodb.com/download-center#community>.
 
- Create storage directory anywhere in your machine:
   ```bash  
   $ mkdir mongo-data
   ```
 
- Navigate to **MongoDB** program files:
   ```bash
   $ cd "C:\Program Files\MongoDB\Server\3.4\bin"
   ```
   Version may change.
 
- Start up the server providing the path to the storage directory:
   ```bash
   $ mongod.exe --dbpath "C:\Users\bmond\Documents\Programming\NodeJS\NodeJS Practices\NodeJS Practice 07\mongo-data"
   ```
   Expect output bottom line: <pre>waiting for connections on port 27017</pre>
 
- Connect to the server and issue some commands to write and read some data. Navigate to the same bin directory and run on a new cmd window the following to connect to local Mongo db:
   ```bash
   $ mongo.exe
   ```
   Expected output in the first cmd window: `connection accepted`.
   This is going to connect to local **MongoDB** and it is going to put us on a sort of a cmd view of our database. We will be able to issue variuos MongoDB commands to manipulate the data (kind of running `$ node myFile.js`).
 
- On the secondary console set a text propperty:
   ```bash
   $ db.todos.insert({text: 'Create new Node course'})
   ```
   Expected output: `WriteResult({"nInserted" : 1})`
   One record was inserted.
 
- Call find with no arguments provided:
   ```bash
   $ db.Todos.find()
   ```

# ROBOMONGO

It is a **GUI** for MongoDB. It is going to let us connect to the db and manipulate it.
 
- Install **Robomongo** by visiting their website.
- Run Robomongo and hit `create` on `connections` windows.
- Set the name of the connection we are about to create.
- Connect to the data base by simply double clicking the `connect` button.
- Open the tree view and make a secondary clic on `Todos` and select `View documents`.
- We can insert **documents** to a db just by simlpy secondary clicking and selecting `Insert Document`.

# SQL & NoSQL
- Comparison.
- Table vs collection.
- Row/Record vs Document.
- Column vs Field.

# MONGO from NODE
- Google `MongoDB native` or go to <https://github.com/mongodb/node-mongodb-native> and read the `README.md` file.
  
- Inside there are oging to be very important links such as:
   - Documentation
   - API Reference
   - Source
   - Official site
  
- See the repository files.
  
- Run the following:
   ```bash
   $ npm init
   ```
  
- Run the following:
   ```bash
   $ npm install mongodb --save
   ```
  
- Create the file `mongodb-connect.js`.
  
- See `playground/` files.

# ID PROPPERTY

- Its different from **SQL**.
- Not `autoincremented integer`.
- Ids `scale out`.
- The first 4 bytes are a `timeStamp`.
- The next 3 bytes are a `machine identifier`.
- The next 2 bytes are a `process id`.
- The nest 3 bytes counter are like a `id` (random value).

# MONGOOSE ORM

- **ORM** stands for Object Relational Mapping. 
- Check the website: <http://mongoosejs.com/>
- Docs: <http://mongoosejs.com/docs/guide.html>

- Run the following:
   ```bash
   $ npm i mongoose --save
   ```
 
- Create a `server` directory.
 
- See `server/server.js` file.

# POSTMAN

- Install **Postman** by visiting <http://postman.com>.
- Visit the following website to see a description for all `http statuces`: <http://httpstatuces.com>.
- Save resquests in `collections` of `http methods`.

# BODY-PARSE
- It is a `middle ware` to acces the `body` and all of the propperties of a `request` or `response`.
- Install some usefull code to parse the body of the request and response objects.
   ```bash
   $ npm i body-parse --save
   ```

# HEROKU DEPLOYMENT
- Inside the `package.json` file add the following script:
  ```javascript
  "start": "node server/server.js"
  ```

- Tell **Heroku** what version of Node it will be using:
  ```javascript
  "engines": {
    "node": "{current node version}"
  }
  ```

- Go to Heroku dashboard, click a deployed app and see its `add-ons` and clic on `configure`. There are several cool add-ons.

- Add **mLab MongoDB** add-on into the new Heroku app.

- Create Heroku app:
   ```bash
   $ heroku create
   ```

- Create a free Heroku plan at the following website: <https://dashboard.heroku.com/account/billing>.

- Tell Heroku to use the add on by inserting the following propperty to the `package.json` file: 
   ```bash
   $ heroku addons:create mongolab:sandbox
   ```

- See the configuration to obtain the `MongoDB URL`:
   ```bash
   $ heroku config
   ```

- Commit and push to git repository.
   ```bash
   $ git push heroku master
   ```

- See the log for the application:
   ```bash
   $ heroku logs
   ```

- Open the deployed url:
   ```bash
   $ heroku open
   ```

- Navigate to the `todos` route and see that the `json` of `todos` comes back com the db.

- Test every `GET` and `POST` method inside **Postman**.

# CUSTOMIZING POSTMAN

- Customize Postman to test our deployed apps more easily:
   - Create two `environments`, one for the local machine and one for **Heroku**.
   - Copy the Heroku URL. Click on Manage environments and select `Add`.
   - Add the key-value pairs URLs for each enrironment. 
   - Now switch to an `environment`.
   - To test replace the URL you enter on each `http method`. Example: `{{url}}/todos`. That `{{url}}` is dynamic and it is going to grap the URL for the `current environment`.
   - Now change all the `http methods` to use the `{{url}}` variable.

# CREATING A TEST DATABASE

- Modify the test script:
   ```javascript
   "test": "export NODE_ENV=test || SET \"NODE_ENV=test\" && mocha server/* /*.test.js"
   ```

- Modify the `server.js` file for setting up the `environment variable`. See `config/config.js` file.
