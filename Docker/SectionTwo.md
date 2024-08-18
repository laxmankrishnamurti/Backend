# Docker Architecture

Basic Life-flow of Docker

1. Docker CLI

   ```bash
    $ sudo docker build
    $ sudo docker pull
    $ sudo docker run
    .................
    .................etc.
   ```

   Docker API will take the command and send it to the Docker Daemon. According to the command Docker Daemon will response and will send the response to the Docker API and then it will send back to the Docker CLI.

2. Docker Host

   - Docker Daemon

     1. Images
     2. Containers

     Docker Daemon will fetch the image from the Docker Registry and it will replicate it on it's own environment/host system.

3. Docker Registry

Docker Registry is the place where multiples images are listed. We can pull the image from Docker Registry and use it to build our containers.

# Let's learn how to build our own Docker Image.

To build a Docker Image we will require a Docker file.

## Docker File.

Docker file is like a script that we can write and then build into an image. The image can be used to create multiple containers. It is like a shell script.

Developer -> Docker File -> Docker Imge -> Docker Container

### Docker File Format.

1. FROM :: It is the instruction that informs docker about the base image that is to be used for the container. So basically if we have an image in mind whose properties we wish to inherit we can mention it using this instruction. This is always used as the first instruction for any Docker Image, but we can use it multiple times.

```bash
$ FROM <base_image>
```

2. ADD :: It is used to add sources from our local directory or a URL to the file system of the image that will become the container in the destination location. We can include multiple items as the source and can even make use of wildcards(include all files that has started with the same name) and if the destination that we have mentioned does not exist then it will create one.

```bash
$ ADD <source> <destination>
```

3. COPY :: It is used to copy new sources from only our local directory to the file system of the image that will become the container in the designated location. We can include multiple items as the source and can even make use of wildcards and if the destination that we have mentioned does not exist then it will create one.

It is similar to ADD, the difference begin that ADD can also new URL to the file system but COPY can't.

```bash
$ COPY <source> <destination>
```

4. RUN :: This instruction is used to run specific commands that we want run in the container during its creation. For example, We want to update the ubuntu ins tance then we can use the instruction as such :

```bash
$ RUN <command>

# Example
$ RUN apt-get update
```

5. WORKDIR :: This instruction is responsible for setting the working directory so that we can run shell commands in that specific directory during the build time of that image.

```bash
$ WORKDIR <directory>
```

6. CMD :: This instruction tells the container what command to run when it gets started.

There is difference with commands between before running a container and after running the container. Before running the container we used RUN command and after running the container we use CMD command.

```bash
$ CMD <command>
```

7. VOLUME :: This instruction makes a mount point for the volume of a specified name.

Docker takes a small part of storage from host system and it will mount it as a Docker Volume. This acts like a storage location for Docker's containers. The VOLUME command will specify the Docker Volume path for containers.

```bash
$ VOLUME <path>
```

8. EXPOSE :: This instruction tells that what port the container should be exposed at. But this can only happen for an internal network, the host will not be able to access the container from this port.

```bash
$ EXPOSE <port>
```

9. ENTRYPOINT :: This instruction allows us to run commands when our containers starts with parameters. The difference between CMD and ENTRYPOINT is that with our ENTRYPOINT command, is not overwritten during runtime. When we use ENTRYPOINT it will override any elements specified in another CMD instruction.

```bash
$ ENTRYPOINT <command> <parameter_1> </parameter_2>
```

10. LABEL :: This instruction is used to add Meta-Data of our image. We need to make use of quotes & backslashes if we want to include spaces. If there are any older labels they will be replaced with the new label vlaue. We can make use of Docker inspect command to see it's container.

Since a new layer is created each time a new instruction is written, it is important to write in the most optimized way as possible and least number of instructions as possible. Otherwise, our container is going to be bulky/heacy that may impact on it's performance.
