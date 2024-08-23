# Nginx Authentication

Let say there is a website which is in it's BETA Version and we do not want to expose it to a normal user except the developers that are working on the project.

In such type of scenario we can use Nginx Authentication service that helps to resolve the issue.

## Step-by-step Process

- Create a config file for the site
- Set-up to serve static or dynamic files.
  - Help
    ```bash
        $ sudo nginx -T
    ```
- Open the configuration file and add the directive which is given below.

  ```bash
    auth_basic "custom_name";

    # The file that will store the username and password.
    auth_basic_user_file /etc/nginx/.htpasswd;
  ```

- Generate the <code>.htpasswd</code>

```bash

$ sudo sh -c "echo -n <'username:'> >> /etc/nginx/.htpasswd"

```

There are multiple ways to generate the file. We can generate it by using "Open SSL Package" which is inbuilt in the Linux Operating system. Otherwise we can generate it using the "Apache2-utils" tool. Lets go with "Open SSL Package".

    - Generate username
    ```bash
        $ sudo sh -c "echo -n 'username:' >> /etc/nginx/.htpasswd"
    ```

    - Generate Password
    ```bash
        $ sudo sh  -c "openssl passwd -apr1 >> /etc/nginx/.htpasswd"
    ```
        - Enter the password
        - Confirm password

    - Cat the file and see what content is available in that hidden file.

- Verify all changes
- Reload Nginx.
- Refresh the site.

## Protect the route that is in beta version

- Create multiple location block in the server block.
- Turn off auth_basic directive on the router we want to expose.

```bash
location / {
    auth_basic off;
    try_files $uri $uri/=404;
}

location /admin {
    try_files $uri $uri/=404;
}
```
