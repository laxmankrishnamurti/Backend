# Introduction to Nginx

An Open-source web server.

## One-man Army

- Web-Server
- Gateway
- Reverse Proxy
- Proxy
- Caching
- Rate Limiting
- Host Static sites
- Host Multiple sites
- TLS(SSL) Certification
- Load Balancer
- Fast, Scalable & Extendable
- Easly customizable with Containers

## Installation

1. Update the system repository

```bash
$ sudo apt-get update
```

2. Install Nginx

```bash
$ sudo apt install nginx -y
```

3. Verify

```bash
$ nginx -v
```

4. Common commands

```bash
# Check Status
$ sudo systemctl status nginx

# Start Nginx
$ sudo systemctl start nginx

# Stop Nginx
$ sudo systemctl stop nginx
```

5. Visit localhost if status is in Running state.