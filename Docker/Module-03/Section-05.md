# Docker Networks

In short, Docker Networks are used to establish a connection between two or more containers so that they can communicate with each other and transfer information with the help of Docker Volumes.

One of the most powerful things about the Docker Containers is that they can easily connected to one other and even other software, this makes it easy to isolate and manage the containers.

Docker Containers are only communicate with the container which is connected with Internal network. There can be multiple internal networks and in each network there can be multiple Docker Containers are connected and the most important part is that they cannot interfare to other Network.

In case, we want to connect two or more networks within a single network then we can also do this. It means, now all inter-connected containers can communicate with the container which is not in their network.

#### Note :- If there is a container which does not need to communicate with other containers we can isolate it. Because if we do not do that then it can be a headeck. And the question is that why should we connect a container which does not need any type of external information. The idea behind establishing a connection between two or more containers is only that they can share data to each other and it is very important to make "Micro-services Architecture".

## Types of Networks

1. Bridge Network
2. Host Network
3. Overlay Network
4. Macvlan Network
5. None Network

### Bridge Network

By default, when we create a container it is automatically get connected with the others container if rest of the container is not connected with any type of network. What does it mean?

Let say there is an ubuntu image and we have created four containers. Can they communicate with each other keep in mind that while creating all the conatiners we do not explicitly define their network. Now the question is that do they communicate with each other?

The answer is -> YES.

Why?

By default, Docker uses Bridge Network so that's why when we create the containers they are internally connected with a Bridge Network. But we can customize our own Bridge Network it creates an isolation layer so that we can override the by default nature of the Bridge Network.

Let say we have established a Bridge Network among three containers. The rest container is no longer communicate with the inter-connected containers. Because we have broken the default isolation layer of the Bridge Network.

#### Lets create a Bridge Network among containers

```bash
# Create a Bridge Network
$ sudo docker network create --driver <driver_name or network_type> <network_name>

# List all Networks
$ sudo docker network ls

# Inspect a Network
$ sudo docker network inspect <bridge_name/Id>
```

```json
// Meta-data of a Bridge Network

[
  {
    "Name": "custom_bridge",
    "Id": "079fab135349130c1bce9c325b9c364505732ee054e69fd25d183ea38bfff578",
    "Created": "2024-08-20T14:21:26.279134433+05:30",
    "Scope": "local",
    "Driver": "bridge",
    "EnableIPv6": false,
    "IPAM": {
      "Driver": "default",
      "Options": {},
      "Config": [
        {
          "Subnet": "172.18.0.0/16",
          "Gateway": "172.18.0.1"
        }
      ]
    },
    "Internal": false,
    "Attachable": false,
    "Ingress": false,
    "ConfigFrom": {
      "Network": ""
    },
    "ConfigOnly": false,
    "Containers": {},
    "Options": {},
    "Labels": {}
  }
]
```

Now there is no any container is connected with the Bridge Network

```json
"Containers": {},
```

#### Step-by-step Process

#### Communication with the default Bridge Network

1. Create two containers
2. Enter inside a container
3. Update the Contianer and install <code>iputils-ping</code>

```bash
$ apt update && apt install iputils-ping -y
```

4. Exit from the First Container
5. Inspect the second container and get it's IPv4 address.

```bash
$ sudo docker container inspect <container_name>
```

