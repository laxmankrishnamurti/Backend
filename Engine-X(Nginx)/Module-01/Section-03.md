# Nginx Architecture

We can create multiple instance of nginx server and each server have multiple block these blocks are called context. Every block may have seperate configuration settings. A server can contain these following blocks.

- Main Block

  - Number of worker processors
  - username
  - Process id
  - Log location

    - Event Block

      - Number of connection per worker process

    - Stream Block

      - TCP/UDP (level-3/4) settings

    - Http Block -> Handle Requests
      - Server Block -> Virtual server OR Host Server
        - Location Block -> Router or URI
      - Upstream Block -> When Nginx is used as a Reverse Proxy
        - Load Balancing
