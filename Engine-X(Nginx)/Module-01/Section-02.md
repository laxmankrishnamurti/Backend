# How does the browser render the nginx-default page?

In linux there a directory named "etc" in which our external application that we have installed on our system are stored. So, if like that lets enter in the directory and see is there is any kind of nginx directory is present or not.

```bash
$ cd /etc
$ ls
$ cd nginx
$ ls
```

There are lots of files and folders. Keep in mind that every single application has it's own configuration file that help us to understand the basic architecture of that particular application.

Lets open the nginx configuration named <code>nginx.conf</code>

```bash
$ sudo nano nginx.conf
```

There are multiple code block section. It includes :-

- user
- worker processes
- pid
- include files
- events block
- http block
  - Basic settings
  - SSL settings
  - Logging settings
  - Gzip settings
  - Virtual Host Configs
- mail block

As for now we need to just focus on the http-block. At the end of the http block these is a section named <code>Virtual Host Configs.</code>

```bash
include /etc/nginx/conf.d/*.conf;
include /etc/nginx/sites-enabled/*;
```

As for now just leave the first one. Lets focus on the second-include line. The http block is including all the files or folder which is in the site-enabled directory. So, lets deep dive into the location.

```bash
$ cd /etc/nginx/sites-enabled
$ ls

# There is a file named default, Open it.
$ nano default
```

# A journery of an Application

- Web Design -> Web designer -> Design Ready
- Design -> Developer

  - Application

    - Frontend
    - Database
    - Backend

      -

- DevOps Engineer.
  - Docker
  - Kubernets
  - Nginx
  - Cloud service (AWS(Amazon), GCP(Google service cloud), Azur(Microsoft), Digital Ocean, Railway, Heroku....etc)
