# Mark "Down" to a server

```bash
upstream backend {
    server localhost:3000 weight=3;
    server localhost:3001 down;
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

<code>Down -> 502 Gateway -> It means request is reaching to the nginx but the backend server is down or temporary unavailable. So, that's why nginx is sending 502 status code. </code>

## Status code details

100-199 -> Informational
200-299 -> Success
300-399 -> Redirection
400-499 -> Client Error
500-599 -> Internal server error
