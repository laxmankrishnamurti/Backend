Before diving into docker and it's uses let's know first why should we use docker?

## Problem we face before Docker(Containerization).

Let's see how a standard delivery pipeline of a software looks like :-

Software Designing Phase -> Developer(Code) -> Executable File(Including all dependencies) -> Tester (who test the application) -> DevOps Engineer (who deploy the application)

- Developer Environment

  - Cent OS, Python-5.4.3, Pycharm IDE, django(for backend code), Dependencies
  - Status = This code runs fine on my computer.

- Tester Environment
  - Cent OS, Python-5.2.3, Spider IDE, django(for backend code), Dependencies
  - Status = This code does not run on my system.

Reason :: Tester's environment is not compatible as Developer's environment.

## Standard-delivery-pipeline with Docker(Containerization).

Instead of sharing the code file we share containers which has it's own enviroment to run a particular code. In Containerization we set-up environment based on our code and now testers can test that application inside the container.

Container dosen't depends upon tester's environment.

## What is a Container?

Containers arre software that wrap up all the parts of a code and all its dependencies into a single deployable unit that can be used on different systems and servers.

Container = OS(Operating system) + Code + All dependencies with specified version

## What is Microservices?

Multiple isolated containers can be launched together to form "Microservies" which can be easily managed using any orchastration tool. Like :- Docker Swarm, Kubernetes...etc

Microservices are like a collection of features which has it's own independent path of execution. Let's imagine how the microservices of YouTube looks like:-

Microservices = Container_one(Authentication) + Container_two(Authorization) + Container_three(Video recommendation feature) + Container(Video listing feature) + Container_four(Comment feature) + Container_five(Likes feature)............n(containers)

## Containers VS Virtual machine

- Containers

  1. It takes bare minimum part of the OS.
  2. Acts like a software on host system. It dosen't have direct access of hardware. Host kernal provides all necessary resources to that container.
  3. Isolation (Adequate enough)
  4. Efficiency (High) -> uses less resources
  5. Portability (High)
  6. Scalability (High) -> light weight
  7. Deployment (Easy)

- Virtual Machine (VM)
  1. It takes large space from the host system.
  2. It takes separate hardware resources from the host system. It has it's own kernal to manage the harware resources.
  3. Complete Isolation
  4. Efficiency (Low)
  5. Portability (Difficult)
  6. Scalability (Heavy)
  7. Deployment (Difficult) -> Heavy Resources

## Why do we need Containers?

There are two big usecase of Containes are :-

1. Consistent Development Environment
2. To build Microservices Architecture

# What is Docker?

Docker is a tool that helps in developing, building, deploying and executing software in isolation. It does so by creating containers that completely wrap a software.

The isolation provided by Containers gives a layer of security to the Container.

## Why Docker not else?

- Simple
- Fast
- Easy Collaboration
- Built for developers, by developers
- Docker Community (Big)

Language is used to build Docker is :- GO
Started : 2013

## Docker Installation

- Way-01 (By setting git repository)

Follow Documentation

- Way-02 (Via Terminal)

Install

```bash
sudo apt-get update
sudo apt install docker.io
```

Verify

```bash
sudo docket --version
```

Remove

```bash
sudo apt remove docker.io -y
```

# Docker Environment.

Docker environment includes :-

1. Docker Engine
2. Docker Objects
3. Docker Registry
4. Docker Compose
5. Docker Swarm

## Docker engine

It allows for the creation and management of all the docker processes. It has three major parts to it.

1. Docker CLI -> We run command on CLI to create and manage docker containers.
2. Docker API -> It receives that command and transfer to the Docker Daemon and it is also responsible to send back the response which is given by Docker Daemon to the Docker CLI.
3. Docker Daemon -> Creates and manage the new or existing container object.

## Docker Objects

It includes :-

1. Docker Images
2. Docker Containers
3. Docker Volumes & Drivers
4. Docker Networks
5. Docker swarm nodes & services

### Docker Images

We can create multiple images of different operating systems with different versions.

Create images

```bash
sudo docker pull <OS_NAME> <OS-VERSION>
```

```bash
# List all images
sudo docker images
sudo docker images ls
```

Example :-

```bash
sudo docker pull ubuntu
```

#### Let's create a Container using that image and learn some important commands that helps to manage containers.

```bash
sudo docker run -it -d --name <container_name> -p <port_number> <image_name>
```

Flag description :-

<code>-it</code> :: Open container in interactive mode
<code>-d</code> :: Open container in detached mode (Running on Background)
<code>--name</code> :: set contianer name (otherwise, docker daenom will assign a default name)
<code>-p</code> :: Attatch the container with a port

If port conflict occurs check it by this command.

```bash
# List which process is using the existing port
sudo lsof -i :<port_number>

# kill the process to resolve port conflict
sudo kill <process id>

# kill that process forcefully
sudo kill -9 <process id>
```

