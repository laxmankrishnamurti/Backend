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
