#### GIT & HEROKU

# GIT

Download and install `Git`: <https://git-scm.com/downloads>.

Version control. Let other user your code. You can run the following commands in the terminal to use version control in any project.

Initialize an empty Git repository:
```bash
 $ git init
 ```

 View the status of the repository:
 ```bash
 $ git status
 ```

 Add changes in server.js to the next commit:
 ```bash
 $ git add server.js
 ```

Add all changes to the next commit:
```
$ git add .
```

Create a new version of the project by making a commit:
```bash
$ git commit -m "My message"
```

`Github` is a popular cloud service to host repositories online. Tell Git that the project will be hosted on Github:
```
$ git remote  http://github.com/BernardoMB/myRepository
```
This will make Git to push local commits (versions) to the cloud.

Store the current version of the project in Github servers:
```
$ git push origin master
``` 

- Create `.gitignore` file to do not include some files in the project's versions.
 
- Insert the names of the files to ignore them.

# SSH KEYS

In order to communicate our machine with Github we are going to need to create a `SSH key`. SSH key were designed to securely communicate two computers. In this case it is going to be our machine and the **Github** server. This is going to let us confirm that Github is who they say 
they are and it going to let Github confirm that we indeed have accces to the code we are trying to alter. This all going to be done with `SSH keys`.

To know more about `SSH keys` head to <https://help.github.com/categories/ssh/>

## Generate a SSH key

- Open git bash and type the following to check if there are any SSH keys stored in your machine:
   ```bash
   $ ls -al ~/.ssh
   ```

- Generate key for a specific user:
   ```bash
   $ ssh-keygen -t rsa -b 4096 -C "bmondragonbrozon@gmail.com"
   ```
   This command is going to generate to files in the `SSH folder`.

- Skip all things that aren't needed. If it asks for a file in which to save the key just hit enter. Do the same with passphrase and with the passphrase confirmation. After this, a message will be shown saying that the SSH key was succesfully generated. 

- View again all the generated keys:
   ```bash
   $ ls -al ~/.ssh
   ```
   
   - `id_rsa` : This file contains the private key. Will will never give this file to anyone. It lives in your machine and in your machine only.
   - <code>id_rsa.pub</code> : This file is the one that we will give to thirth party services like **Github** or **Heroku**.
 
- Now that our `SSH key` was generated start up the `SSH Agent` and add this key so it knows that it exists:
   ```bash
   $ eval "$(ssh-agent -s)"    
   ```
   This is going to start up the `SSH program` and it is going to print the process id to confirm that is indeed running.
 
- Now tell the `SSH Agent` where this file lives:
   ```bash
   $ ssh-add ~/.ssh/id_rsa
   ```
   You should get a message saying "Identity added". This means that the local machine now knows about this public-private key pair and it will try to use these credentials when it communicates with a third party server like Github or Heroku. Now we are ready to configure Github!

- Go to <http://github.com> and create an account or sign in.

- Go to the SSH page under <code>SSH and GPG keys</code>. There you should add the public key letting Github know that we want to communicate using SSH.

- Give a name to the SSH key (I recomend giving a name that uniquely identifies your computer).

- Copy the contents of the `id rsa pub` file to the clipboard: 
   ```bash
   $ clip < ~/.ssh/id_rsa.pub
   ```
   That contains the information that Github needs to securely communicate our machine and Github machines.
    
- Test the SSH key by running the following:
   ```bash
   $ ssh -T git@github.com
   ```
   This will check if the SSH keys are propperly configured and if we are actually able to securely communicate with Github. A message will print that we can not stablish secure communication; type yes to continue.

- Type `yes` Continue connecting: 
   ```bash
   $ yes
   ```

- Create a new repository and add a `remote` to the repository: 
   ```bash
   $ git remote add origin https://github.com/BernardoMB/myNewRepository.git
   ```

# HEROKU

`Heroku` is a cloud platform that lets companies build, deliver, monitor and scale apps — we're the fastest way to go from idea to URL, bypassing all those infrastructure headaches.

- Create a **Heroku** account and login.
 
- Install `Heroku CLI` into your local machine. Visit the following URL and install the app: <http://toolbelt.heroku.com>
 
- Login into the Heroku account locally (this has to be done only the first time):
   ```bash
   $ heroku login
   ```
   This will tell our machine to which account it should deploy our apps.

- Enter credentials. With this now we are able to communicate our machine command line and the Heroku servers.

- Add the SSH key just created on Heroku. We can do this via the command line instead of heading to Heroku's website:
   ```bash
   $ heroku keys:add
   ```
   This is going to scan our SSH directory and add up our key. So much more easier than configure the SSH key no Github!
 
- We can view the keys added on Heroku by running the following command:
   ```bash
   $ heroku keys
   ```

- We can remove the key by runnning the following:
   ```bash
   $ heroku keys:remove bmondragonbrozon@gmail.com
   ```

- You can view the keys running the following:
   ```bash
   $ heroku keys
   ```
 
- Now we can test the connection like we did on Github:
   ```bash
   $ ssh -v git@heroku.com
   ```
   Now look for an output line that says `debug1: Authentication succeded (publickey)`.

- Heroku should grab the port from the enviroment variable so change port to be dynamic in the code:
   ```javascript
   const port = process.env.PORT || 3000;
   ```

- Modify `package.json` file to run the `start` custom script:
   ```javascript
   [...]

   "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1",
      "start": "node server.js"
   },
   
   [...]
   ```
   
   This es nessesary because when Heroku tries to start our app it is not going to run node with your file name because it does not know how our file name is called, intead it is going to run the `start` script and the `start` script is going to be responsible of doing the propper thing (in this case booting up the `server.js` file). You can run the `start` script from the terminal by running the following: 
   ```bash
   $ npm start
   ```

- Run the following inside the application:
   ```bash 
   $ heroku create
   ```
   The command is going to add a new app over on Heroku's web app and alse it is going to add a new remote on our git repository. Remember that we already have a origin remote which points to our Github repository but we are also going to have a Heroku remote which points to our **Heroku Git** repository. 
    
   When we deploy to our Heroku Git repository Heroku is going to see that and it is going to take the changes and deploy them into the web. When we run `$ heroku create` all of that happens. But we still need to push up our changes to that remote URL in order to actually do the deployig process and see the changes on the web.

- We can now push to that new remote (brand new remote that was just added because we ran `$ heroku create`): 
   ```bash
   $ git push heroku
   ```

- To open the browser in the page just deployed run the following:
   ```bash
   $ heroku open
   ```
