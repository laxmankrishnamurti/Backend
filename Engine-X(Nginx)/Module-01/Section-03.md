# Nginx Architecture

We can create multiple instance of nginx server and each server have multiple block these blocks are called "context". Every block may have seperate configuration settings. A server can contain these following blocks.

<code>Entry File :- nginx.conf</code>

- Main Block(Context)

  - Number of worker processors
  - username
  - Process id
  - Log location

  - Child Context

    - Event Block

      - Number of connection per worker process

    - Stream Block

      - TCP/UDP (level-3/4) settings

    - Http Block -> Handle Requests

      - Server Block -> Virtual server OR Host Server

        - Location Block -> Router or URI

        - Upstream Block -> When Nginx is used as a Reverse Proxy
          - Load Balancing

      -----------------n

<code>For more details follow Documentation guide.</code>

```bash
# Nginx process initialization
user www-data;

# worker_processes = Number of CORES
worker_processes auto;

# Process details
pid /run/nginx.pid;

# Including nginx modules
include /etc/nginx/modules-enabled/*.conf;

#event block
events {
        worker_connections 768;
        # multi_accept on;
}

# http block
http {

        ##
        # Basic Settings
        ##

        sendfile on;
        tcp_nopush on;
        types_hash_max_size 2048;
        # server_tokens off;

        # server_names_hash_bucket_size 64;
        # server_name_in_redirect off;

        include /etc/nginx/mime.types;
        default_type application/octet-stream;

        ##
        # SSL Settings
        ##

        ssl_protocols TLSv1 TLSv1.1 TLSv1.2 TLSv1.3; # Dropping SSLv3, ref: POODLE
        ssl_prefer_server_ciphers on;

        ##
        # Logging Settings
        ##

        access_log /var/log/nginx/access.log;
        error_log /var/log/nginx/error.log;

        ##
        # Gzip Settings
        ##

        gzip on;

        # gzip_vary on;
        # gzip_proxied any;
        # gzip_comp_level 6;
        # gzip_buffers 16 8k;
        # gzip_http_version 1.1;
        # gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

        ##
        # Virtual Host Configs
        ##

        include /etc/nginx/conf.d/*.conf;
        include /etc/nginx/sites-enabled/*;
}

#mail {
#       # See sample authentication script at:
#       # http://wiki.nginx.org/ImapAuthenticateWithApachePhpScript
#
#       # auth_http localhost/auth.php;
#       # pop3_capabilities "TOP" "USER";
#       # imap_capabilities "IMAP4rev1" "UIDPLUS";
#
#       server {
#               listen     localhost:110;
#               protocol   pop3;
#               proxy      on;
#       }
#
#       server {
#               listen     localhost:143;
#               protocol   imap;
#               proxy      on;
#       }
#}

```

Make your own customized server block and keep this into "conf.d" directory. In Linux Operating system nginx crated two more extra directory named "sites available" and "sites enabled" but the nginx official recommendation is to store all customized server block into the "conf.d" directory.

## Code Flow

<code>nginx.conf -> Request modification at this point. </code>

```bash
include /etc/nginx/conf.d/*.conf;
include /etc/nginx/sites-enabled/*;
```

<code>conf.d -> We can create our own customized server blocks</code>
<code>sites-enabled -> There is a server-blog that process the request and send response to the client based on the request.</code>

- Settings
  - PORT number
  - Files
  - Router settings
  - Many more

In the server block it includes <b>root /var/www/html</b>

<code>/var/www/html -> It contains <b>index.nginx-debian.html</b> file. This is the Welcome page of nginx server that we have seen on the localhost.</code>

## Lets start to build our own server-block.
