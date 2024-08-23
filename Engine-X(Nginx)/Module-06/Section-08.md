# Server Backup

Use backup server when main server is down.

```bash
upstream backend {
    server localhost:3000 weight=3;
    server localhost:3001 backup;
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

That's it.
