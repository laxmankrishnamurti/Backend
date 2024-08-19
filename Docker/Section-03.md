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

AAASDFSADFSDFSADFSDFSAFAFSADFSADFSADFSADFSAFSAFSAFSAFSAFSAFSFSAF
