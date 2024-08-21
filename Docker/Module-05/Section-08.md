# Docker Swarm (An Orchestration Tool)

In short, it allows us to maintain and manage our containers. It helps to build "Micro-services based application".

Orchestration = Orchestrate(Manage) + Containerization

Let take an example of Food Delivery application. Let see what are the parts that is in-build an apllication.

- Food Devlivering
- Payment Gateway
- Grocessory Storre
- Parcel Delevering

Overall, Orchestration tools like Docker Swarm breaks down the software into small manageable chunks.
Having different configurations and environments becomes easier with orchestration.

## Benefits of Orchestration.

- Easy deployment
- Easy management
- Easy resource management
- Allow for health monitoring of the containers
- Load balancing among different containers
- Easy Updating
- Easy scaling up and rolling back
- Creates a layer of security

<code>Docker Swarm comes with Docker so we don't need to install it seperately like Docker Compose.</code>

# What is Docker Swarm?

Docker Swarm is an orchestration service within Docker that allows us to manage and handle multiple containers at the same time. It is also a cluster(Server) of multiple container.

In Docker Swarm there is an Manager Node and a Worker Node. Manager node manages all Worker nodes.

# Docker Swarm Architecture.

User Request -> Docker Engine -> Manager Node -> Divide tasks into multiple chunks among all worker nodes.

<code>Note :- If we are running multiple containers within a Swarm like worker node and manager node. It dosen't mean that we cannot run a seperate container within the Swarm. Yes, We can run a container within a Swarm that is not managed by Manager node. And within the container we can run different services.</code>

## Docker Swarm Components.

First of all we have to clear in mind that what is a Node?

Actually, When we say that i'm installing Docker on my system or on my instance it means we are installing Docker Engine on our system. And the Docker engine is called a "Node". Let say there are 4 instance of ubuntu Operating system and we have installed Docker on each system it means we have created Four Nodes and when they merge together(using joining token), forms a Docker Swarm. In which we can define which node should be a Manager node or which node should be a Worker node using such kind of Orchestration tool like Docker Swarm.

- Service
- Task
- Nodes
- Load Balancing

## How to implement Docker Swarm?

<code>1. Initialize a Manager Node.</code>

```bash
$ sudo docker swarm init --advertise-addr <manager_node_IPv4_address>
```

It will return a token. Use the token to join other nodes as a worker node.

<code>2. Paster the token into worker terminal with sudo permission and hit enter.</code>

```bash
$ sudo docker swarm join --token <token>
```

<code>3. List all nodes to check all nodes are successfully joined.</code>

```bash
$ sudo docker node ls

# Manager Status -> Leader
```

<code>4. Common Commands</code>

```bash
# Swarm status
$ sudo docker info

# Leave/Down a particular node
# If any worker node will leave the swarm it must require the join token to re-join the swarm
$ sudo docker swarm leave

# Get worker join token
$ sudo docker swarm join-token worker

# Remove the previous down node that has exited
$ sudo docker node rm <node_name or _id>

# Remove manager
$ sudo docker swarm leave --force

# Get the token that can join multiple manager
$ sudo docker swarm join-token manager
```

<code>5. Create services</code>

```bash
# Create
$ sudo docker service create --name <service_name> --replicas 3 -p 80:80 <image>

# List
$ sudo docker service ls

# List all nodes (On which node the replicas are running)
$ sudo docker service ps <service_name>

# Inspect Service
$ sudo docker service inspect <service_name/Id>

# Remove service
$ sudo docker service rm <service_name>
```

#### If any container will be crashed or forcefully removed, Docker Swarm will re-built it again to maintane the number of replicas.

## Docker Compose with Docker Swarm

<code>1. Create the docker-compose.yml file</code>
<code>2. In this case we need to run the special command.</code>

```bash
$ sudo docker stack deploy -c docker-compose.yml <stack_name>
```

Because in the yaml file we can run multiple services so that's why we need stack command.

## Scale Services

```bash
$ sudo docker service scale <service_name>=<replicas_parameter>
```

Scalability totally depends upon system resources.

## List all stack that is associated with a service

```bash
$ sudo docker stack services <service_name>
```

## Load dirshtibution while maintenance

```bash
$ sudo docker node update --availability drain <node_id>
```

All nodes are distributed.

## Update Services

```bash
$ sudo docker service update --image ubuntu:21.04 <service_id>
```

## Remove stack

```bash
$ sudo docker stack rm <stack_name/_Id>
```
