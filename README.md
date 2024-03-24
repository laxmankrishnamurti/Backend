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

## Download Node.js

```shell
sudo apt install Node.js
sudo apt install npm (Optional)
```

## Initialize a Package manager file

```shell
npm init
```

Complete all process and initialize the entry file "index.js"(bydefault)

```shell
touch index.js
```

And after that change the script file from package.json, that we created earlier. It helps to start the server. And also change file importing and exporting type from normal to "module"

```json

"type": "module",

"scripts": {
    "dev": "node index.js"
}
```

# What is Express?

To be more precise, Express is used for listen queries on a specific port number(while working locally) and give response based on the query. It makes it easier to organize our application functionality with middlewares and routing.

## Install Express.js

```
npm install express
```

# "Hello world!!!" in Express.

```javascript
import express from "express";

const app = express(); //creating an app using express
const PORT = 4000; //Define any specific port number

app.get("/", (req, res) => {
  res.send(`Server is running on http://localhost:${PORT}`);
});

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost${PORT}`);
});
```

After that we need to start our server by using the command

```shell
npm run dev
```

Click on the link by following (CTRL)

## CONGRATULATIONS!!! You made a server. Yes, the above code is a server that is listening on http://locahost:4000 (On your local system)

I hope you got the point. Server is nothing but just a software that serve something. It can be any specific resources, like:- json-data, Image, PDF, Audio, Video......etc

Let me explain some more details about the server.

Here,

```shell
get   :: the request type
"/"   :: is called Home Route
req, res :: Parameters (request, response)
     request : We collect data from the user
     response : Our Server response
```

Let's tye to create another route

```javascript
app.get("/api/login", (req, res) => {
  res.send(<h1>Please Login First</h1>);
});
```

if you go on this route then we get the text that is written in Heading-1 tag.

http://localhost:4000/api/login

This is just for learning purpose so that's why all are in unstructured way. Let's try to clean our code-base.

# What are Enviroment Variables?

As per their name it is already simplified that our server depends upon something. Like if we talk about the PORT number that we defined earlier, if our server has not access of the PORT number then we cannot start our server. Because server runs on a Specific PORT number(if we are working locally) or a specific IP address(if our server is already deployed).

To be more precise Enviroment variables are like Dependencies that helps to run our server. Without enviroment varibales our server is not going to run. So if it's has that much importance then we should keep our all enviroment varibales in a structure file. So that's why we need to install "dotenv". It helps to organize our all enviroment variables in a file.

Let's go to install "dotenv-package"

```shell
npm i dotenv
```

After that create a new file with '.env' extension. This is the extension name of enviroment variable's file. And then put all enviroment variables in that file.

Ex:- PORT_NUMBER, DATABASE_URL .......etc

### Import & It's Configuration

```javascript
import dotenv from "dotenv"; //In the entry file (index.js)

dotenv.config({
  path: "./env",
});
```

After it's configuration we must have to change in package.json script file so that when we start our server then all enviroment variable's are loaded and available for all.

```json
"scripts": {
    "dev": "node dotenv/config index.js"
}
```

### !Important

We should keep all sensitive information hidden. Like we don't want to show our server IP addrss, Database_url and all these type of information to the world. So we need to create one more file which is ".gitignore". If we want to ignore any file's to upload on github then we can simply write down the file name in there.

Ex:- node_modules, .env ........etc

# Let's try to get an experience of How a fullstack project looks like

Step-1 :: Create a simple UI(Frontend) {Simply a div} and try to fetch the localhost URL

But, before fetching the URL we need to install "axios" package.

- axios

Specially designed for fetching web requests. Is is a client-side tool for interacting with API's, but it is not an API itself. It's a library that allows our application to communicate with server-side API's, which are the endpoints that process requests and return responses.

- API

API stands for "Application Program Interface". It is a set of rules and protocols that enable different software applications to communicate with each other. API's define the methods and data formats that application can use to request and exchange information.

```shell
npm i axios
```

```javascript
import axios from "axios";

useEffect(() => {
  axios
    .get("http://localhost:3000/jokes")
    .then((response) => {
      setJokes(response.data); //Data-parsing is handle by axios.
    })
    .catch((error) => {
      console.error(error);
    });
});
```

Step-2 :: Create a server, as we done earlier
Step-3 :: Create a route with any specific name which simply return some Array's object.

```javascript
app.get("/api/jokes", (req, res) => {
  const jokes = [
    {
      id: "1",
      title: "First joke",
      description: "This is the first and funny joke",
    },
    {
      id: "2",
      title: "Second joke",
      description: "This is the second joke",
    },
    {
      id: "3",
      title: "Third joke",
      description: "This is the third joke",
    },
  ];

  res.send(jokes);
});
```

Now, the question is that how our frontend fetch all these data which is already on http://localhost:4000/api/jokes route.

Is we can directly fetch the URL?

- NO

If we try to do that we get an Error, this will something looks like :-

```error
'http://localhost:4000/api/jokes' from origin '.........' has been blocked by CORS Policy
```

# Why the error comes? And what is CORS Policy?

CORS stands for "Cross Origin Resources Sharing". The policy prevent the request which is not from same Origin. Because, our Frontend application runs on Different PORT or IP address and Our Backend runs on different PORT or IP address. So, that's why our backend server prevent to do that and ofcourse Browser also helps in to prevent from CORS Request.

NOTE :: Localhost Origin & Deployment Origin may be different.

### Solution

- Whitelist the IP address
- Use Proxy for now

# What is Proxy? And how we can Configure it?

A Proxy is a server that acts as an Intermediary between a Client and another Server, facilitating requests, enhancing privacy, security, and network Performance.

### CONFIGURATION

We have to create a new script for server in "vite.config.js" which is available in Frontend Application.

```json
server: {
    proxy: {
      '/api': 'http://localhost:3000'
    }
  },
```

DONE.

# What BACKEND exactly is?

Backend is all about performing logic on the data we have.

- What to Sore
- How to Store
- How to Process
- How to give Response
