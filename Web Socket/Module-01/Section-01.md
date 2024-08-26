# Introduction to WebSocket.

WebScoket provides a way for a web browser and the server to communicate with each other continuously without having to close the connection after each exchange. This makes it idea for real-time application like live chat for gaming where we need quick back and fork communication.

To be more precise WebScoket provides a way to make a persistent connection between client and server. In this communication system server dosen't wait for the client to push back a request to the server. Once a WebSocket connection get established both of them dosen't wait for each other anyone can send data to each other.

## How HTTP connection works?

Client -> Send a request to the server -> REST API -> Proxy(Optional) -> Firewall(Optional) -> Middleware -> Server
Server -> Firewall(Bypass - Optional) -> Proxy(Optional) -> REST API -> Response -> Client

Once client get any type of response from the server the connection get closed this is known as HTTP connection. This is a One-Way connection and stateless(Send Headers, Cookies, Tokens....etc).

## How WebSocket connection works?

Client -> Send a request to Handshake with the server(Initial request -> Connection upgradation request) -> Server (Success) :: Permanent Connection(If the connection is not terminated)

Now, Client and the server can send data to each other at any time.

#### Use-case -> To get Real-time data.

## Installation

```bash
$ npm install socket.io
```
