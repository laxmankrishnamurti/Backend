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
2. Docker API -> It receives that command and keep transfer to Docker Daemon.
3. Docker Daemon -> Creates and manage the new or existing container object.

## Docker Objects

It includes :-

1. Docker Images
2. Docker Containers
3. Docker Volumes
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

#### Let's create a Container using that image

```bash
sudo docker run -it -d --name <container_name> -p <port_number> <image_name>
```

Flag description :-

<code>-it</code> :: Open container in interactive mode
<code>-d</code> :: Open container in detached mode (Running on Background)
<code>--name</code> :: set contianer name (otherwise, docker daenom will assign a default name)
<code>-p</code> :: Attatch the container with a port

If port conflict occurs check it by this command.

````bash
# List which process is using the existing port
sudo lsof -i :<port_number>

# kill the process to resolve port conflict
sudo kill <process id>

# kill that process forcefully
sudo kill -9 <process id>
```

#### Interact with Containers

```bash
# List all running containers
# ps stands for Process status
sudo docker ps

# List all containers
sudo docker ps -a
````