```json
"NetworkSettings": {
            "Bridge": "",
            "SandboxID": "0921b9aaa5169db84c6cd94ed25f1a98235fe0f4b353066eaeb6ac0412e91174",
            "SandboxKey": "/var/run/docker/netns/0921b9aaa516",
            "Ports": {},
            "HairpinMode": false,
            "LinkLocalIPv6Address": "",
            "LinkLocalIPv6PrefixLen": 0,
            "SecondaryIPAddresses": null,
            "SecondaryIPv6Addresses": null,
            "EndpointID": "23dc69d6f8da444716bc9626828ad85b56010ab1747802916e68731494695a17",
            "Gateway": "172.17.0.1",
            "GlobalIPv6Address": "",
            "GlobalIPv6PrefixLen": 0,
            "IPAddress": "172.17.0.3",
            "IPPrefixLen": 16,
            "IPv6Gateway": "",
            "MacAddress": "02:42:ac:11:00:03",
            "Networks": {
                "bridge": {
                    "IPAMConfig": null,
                    "Links": null,
                    "Aliases": null,
                    "MacAddress": "02:42:ac:11:00:03",
                    "DriverOpts": null,
                    "NetworkID": "0f0a3bbbf7090c58266c7f8e7178dd7b545b16948ea7c3c38225db84fbde1158",
                    "EndpointID": "23dc69d6f8da444716bc9626828ad85b56010ab1747802916e68731494695a17",
                    "Gateway": "172.17.0.1",
                    "IPAddress": "172.17.0.3",
                    "IPPrefixLen": 16,
                    "IPv6Gateway": "",
                    "GlobalIPv6Address": "",
                    "GlobalIPv6PrefixLen": 0,
                    "DNSNames": null
                }
            }
}
```

```json
"IPAddress": "172.17.0.3"
```

6. Again enter in first container and ping that IPv4 address.

```bash
$ ping 172.17.0.3
```

```bash
root@27b460a1fe19:/# ping 172.17.0.3
PING 172.17.0.3 (172.17.0.3) 56(84) bytes of data.
64 bytes from 172.17.0.3: icmp_seq=1 ttl=64 time=0.139 ms
64 bytes from 172.17.0.3: icmp_seq=2 ttl=64 time=0.180 ms
64 bytes from 172.17.0.3: icmp_seq=3 ttl=64 time=0.180 ms
64 bytes from 172.17.0.3: icmp_seq=4 ttl=64 time=0.172 ms
64 bytes from 172.17.0.3: icmp_seq=5 ttl=64 time=0.149 ms
64 bytes from 172.17.0.3: icmp_seq=6 ttl=64 time=0.142 ms
64 bytes from 172.17.0.3: icmp_seq=7 ttl=64 time=0.178 ms
64 bytes from 172.17.0.3: icmp_seq=8 ttl=64 time=0.177 ms
64 bytes from 172.17.0.3: icmp_seq=9 ttl=64 time=0.176 ms
64 bytes from 172.17.0.3: icmp_seq=10 ttl=64 time=0.177 ms
64 bytes from 172.17.0.3: icmp_seq=11 ttl=64 time=0.174 ms
64 bytes from 172.17.0.3: icmp_seq=12 ttl=64 time=0.172 ms
64 bytes from 172.17.0.3: icmp_seq=13 ttl=64 time=0.177 ms
64 bytes from 172.17.0.3: icmp_seq=14 ttl=64 time=0.179 ms
64 bytes from 172.17.0.3: icmp_seq=15 ttl=64 time=0.175 ms
64 bytes from 172.17.0.3: icmp_seq=16 ttl=64 time=0.174 ms
64 bytes from 172.17.0.3: icmp_seq=17 ttl=64 time=0.177 ms
64 bytes from 172.17.0.3: icmp_seq=18 ttl=64 time=0.177 ms
64 bytes from 172.17.0.3: icmp_seq=19 ttl=64 time=0.179 ms
^C
--- 172.17.0.3 ping statistics ---
19 packets transmitted, 19 received, 0% packet loss, time 18419ms
rtt min/avg/max/mdev = 0.139/0.171/0.180/0.012 ms
```

It means both containers are connected to each other through default Bridge Network can communicate with each other.

```bash
$ sudo docker network inspect bridge
```

