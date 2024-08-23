# Nginx as Reverse Proxy

To be more precise, Proxy is just like a middle man that does some task. If we talk about the Nginx it does many task for us. Like

- Acts like a firewall.
- Hiding Server PORT.
- SSL certification(TLS Configuration).
- Block any particular route.
- Apply authentication on a specific route.
- Modify request
- Load Balancing
  ---------------n.

<code>Request between client and nginx is secured but the connection between nginx and the server is un-secure, the process is called TLS Termination. But we can secure it by using MTLS.</code>

## Lets use nginx as a reverse proxy

- Create a server
