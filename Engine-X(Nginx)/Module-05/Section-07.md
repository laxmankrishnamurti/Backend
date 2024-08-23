# Nginx as a Load Balancer

Nginx uses Round-Robin algorithm to distribute load on servers.

- Create a server
- Make a configuration file for the server

```bash
upstream backend {
    server localhost:3000;
    server localhost:3001;
}

server {
    listen 80;

    server_name _ or domain or localhost;

    location / {
        add_header Cache-Control no-store;
        proxy_pass http://backend;
    }
}
```

- Run the server by assigning different port to the server.

```bash
PORT=3000 npm run start
```

- Open a new command window and agian do the exact process as we done previously.

```bash
PORT=3001 npm run start
```

<code>Number of servers should not be greater than number of cores.</code>

## Distribute load in variable format

```bash
upstream backend {
    server localhost:3000 weight=3;
    server localhost:3001;
}

server {
    listen 80;

    server_name _ or domain or localhost;

    location / {
        add_header Cache-Control no-store;
        proxy_pass http://backend;
    }
}
```

Now, the server that is running on the port number 3000 is going to handle 3 request after that nginx trasfer the 4th request on the server that is running on the port number 3001.

This is helpful in those situations when the system configuration of the servers are different.

More Resources = Handle more requests
