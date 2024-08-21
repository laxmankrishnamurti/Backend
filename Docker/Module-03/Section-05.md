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

### Overlay Network

Overlay Network is used to establish a connection between multiple containers which are on different-different nodes/servers.

In such type of scenario we use Docker Swarm.

#### Establish a connection between mulltiple nodes

#### Step-by-step Porcess

1. <code>Initialize Docker Swarm</code>

```bash
$ sudo docker swarm init
```

I get the Error :- <code>docker swarm init
Error response from daemon: could not choose an IP address to advertise since this system has multiple addresses on interface wlp0s12f0 (2409:408a:ece:3f78:386d:6a7:576d:663 and 2409:408a:ece:3f78:851e:b4f5:374c:10aa) - specify one with --advertise-addr</code>

Docker Swarm requires a specific IP address to advertise the Swarm manager node to other nodes in the cluster. When a system has multiple IP addresses, Docker can't automatically choose the correct one, so we need to specify it manually using the <code> --advertise-addr</code> option.

#### Debugging

- Step 1: Identify the Correct IP Address

```bash
$ ip addr show
$ nmcli device show
```

- Step 2: Initialize Docker Swarm with the Specified IP Address

```bash
$ sudo docker swarm init --advertise-addr <IP_ADDRESS>

# Example
$ sudo docker swarm init --advertise-addr 192.168.174.143

# Leave Docker Swarm
$ sudo docker swarm leave
$ sudo docker swarm leave --force
```

- Step 3: Verify Swarm Initialization

```bash
$ sudo docker info

# Look for the section labeled Swarm: active.
```

```bash
Client: Docker Engine - Community
 Version:    27.1.2
 Context:    default
 Debug Mode: false
 Plugins:
  buildx: Docker Buildx (Docker Inc.)
    Version:  v0.16.2
    Path:     /usr/libexec/docker/cli-plugins/docker-buildx
  compose: Docker Compose (Docker Inc.)
    Version:  v2.29.1
    Path:     /usr/libexec/docker/cli-plugins/docker-compose

Server:
 Containers: 5
  Running: 0
  Paused: 0
  Stopped: 5
 Images: 2
 Server Version: 27.1.2
 Storage Driver: overlay2
  Backing Filesystem: extfs
  Supports d_type: true
  Using metacopy: false
  Native Overlay Diff: true
  userxattr: false
 Logging Driver: json-file
 Cgroup Driver: systemd
 Cgroup Version: 2
 Plugins:
  Volume: local
  Network: bridge host ipvlan macvlan null overlay
  Log: awslogs fluentd gcplogs gelf journald json-file local splunk syslog
 Swarm: active
  NodeID: manipulated_id:57b34sdflym7gdoadsrymlcaomlsggnmf
  Is Manager: true
  ClusterID: manipulated_id:ts6x975zj3sasdfwv7glyx2zrgk1zjn
  Managers: 1
  Nodes: 1
  Data Path Port: manipulated_port:4089
  Orchestration:
   Task History Retention Limit: 5
  Raft:
   Snapshot Interval: 10000
   Number of Old Snapshots to Retain: 0
   Heartbeat Tick: 1
   Election Tick: 10
  Dispatcher:
   Heartbeat Period: 5 seconds
  CA Configuration:
   Expiry Duration: 3 months
   Force Rotate: 0
  Autolock Managers: false
  Root Rotation In Progress: false
  Node Address: manipulated_IP_address:192.168.140.201.174.183.125
  Manager Addresses:
   manipulated_IP_address:192.168.140.201.174.183.125
 Runtimes: io.containerd.runc.v2 runc
 Default Runtime: runc
 Init Binary: docker-init
 containerd version: manipulated:8fsadfsdf57c6bcff51318944179630522a095cc9dbf9f353
 runc version: v1.1.13-0-g58asdfaa920
 init version: de40ad0
 Security Options:
  apparmor
  seccomp
   Profile: builtin
  cgroupns
 Kernel Version: 6.5.0-41-generic
 Operating System: Ubuntu 22.04.4 LTS
 OSType: linux
 Architecture: x86_64
 CPUs: 2
 Total Memory: 3.378GiB
 Debug Mode: false
 Experimental: false
 Insecure Registries:
  127.0.0.0/8
 Live Restore Enabled: false

```

```bash
# Line-number 609
Swarm: active
```

#### Issue Resolved.

```bash
# Docker Daemon Response

Swarm initialized: current node (b34lym7gdorymlcaomlsggnmf) is now a manager.

To add a worker to this swarm, run the following command:

    docker swarm join --token SWMTKN-1-manipulated-token-3djzhc6ivpk9slk55sd5p7wu2t8b0ijg9x9xm9olhlxe6xpfi6jb9nem6t-31t5tf7cny62nhph4t87gbni7 192.168.174.183:2377

To add a manager to this swarm, run 'docker swarm join-token manager' and follow the instructions.
```

2. <code>Connect the other node using the joining token</code>

We can simple connect two computers using the token because we have to think for a while what a node exactly is?

Nothing but a mini-computer.

On both system Docker should be installed.