```json
[
  {
    "Name": "bridge",
    "Id": "0f0a3bbbf7090c58266c7f8e7178dd7b545b16948ea7c3c38225db84fbde1158",
    "Created": "2024-08-20T12:35:43.190845639+05:30",
    "Scope": "local",
    "Driver": "bridge",
    "EnableIPv6": false,
    "IPAM": {
      "Driver": "default",
      "Options": null,
      "Config": [
        {
          "Subnet": "172.17.0.0/16",
          "Gateway": "172.17.0.1"
        }
      ]
    },
    "Internal": false,
    "Attachable": false,
    "Ingress": false,
    "ConfigFrom": {
      "Network": ""
    },
    "ConfigOnly": false,
    "Containers": {
      "27b460a1fe197e0871e608873e7971ce4bdcf7417fef522867d6bed333d121df": {
        "Name": "container_one",
        "EndpointID": "0bfc895562d8be6a9b4cb8ded3c739733f426b54c2871b91a5aaf3fdde5674d2",
        "MacAddress": "02:42:ac:11:00:02",
        "IPv4Address": "172.17.0.2/16",
        "IPv6Address": ""
      },
      "5322de3e38b3a037c2dccfce2d3c05961c3584bd8f9b9e7d6d52d0a6dd9b7a4a": {
        "Name": "container_two",
        "EndpointID": "23dc69d6f8da444716bc9626828ad85b56010ab1747802916e68731494695a17",
        "MacAddress": "02:42:ac:11:00:03",
        "IPv4Address": "172.17.0.3/16",
        "IPv6Address": ""
      }
    },
    "Options": {
      "com.docker.network.bridge.default_bridge": "true",
      "com.docker.network.bridge.enable_icc": "true",
      "com.docker.network.bridge.enable_ip_masquerade": "true",
      "com.docker.network.bridge.host_binding_ipv4": "0.0.0.0",
      "com.docker.network.bridge.name": "docker0",
      "com.docker.network.driver.mtu": "1500"
    },
    "Labels": {}
  }
]
```

```json
"Containers": {
      "27b460a1fe197e0871e608873e7971ce4bdcf7417fef522867d6bed333d121df": {
        "Name": "container_one",
        "EndpointID": "0bfc895562d8be6a9b4cb8ded3c739733f426b54c2871b91a5aaf3fdde5674d2",
        "MacAddress": "02:42:ac:11:00:02",
        "IPv4Address": "172.17.0.2/16",
        "IPv6Address": ""
      },
      "5322de3e38b3a037c2dccfce2d3c05961c3584bd8f9b9e7d6d52d0a6dd9b7a4a": {
        "Name": "container_two",
        "EndpointID": "23dc69d6f8da444716bc9626828ad85b56010ab1747802916e68731494695a17",
        "MacAddress": "02:42:ac:11:00:03",
        "IPv4Address": "172.17.0.3/16",
        "IPv6Address": ""
      }
    },
```

#### Communication with a custom Bridge Network

7. Create a Network and two more containers and connect both containers with the Network.

```bash
$ sudo docker network create --driver <network_type> <network_name>
$ sudo docker run -it -d --network <network_name> --name <container_name> <image>
```

Creating two containers

```bash
$ sudo docker run -it -d --network custom_bridge --name container_three ubuntu
$ sudo docker run -it -d --network custom_bridge --name container_four ubuntu
```

Listing all networks

```bash
$ sudo docker network ls

# Output

NETWORK ID     NAME            DRIVER    SCOPE
0f0a3bbbf709   bridge          bridge    local
079fab135349   custom_bridge   bridge    local
f88cd34eb4c2   host            host      local
6efd6101780e   none            null      local

```

Inspecting default Bridge Network

```bash
$ sudo docker network inspect bridge
```

