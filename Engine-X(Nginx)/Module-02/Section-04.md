# Play with Nginx

First of all comment the line in nginx.conf file because we are going to create our own server that is going to store into "conf.d" directory.

```bash
include /etc/nginx/sites-enabled/*
```

<code>Remember :- Whenever we make some changes in the nginx configuration file we must reload the nginx so that nginx can pick the new modified files/configuration.</code>

Now, we have two options either we can "restart" the nginx or we can "reload" it. But the problem is when we restart the nginx it gonna stop first and then it will start again which can take some time and between those time gap we face downtime it means the request that client has send to the server is not going to resolve.

The another option which "reload" the nginx sutes best in this scenario because it dosen't stop the nginx and hence, we not face any downtime for our application.

<code>But, before reloading the nginx we must validate the configuration that we changed. It will chech any kind of syntax error.</code>

```bash
# Verify configuration
$ sudo nginx -t

# Output
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful
```

```bash
# Reload
$ sudo systemctl reload nginx

# Now, change the directory
$ cd conf.d
```

To make things in an orgaized manner we should create a seperate directory for a particular Domain. yes, we can create multiple server blocks in the "conf.d" directory if we hosted multiple websites on a single server. Generally, we don't do such kind of thing.

Now, create a file with by using the name format :-

```bash
$ sudo nano website_domain_name.conf
```

It should be a server block or upstream block because it is included into the main http block. The server block that we are going to create is also called as a Virtual server/host.

```bash
server {
    listen 80 default_server;
    root /var/www/climatechange;

    server_name single OR multiple domain_name/IP Address/_(default)

    # directive (serve file)
    index index.html index.htm custom_file_name

    # Router configuration
    # Read the Documentation -> How nginx process a request
    location login or singup or any_custom_route or any_regex or / {
        try_files $uri $url/ =404;
    }

}

# Save it.
# Verify changes
# Reload nginx
```

https://domain.com/products

- products -> uri :: Nginx will check is such kind of directory is present or not in the /var/www/html location and if exist then it will get the index page and send it as a response.

If not, it will show 404 error or 404 file.

- Now, lets go to the location that we have specified into the server block

```bash
$ cd /var/www/climatechange

# Create a index file to serve it.
# To serve different page on different route we must create directory(name should be same as route) for that specific route.
```

<code>Create multiple virtual server for different websites but keep in mind that there could be only one default server in nginx configuration. Otherwise, it can create conflicts.</code>
