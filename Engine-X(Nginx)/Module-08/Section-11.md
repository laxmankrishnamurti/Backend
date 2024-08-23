# TLS Configuration OR SSL Certification

There are multile ways to get a SSL certificate.

- Paid -> Production level project
  - DigiCert
  - GlobalSign
  - Sectigo (formerly comodo CA)
  - Symantec (now owned by DigiCert)
  - Entrust
- Free -> Hobby Project
  - Let's Encrypt
  - Cloudflare
  - ZeroSSL
  - Buypass
  - SSL for free (now partnered with ZeroSSL)

## Step-by-step Process

- [Visit the site](https://certbot.eff.org)
- Select server and Operating system and then install snapd.

```bash
$ sudo apt update
$ sudo apt install snap
```

- Ensure that version of snapd is up to date

```bash
$ sudo snap install core
$ sudo snap refresh core
```

- If we have any Certbot package is installed using an OS package manager like <code>apt, dnf or yum</code>, we should remove them before installing the Certbot snap to ensure that when we run the command <code>certbot</code> the snap is used rather than the installation from our OS package manager.

```bash
$ sudo apt-get remove certbot
```

- Install Certbot (TLS manager)

```bash
$ sudo snap install --classic certbot
```

- Prepare the certbot command

```bash
$ sudo ln -s /snap/bin/certbot /usr/bin/certbot
```

- Install the certificate

```bash
$ sudo certbot --nginx
```

Follow the instruction and get it done.

- Open the configuration file and verify the certificate. TLS Provider provides two files are :-

  - chain.pem file
  - privatekey.pem file

- Verify the file location to be 100% sure.
- Restart the nginx

```bash
$ sudo systemctl restart nginx
```

### If we are using WebSocket in our application with nginx as a reverse proxy we need to do some extra configuration to upgrade client request.

[Follow the page](https://nginx.com/blog/websocket-nginx/)
<br>
[For more details about Nginx follow the official documentation](https://nginx.org)

# The End
