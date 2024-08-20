# Docker Images

A Docker Image is a stack of multiple layers. These layers are nothing but the set of instruction that we have written in the Dockerfile. Every set of instruction makes a new layer of an Image. This is done by Docker Daemon which manage entire Docker.

Docker Daemon read the Dockerfile step by step and it will add up a new layer by performing the operation that we have written in the Dockerfile. And the layer is just Read-only type. Once the image has been built we cannot modify it. If we want to do such kind of things we must have to write a new Dockerfile and then build it into an Image.

Remember :- Every single instruction represent a new layer.

At the end of the process Docker Daemon also adds up a new layer which is the layer of Container. And that specific layer is not just read-only it has read-&-write type.

```bash
    Container layer - Read and Write
    ........n
    .........
    3rd layer       - Read Only
    2nd layer       - Read Only
    1st layer       - Read Only
```

To store these layers Docker have different-different storage drivers.

There can be multiple containers that are referencing the same image means a particular set of layers.

# Best practices for writing Docker Instruction

1. FROM :: Keep in mind that the image we are referencing to create an image must be verified or is customized by yourself or your organisation. Don't use an irrelevant image.

For example if we want to run nginx in our container then we should not pull an ubuntu image. What we can do is we can directly refer the nginx image. It will reduce a stack layer and our container become light weight. Thus, it's performance will be high.

Check which images is more effieint.

Ex:- Alpine Images (Build for software deployment purposes)

2. LABEL :: Used for meta-data. Organized, Documentation

LABEL dosen't increase the size of the images as much as any other instructions can do so. There are two parts of label.

- Meta-data labels
- Referencing labels

3. RUN :: Mostly used command.

Don't run <code>apt update</code> command in single set of instruction. It may fetch old version of an application from previous run command.

Don't run <code>apt upgrade</code> while creating an image because it also try to upgrade those libraries/packages that is not easily accessable and may throw errors. By upgrading system can lead more processing power.

4. CMD :: Used when container is in running state. Generally, we use this command when we have to run any application. In some other cases we can use it to run shell command.

5. EXPOSE :: Used to expose a container within internal defined networks. Let say there are two containers and they are trying to communication with each other on a specific port then we can use EXPOSE command to expose both of them so that the communication can happen.

PORT should be standardized and Relevent PORT.

6. PUBLISH :: Used to expose a container outside of the network on a specific PORT.

7. WORKDIR :: Used to define a workspace of a container.

Note :- Don't use <code>cd</code> command to define workspace.

8. ADD or COPY :: Used to copy a specific resource from an external source or internal source into a container.

COPY command is more prefered to copy any resouces because of it's scope(local context).
Instead of using ADD command to copy an external resource it more preferable to use the <code>curl</code> command.

9. ENTRYPOINT :: It set an entry point(like an index.js file) for a container.

#### Purpose :- Image should be polished and more efficient and light weight. Layer should be lesser as much as possible.

```bash
FROM ubuntu
LABEL maintainer="laxmankrishnamurti@gmail.com"
RUN apt update && apt install nginx -y
WORKDIR /apps
COPY ./index.html .
CMD ["service", "nginx", "start"]
```

- COPY command will copy the source file content into WORKDIR.

```bash
# Build the image
$ sudo docker build -t <image_name> <Docker_file_location>
```

# Docker File along with Alpine Image.

- Alpine Image
  - Linux distribution
  - Light weight
  - Easy to Store
  - Easy to manage and transfer
  - Strong Security Protection because it dosen't uses vulnerable libraries.

### Note :- Use DockerHub or Git/GitHub to store the Docker Image to make it available for all colleagues.

# Problem with the Docker File.

```bash
FROM nginx:alpine
LABEL Developer="Laxman Krishnamurti"
WORKDIR /apps
CMD ["nginx", "-g", "daemon off;"]
```

#### Problem :: Container automatically shutdown.

### Why ?

Docker containers are designed to run a specific process and will exit when that process finishes. Since the Dockerfile uses nginx:alpine as the base image, it includes a minimal OS (Alpine Linux) necessary for running Nginx.

The problem lies in the CMD instruction:

```bash
CMD ["service", "nginx", "start"]
```

This command attempts to start the Nginx service using the service command, but that approach doesn't work well within a Docker container. Containers are typically set up to run a single foreground process. When that process ends, the container exits. The service command is designed for system-wide init scripts and isn't ideal in the container context.

Instead, you should run Nginx directly in the foreground. Modify the Dockerfile's CMD instruction like this:

```bash
CMD ["nginx", "-g", "daemon off;"]
```

This command keeps Nginx running in the foreground, which prevents the container from exiting immediately.

- Main Cause :: The container exits because the service command runs Nginx as a background process and then completes. Running Nginx in the foreground will keep the container running.

### Difference between Forground Processes and Background Processes.

- Forground Process :: Foreground processes in the context of Docker containers (or even in traditional operating systems) refer to processes that actively run and occupy the terminal or console until they are manually stopped. They are the main processes that keep the container or terminal session active.

In a Docker container, the foreground process is the primary task or service that the container is meant to run. The container remains active as long as this process is running. If the process completes or exits, the container will stop. This is why it's essential to keep the process running in the foreground if you want the container to stay alive.

- Background Process :: This is a process that runs independently of the terminal or console session. It doesn't hold the session open. In a Docker container, if the main command runs as a background process (e.g., using & or daemon mode), the container will exit immediately after the command finishes because Docker expects the container to be driven by the primary process.

For example, running nginx with the -g 'daemon off;' option forces Nginx to run in the foreground, keeping the container active. Without this, if Nginx runs as a daemon (background process), the container would think there's nothing left to do and would shut down.

### Why Daemon off ?

The daemon off; directive in Nginx configuration tells Nginx to run in the foreground instead of the background. Here's why this is important in a Docker context:

- Nginx Daemon Mode (Background Process)

  - By default, Nginx runs as a daemon, meaning it starts, then detaches from the terminal and runs in the background.
  - In traditional systems (like a full OS), this is typical behavior, as services often run in the background while the system continues to operate other processes.

- Why Deamon off; in Docker?

  - Docker Container Behavior :: Docker containers are designed to run a single process in the foreground. The container remains active as long as this process is running. Once the process ends, the container stops.

  - Foreground Process Requirement: If you run Nginx in its default mode (as a daemon), it starts and immediately detaches from the terminal, leaving no process running in the foreground. Docker then sees that there's no active process and stops the container.

  - daemon off; Solution: By using nginx -g 'daemon off;', you force Nginx to run in the foreground. This means Nginx stays attached to the terminal and keeps the container running as long as Nginx is active, preventing Docker from stopping the container.
