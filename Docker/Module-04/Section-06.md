# Docker Compose

Docker Compose is a service within Docker that helps to up/down miltiple containers at the same time.

#### Why we need it?

Let say there are 20 containers in different-different services and at the end of the day we want to check them all whether all containers are functioning properly or not? Should we start every container one-by-one?

It takes lot of time to up/down a particular contianer and become a headeck. This is why Docker Compose is used in the Docker world.

And the best part is that we can up/down our entire application with a single command.

#### Thinking in Docker

- Application

  - Frontend
  - Backend
  - Database

    - Frontend

      - Header
      - Main
      - Footer

        - Main
          - Product Listing page container
          - Product review page contianer
          - Payment page container
          - ............n

    - Backend

      - Services

        - Authentication
        - Authorization
        - Product Listing (Algorithm)
        - Payment
        - ...........n

          - Authentication container
          - Authorization container
          - Product Listing container
          - Payment Gateway container
          - .....................n

    - Database

      - Cluster-One
      - Cluster-Two
      - Cluster- three
      - ...........n

        - Cluster-one container
        - Cluster-two container
        - Cluster-three container
        - ...................n

#### We can up/down as many containers as we want. Think how much power Docker Compose have. We need to install Docker Compose seperatly. Becuase this is not build by Docker itself it is build by community.

### Installation

<code>Step : 1. Check the latest version and run the command to download Docker Compose</code>

[Follow Digital Ocean Guide](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-compose-on-ubuntu-22-04)