```json
[
  {
    "Name": "bridge",
    "Id": "0f0a3bbbf7090c58266c7f8e7178dd7b545b16948ea7c3c38225db84fbde1158",
    "Created": "2024-08-20T12:35:43.190845639+05:30",
    "Scope": "local",
    "Driver": "bridge",
    "EnableIPv6": false,
    "IPAM": {
      "Driver": "default",
      "Options": null,
      "Config": [
        {
          "Subnet": "172.17.0.0/16",
          "Gateway": "172.17.0.1"
        }
      ]
    },
    "Internal": false,
    "Attachable": false,
    "Ingress": false,
    "ConfigFrom": {
      "Network": ""
    },
    "ConfigOnly": false,
    "Containers": {
      "27b460a1fe197e0871e608873e7971ce4bdcf7417fef522867d6bed333d121df": {
        "Name": "container_one",
        "EndpointID": "0bfc895562d8be6a9b4cb8ded3c739733f426b54c2871b91a5aaf3fdde5674d2",
        "MacAddress": "02:42:ac:11:00:02",
        "IPv4Address": "172.17.0.2/16",
        "IPv6Address": ""
      },
      "5322de3e38b3a037c2dccfce2d3c05961c3584bd8f9b9e7d6d52d0a6dd9b7a4a": {
        "Name": "container_two",
        "EndpointID": "23dc69d6f8da444716bc9626828ad85b56010ab1747802916e68731494695a17",
        "MacAddress": "02:42:ac:11:00:03",
        "IPv4Address": "172.17.0.3/16",
        "IPv6Address": ""
      }
    },
    "Options": {
      "com.docker.network.bridge.default_bridge": "true",
      "com.docker.network.bridge.enable_icc": "true",
      "com.docker.network.bridge.enable_ip_masquerade": "true",
      "com.docker.network.bridge.host_binding_ipv4": "0.0.0.0",
      "com.docker.network.bridge.name": "docker0",
      "com.docker.network.driver.mtu": "1500"
    },
    "Labels": {}
  }
]
```

There is only two containers in which no network is explicitly defined so that's why both of them are in default Bridge Network.

Inspecting Custom Bridge

```bash
$ sudo docker network inspect curtom_bridge
```

```json
[
  {
    "Name": "custom_bridge",
    "Id": "079fab135349130c1bce9c325b9c364505732ee054e69fd25d183ea38bfff578",
    "Created": "2024-08-20T14:21:26.279134433+05:30",
    "Scope": "local",
    "Driver": "bridge",
    "EnableIPv6": false,
    "IPAM": {
      "Driver": "default",
      "Options": {},
      "Config": [
        {
          "Subnet": "172.18.0.0/16",
          "Gateway": "172.18.0.1"
        }
      ]
    },
    "Internal": false,
    "Attachable": false,
    "Ingress": false,
    "ConfigFrom": {
      "Network": ""
    },
    "ConfigOnly": false,
    "Containers": {
      "aad7ea3f5adadcea356650001d927a363dfa84f2948cc59d15db0d630b40ee32": {
        "Name": "container_four",
        "EndpointID": "922e7bf04a0c18548476e7e82d2212a51627dbddab2a109c11a01fc1c69648cb",
        "MacAddress": "02:42:ac:12:00:03",
        "IPv4Address": "172.18.0.3/16",
        "IPv6Address": ""
      },
      "ae05d530376e0af0e0e26023e901302351b4a3a90fe1297d20ae6cacafb2b881": {
        "Name": "container_three",
        "EndpointID": "0c227a361310b94d1ef47eb06e28f538999c8a9fa52b4907732e37025edd2aaf",
        "MacAddress": "02:42:ac:12:00:02",
        "IPv4Address": "172.18.0.2/16",
        "IPv6Address": ""
      }
    },
    "Options": {},
    "Labels": {}
  }
]
```

There are two containers that is connected with the Custom Bridge Network that is not a part of Default Bridge Network because as we disscuss earlier that custom Bridge Network adds an extra layer of isolation so that other containers can not communicate with the Inter-connected containers.

8. First get the IPv4 address of either container_three or container_four and try to ping with other containers.

