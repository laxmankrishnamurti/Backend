# What is Backend?

Backend is the data and Infrastructure that make our application work.

# Prerequisits for Backend?

There are mainly two pre-requisits for learning backend. These are :-

- A Programming Language (Java, JavaScript, PHP, c++, .......etc)
- A Database (SQL OR NOSQL)

Note :- Backend is not like Frontend where we can see the output again-&-again. Backend is more about logic and it is quite releted to Networking. Yes, Backend requires a basic knowledge of Computer Networking.

In this Backend Series,

- Programming Language :: JavaScript
- Database :: MongoDB (NoSQL)

# Basic overview about File Structure

These are Directories

- src
- db
- models
- controllers
- routes
- middlewares
- utils
- External files & packages (like:- node_modules, package.json, .env, README, git, prettier...etc)

# Download Node.js

<pre>
    sudo apt install Node.js
    sudo apt install npm (Optional)
</pre>

# Initialize a Package manager file

<pre>
    npm init
</pre>

Complete all process and initialize the entry file, which is "index.js"(bydefault)

<pre>
    touch index.js
</pre>

And after that change the script file from package.json, that we created earlier

<pre>
    "scripts": {
        "dev": "node index.js"
     }
</pre>