[Release](https://github.com/docker/compose/releases)

```bash
$ mkdir -p ~/.docker/cli-plugins/
$ curl -SL https://github.com/docker/compose/releases/download/v2.3.3/docker-compose-linux-x86_64 -o ~/.docker/cli-plugins/docker-compose
```

<code>Step : 2. Change Permission</code>

```bash
$ chmod +x ~/.docker/cli-plugins/docker-compose
```

<code>Step : 03. Verify the installation was successfull</code>

```bash
$ docker compose version
```

## Uses of Docker Compose.

There are three steps to use Docker Compose.

- Service Definition / Container Definition
- Docker Compose Configuration (.yml file -> Set of instruction)
- Execution

### Step-01 (Service Definition OR Container Definition)

```bash
# Create a directory in the PWD.
$ mkdir project
$ nano Dockerfile
```

```bash
# Service Definition (Just to make it simple)
FROM ubuntu

# Build the file
$ sudo docker build -t <image_name> <Dockerfile_path>
```

### Step-02 (Docker Compose configuration)

Create a yaml file to configure Docker Compose in the PWD.

```yml
version: "3"
networks:
  batman:
    driver: bridge

services:
  web:
    image: "nginx:latest"
    ports:
      - "5000:5000"
    networks:
      - batman

volumes:
  db_data: {}
```

<code>Be careful about Docker Compose file name.</code>
<code>docker-compose.yml</code>

### Step-03 (Execution)

Run the compose

```bash
# Compose up
$ sudo docker compose up
```

```bash
# Output

[+] Running 2/2
 ⠿ Network project_batman   Created                                                                                                             0.2s
 ⠿ Container project-web-1  Created                                                                                                             0.1s
Attaching to project-web-1
project-web-1  | /docker-entrypoint.sh: /docker-entrypoint.d/ is not empty, will attempt to perform configuration
project-web-1  | /docker-entrypoint.sh: Looking for shell scripts in /docker-entrypoint.d/
project-web-1  | /docker-entrypoint.sh: Launching /docker-entrypoint.d/10-listen-on-ipv6-by-default.sh
project-web-1  | 10-listen-on-ipv6-by-default.sh: info: Getting the checksum of /etc/nginx/conf.d/default.conf
project-web-1  | 10-listen-on-ipv6-by-default.sh: info: Enabled listen on IPv6 in /etc/nginx/conf.d/default.conf
project-web-1  | /docker-entrypoint.sh: Sourcing /docker-entrypoint.d/15-local-resolvers.envsh
project-web-1  | /docker-entrypoint.sh: Launching /docker-entrypoint.d/20-envsubst-on-templates.sh
project-web-1  | /docker-entrypoint.sh: Launching /docker-entrypoint.d/30-tune-worker-processes.sh
project-web-1  | /docker-entrypoint.sh: Configuration complete; ready for start up
project-web-1  | 2024/08/21 07:14:55 [notice] 1#1: using the "epoll" event method
project-web-1  | 2024/08/21 07:14:55 [notice] 1#1: nginx/1.27.1
project-web-1  | 2024/08/21 07:14:55 [notice] 1#1: built by gcc 12.2.0 (Debian 12.2.0-14)
project-web-1  | 2024/08/21 07:14:55 [notice] 1#1: OS: Linux 6.5.0-41-generic
project-web-1  | 2024/08/21 07:14:55 [notice] 1#1: getrlimit(RLIMIT_NOFILE): 1048576:1048576
project-web-1  | 2024/08/21 07:14:55 [notice] 1#1: start worker processes
project-web-1  | 2024/08/21 07:14:55 [notice] 1#1: start worker process 29
project-web-1  | 2024/08/21 07:14:55 [notice] 1#1: start worker process 30

```

```bash
# List all networks
$ sudo docker network ls

# Output
NETWORK ID     NAME              DRIVER    SCOPE
722d34sdf012554f8   bridge            bridge    local
b1f3e7a5439d   docker_gwbridge   bridge    local
f88cdr3d34eb4c2   host              host      local
6efd6e3r3101780e   none              null      local
6173de20fc76877   project_batman    bridge    local

# project_batman is created successfully
# List all running containers
$ sudo docker ps

# Output
CONTAINER ID   IMAGE          COMMAND                  CREATED         STATUS         PORTS                                               NAMES
98669addb2a8   nginx:latest   "/docker-entrypoint.…"   4 minutes ago   Up 4 minutes   80/tcp, 0.0.0.0:5000->5000/tcp, :::5000->5000/tcp   project-web-1

# Inspect the network to verify that the running container is connected with the network or not?
$ sudo docker network inspect <network_name>

# Output
[
    {
        "Name": "project_batman",
        "Id": "61730fc76877cf2f374e47ccd6f69c217e718d8adac5d69a5a70927488b6caf9",
        "Created": "2024-08-21T12:28:48.312235433+05:30",
        "Scope": "local",
        "Driver": "bridge",
        "EnableIPv6": false,
        "IPAM": {
            "Driver": "default",
            "Options": null,
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
            "98669addb2a813ee4300948beaef3f9f887b7dd4dced9881b79b7a919b5ba941": {
                "Name": "project-web-1",
                "EndpointID": "6f55ed344c5d75b1dda6c6e83ca356242a535e72c7ae681f8c3a39d09dc4e2bb",
                "MacAddress": "02:42:ac:12:00:02",
                "IPv4Address": "172.18.0.2/16",
                "IPv6Address": ""
            }
        },
        "Options": {},
        "Labels": {
            "com.docker.compose.network": "batman",
            "com.docker.compose.project": "project",
            "com.docker.compose.version": "2.3.3"
        }
    }
]

# Watch this
["Containers": {
            "98669addb2a813ee4300948beaef3f9f887b7dd4dced9881b79b7a919b5ba941": {
                "Name": "project-web-1",
                "EndpointID": "6f55ed344c5d75b1dda6c6e83ca356242a535e72c7ae681f8c3a39d09dc4e2bb",
                "MacAddress": "02:42:ac:12:00:02",
                "IPv4Address": "172.18.0.2/16",
                "IPv6Address": ""
            }
        },
]
```

```bash
# Down all services
$ sudo docker compose down

# Output
[+] Running 2/2
 ⠿ Container project-web-1  Removed                                                                                                             0.3s
 ⠿ Network project_batman   Removed                                                                                                             0.3s
```

```bash
# Service down
$ sudo docker compose down

# Output
project-web-1  | 2024/08/21 07:16:33 [notice] 1#1: signal 3 (SIGQUIT) received, shutting down
project-web-1  | 2024/08/21 07:16:33 [notice] 29#29: gracefully shutting down
project-web-1  | 2024/08/21 07:16:33 [notice] 29#29: exiting
project-web-1  | 2024/08/21 07:16:33 [notice] 29#29: exit
project-web-1  | 2024/08/21 07:16:33 [notice] 30#30: gracefully shutting down
project-web-1  | 2024/08/21 07:16:33 [notice] 30#30: exiting
project-web-1  | 2024/08/21 07:16:33 [notice] 30#30: exit
project-web-1  | 2024/08/21 07:16:33 [notice] 1#1: signal 17 (SIGCHLD) received from 29
project-web-1  | 2024/08/21 07:16:33 [notice] 1#1: worker process 29 exited with code 0
project-web-1  | 2024/08/21 07:16:33 [notice] 1#1: signal 29 (SIGIO) received
project-web-1  | 2024/08/21 07:16:33 [notice] 1#1: signal 17 (SIGCHLD) received from 30
project-web-1  | 2024/08/21 07:16:33 [notice] 1#1: worker process 30 exited with code 0
project-web-1  | 2024/08/21 07:16:33 [notice] 1#1: exit
project-web-1 exited with code 0

```

```bash
# List all Docker Compose Process Status
$ sudo docker compose ps

# Output
NAME                COMMAND                  SERVICE             STATUS              PORTS
project-web-1       "/docker-entrypoint.…"   web                 running             0.0.0.0:5000->5000/tcp, :::5000->5000/tcp

```

<code>If there is any need to use container on localhost don forget to expose the Docker Compose.</code>

```bash
# Docker Compose logs
$ sudo docker compose logs

# Pause the environment execution without changing the current state of our containers.
$ sudo docker compose pause

# Resume execution
$ sudo docker compose unpause

# Terminate the container execution without distroying data that is associated with the container
$ sudo docker compose stop
```
