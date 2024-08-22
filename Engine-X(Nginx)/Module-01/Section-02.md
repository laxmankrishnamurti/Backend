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
- mail block