#### Interaction with Docker Containers

```bash
# List all running containers
# ps stands for Process status
sudo docker ps

# List all containers
sudo docker ps -a

# Spin/Run a Container
sudo docker start <container_name/>

# Stop a container
sudo docker stop <container_name>

# Stop a container forcefully
sudo docker kill <container_name>

# Restart a container
sudo docker restart <container_name>

# Enter inside a container
sudo docker exec -it <container_name or id> bash
```

As we discuss, Every container has it's own path of execution beacuse every container has it's own environment it means some container might have Ubuntu OS, some have Cent OS, other container may have Windows OS, Mac OS.....etc. Hence, we can say that Container is like a Mini-Computer in which there is only bare minimum part of Different operating system is installed.

For example if we run the command :-

```bash
ls

# Result will look like this
bin  boot  dev  etc  home  lib  lib32  lib64  libx32  media  mnt  opt  proc  root  run  sbin  srv  sys  tmp  usr  var

```

This is exactly same as our system result when we run the exact commond on root directory. If this is a Mini-Computer then we can play with that container and use it like an independent system.

Lets create a container and install the nginx-server into the container

```bash
# Create
sudo docker run -it -d --name container_one -p 80:80 ubuntu

# List
sudo docker ps -a

# Run
sudo docker start container_one

# Open the container
sudo docker exec -ti container_one bash

# Update Packages :: Now, we don't need to put sudo command inside a container. Because it will not open without sudo permission.
apt-get update

# Install Nginx-server
apt install nginx

# Check Nginx status
service nginx status

# Start Nginx, if not running
service nginx start

```

Now, visit localhost on your computer to check whether the nginx is properly set-up or install or not. And it will also confirm that the port number that we have attached while creating that container is now exposed.

Now, at this point of stage we are able to understand about what exactly a container is. In many cases we want to delete a container but we also want to save it's configuration so that we can apply those configuration on others containers. Let see how we can do it.

First of all we have to exit from the container and after that stop it.

```bash
# Exit from a container
exit

# Stop the container
sudo docker stop container_one

# Save container settings/configuration
sudo docker commit container_one any_custom_image_name
```

The command output will look like this

```bash
sha256:155a24852b0af83ff1114d869a4f4db8873fc47f978224fd81ada623c76fc204
```

It has created an image along with that custom_image_name.

```bash
# Check image list

sudo docker images

# Output

REPOSITORY                    TAG       IMAGE ID       CREATED         SIZE
container_one_configuration   latest    1a86bd728688   6 seconds ago   188MB
ubuntu                        <none>    ca2b0f26964c   5 months ago    77.9MB

```

Let's remove a container

```bash
sudo docker stop container_one

# Remove the container to specify their name OR it's id
sudo docker rm container_one

# Remove forcefully
sudo docker rm -f container_one

# List all containers
sudo docker ps -a

# Output

CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES
```

Let's create a container with the image that we have stored earlier via commit command.

```bash
sudo docker run -it -d --name container_two -p 80:80 container_one_configuration

# Output
1f7b2ee2cd5e7f9cfe47b558f593bb5e19a45836ef500e413cd5224c87b1cb44

# List containers
sudo docker ps -a

CONTAINER ID   IMAGE                         COMMAND       CREATED         STATUS         PORTS                               NAMES
1f7b2ee2cd5e   container_one_configuration   "/bin/bash"   4 seconds ago   Up 3 seconds   0.0.0.0:80->80/tcp, :::80->80/tcp   container_two

```

Note :: Using that commit image will automatically download all dependencies. Like in conainer_one we have downloaded the nginx servie so when we use that commit image to create a new container what will going to happen is, first of all it will create a new container with specified name and it will also download nginx in the new container.

Verify

- Spin that container
- Start Nginx server
- Visit localhost

### Docker Objects-Volumes.

Volumes are used to store conainers data. we can attach it with different containers. It is a persistant storage location for the contianers.

### Docker Objects-Volumes Drivers.

It enhance object volumes abilities by creating persistant storage on other hosts, cloud, encrypt volumes.

### Docker Objects Network.

A Docker network is basically a connection between one or more containers. One of the most powerful things about the Docker Containers is that they can be easily connected to one other and even other software, this makes it very easy to isolate and manage the containers.

## What is Docker Registry?

Docker registry is a storage location for Docker images. These images can be versioned in the registry as well.

### Docker Registry-DockerHub.

DockerHub is the official registry of Docker in which there are many images are stored and we can use <code>pull</code> or <code>push</code> command to get and upload an images in our Docker environment.

Alternatives :- ECR(Elastic container registry) -> AWS service , Azure container registry, JFrog Artifactory.

We can think it as NPM (Node package manager) which manage all libraries for node application. -> Just for understanding purpose.