```bash
# Establishing a connection between container_three to container_four

root@ae05d530376e:/# ping 172.18.0.3
PING 172.18.0.3 (172.18.0.3) 56(84) bytes of data.
64 bytes from 172.18.0.3: icmp_seq=1 ttl=64 time=0.144 ms
64 bytes from 172.18.0.3: icmp_seq=2 ttl=64 time=0.161 ms
64 bytes from 172.18.0.3: icmp_seq=3 ttl=64 time=0.166 ms
64 bytes from 172.18.0.3: icmp_seq=4 ttl=64 time=0.179 ms
64 bytes from 172.18.0.3: icmp_seq=5 ttl=64 time=0.160 ms
64 bytes from 172.18.0.3: icmp_seq=6 ttl=64 time=0.113 ms
64 bytes from 172.18.0.3: icmp_seq=7 ttl=64 time=0.180 ms
64 bytes from 172.18.0.3: icmp_seq=8 ttl=64 time=0.179 ms
64 bytes from 172.18.0.3: icmp_seq=9 ttl=64 time=0.181 ms
64 bytes from 172.18.0.3: icmp_seq=10 ttl=64 time=0.187 ms
64 bytes from 172.18.0.3: icmp_seq=11 ttl=64 time=0.180 ms
64 bytes from 172.18.0.3: icmp_seq=12 ttl=64 time=0.182 ms
64 bytes from 172.18.0.3: icmp_seq=13 ttl=64 time=0.179 ms
64 bytes from 172.18.0.3: icmp_seq=14 ttl=64 time=0.182 ms
64 bytes from 172.18.0.3: icmp_seq=15 ttl=64 time=0.171 ms
64 bytes from 172.18.0.3: icmp_seq=16 ttl=64 time=0.182 ms
64 bytes from 172.18.0.3: icmp_seq=17 ttl=64 time=0.183 ms
^C
--- 172.18.0.3 ping statistics ---
17 packets transmitted, 17 received, 0% packet loss, time 16373ms
rtt min/avg/max/mdev = 0.113/0.171/0.187/0.018 ms

```

9. Also Check does the by default network's container can establish a connection between the container that is connected with the custon bridge network?

```bash
# Establishing a connection between container_one(Connected with default Bridge) to container_four(Connected with a Custom Bridge Network)

root@27b460a1fe19:/# ping 172.18.0.3
PING 172.18.0.3 (172.18.0.3) 56(84) bytes of data.
^C
--- 172.18.0.3 ping statistics ---
11 packets transmitted, 0 received, 100% packet loss, time 10229ms

```

#### Note :- 100% packet loss, indicates that the connection between container_one to container_four is terminated.

10. This is how we can connect multiple containers with a Custom Bridge Network.

### Host Network

In short, Those containers which are connected with the Host network does not have its own specific IP address. Container is totally dependent upon Host system. Host system provides an IP address to the container so that we can access the container with the IP address.

One of the most important thing that we have to understand is that without an IP address we cannot establish a connection between any containers. We must require an IP address to communicate with a container within a network.

#### Lets establish a Host Network Connection

#### Step-by-step Process

1. Create a container with the network flag.

```bash
$ sudo docker run -it -d --network host --name <container_name> <image>

# Example

$ sudo docker run -it -d --network host --name container_six nginx:latest
```

2. Now, the container_six is connected with the host network. To verify this we can use <code>curl</code> command or either we can visit localhost on any browser.

```bash
$ curl localhost
```

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Welcome to nginx!</title>
    <style>
      html {
        color-scheme: light dark;
      }
      body {
        width: 35em;
        margin: 0 auto;
        font-family: Tahoma, Verdana, Arial, sans-serif;
      }
    </style>
  </head>
  <body>
    <h1>Welcome to nginx!</h1>
    <p>
      If you see this page, the nginx web server is successfully installed and
      working. Further configuration is required.
    </p>

    <p>
      For online documentation and support please refer to
      <a href="http://nginx.org/">nginx.org</a>.<br />
      Commercial support is available at
      <a href="http://nginx.com/">nginx.com</a>.
    </p>

    <p><em>Thank you for using nginx.</em></p>
  </body>
</html>
```
