# Docker Storage

Default storage :- Within a Container. Hence, container size become larger and it badly impact on it's performance because it is stored in container's writable layer.

In such condition container may crashed. So, container should be light weight. If we are not storing any large amount of data into our container it's performance will be high.

Now, the question is that if we should not store data into a container then where it goes?

The answer is - Docker Storage

There are different types of data-storage in Docker.

## Advantages of Docker Storage.

- Persistent storage
- Data can be easily transfered.
- Increase container performance.
  - Ex :- Docker Volumes :: We can imagine it like an USB drive which can store data and can easily transfer those data into any computer. It works same with Docker Containers. Let say there are four containers and each container depends upon others. Like container two depends upon one....so on. Now the question is that how we can transfer container one data into container two and conatiner two data into container three? Here we can use Docker volumes. It takes all data from container one and establish a connection with container two and transfer data into the container, .......so on.

## Types of storage.

There are three major types of Docker storage which is used frequently. They are :-

- Volumes -> Completly managed with Docker.
- Bind Mount -> Managed without Docker.
- Tmpfs Mount -> Temporary data storage

## Lets talk about how storage works in Docker.

When we install Docker on our system is will take up a seperate area for storage Docker data. Host Kernal provides the access of the file system and a seperate storage are called Docker Area. This is only managed by Docker no one process can use the storage location.

Docker Volumes are always resides into Docker area.

But if we talk about the Bind Mount; it can be managed by outside of the Docker area. It means We can access it beyond the Docker area.

Tmpfs Mount always resides into the memory(RAM) so that's why this is only for Temporary use case.

## Docker Volumes

As we discussed earlier that Docker volumes are nothing but it is a persistent storage location for the containers. They are managed by Docker completely. They can be easily attached and removed from containers. We can also backup our volumes. This is mostly used type of data storage.

#### Lets discuss about Docker volume drivers.

Let say there are two servers(nodes) and both of them are on different-different locations. And one node contains Docker volume and other have a Docker Container. Now the problem is that Node-2's container wants some information that is stored in the Node-1's Docker volume. How to resolve the issue?

Here comes Docker Volume Drivers. It enhances the ability of Docker Volumes. It can fetch Docker volumes data (uploaded on cloud) into a container. So, with the help of Docker Volume Drivers we can solve the problem.

### Let's play with Docker Volumes.

```bash
# create docker volume
$ sudo docker volume create <volume_name>

# list all volumes
$ sudo docker volume ls

# meta-data about docker volume
$ sudo docker volume inspect <volume_name>
```

Meta-data Output

```json
[
  {
    "CreatedAt": "2024-08-20T01:40:22+05:30",
    "Driver": "local",
    "Labels": null,
    "Mountpoint": "/var/lib/docker/volumes/country/_data",
    "Name": "country",
    "Options": null,
    "Scope": "local"
  }
]
```

MountPoint :: Docker assign a location to the volume where all the data is going to be stored on that specific location.

```bash
# remove a volume
$ sudo docker volume rm <volume_name>

# remove multiple volumes (anonymous volumes -> That are not currently used by any container).
# This command will not delete any named volumes.
$ sudo docker volume prune

# remove all volumes that are not in use
$ sudo docker volume prune -f

# remove named volumes
$ sudo docker volume rm <volume_name> <volume_name> <volume_name> .......n
```

### Docker Volumes with Containers

We use <code>-mount</code> or <code>-volume</code> flag to use Docker Volume with a container. We use the flag when we are running the container.

- <code>--volume</code> flag is only used with Docker Volumes.
- <code>--mount</code> flag is used with all Docker storage type.

Let's attach a Docker volume with a container.

### With the <code>--mount</code> flag

```bash
# There should be not any single space between source and target arguments

$ sudo docker run -it -d --name <container_name> --mount source=<volume_location OR volume_name>, target=<target_location where the volume data should be stored into the container> <image_name>
```

Here, it the volume dosen't exit Docker Daemon will create a volume with the specified name. Target means -> Storage location in the container.

Lets check whether the volume is attached or not with the container

```bash
# search for mounts result
$ sudo docker container inspect <container_name>
```

```json

"Mounts": [
                {
                    "Type": "volume",
                    "Source": "country",
                    "Target": "/apps"
                }
            ],


"Mounts": [
            {
                "Type": "volume",
                "Name": "country",
                "Source": "/var/lib/docker/volumes/country/_data",
                "Destination": "/apps",
                "Driver": "local",
                "Mode": "z",
                "RW": true,
                "Propagation": ""
            }
        ],

```

### With the <code>--volume</code> flag

```bash
$ sudo docker run -it -d --name <container_name> --volume/-v <volume_name>:<target_location> <image_name>
```

```bash
$  docker run -it -d --name container_two -v users:/users ubuntu

```

Verification

```json
"Mounts": [
            {
                "Type": "volume",
                "Name": "users",
                "Source": "/var/lib/docker/volumes/users/_data",
                "Destination": "/users",
                "Driver": "local",
                "Mode": "z",
                "RW": true,
                "Propagation": ""
            }
        ],

```

### Make readOnly volumes and attach it with a container

```bash
$ sudo docker run -it -d --name <container_name> --mount source=<v_name/location>,target=<t_location>,readonly <image_name>
```

```json
"Mounts": [
            {
                "Type": "volume",
                "Name": "user_logs",
                "Source": "/var/lib/docker/volumes/user_logs/_data",
                "Destination": "/user_logs",
                "Driver": "local",
                "Mode": "z",
                "RW": false,
                "Propagation": ""
            }
],
```

#### Note :- RW (Read-write operation) -> false

## Bind Mount

Bind Mount's are not managed by Docker and are mapped to a host system directory. We can not manage and easily access as compare to Docker Volume because it stores data by reference points.

```bash
# create a directory on host system
$ pwd
$ mkdir bind_storage
$ sudo docker run -it -d --name <container_name> --mount type=bind,source=$(pwd)/bind_storage,target=/bind_storage <image_name>

# type=bind Readonly
$ sudo docker run -it -d --name <container_name> --mount type=bind,source=$(pwd)/bind_storage,target=/bind_storage,readonly <image_name>
```

```json
"Mounts": [
            {
                "Type": "bind",
                "Source": "/home/laxmankrishnamurti/bind_storage",
                "Destination": "/bind_storage",
                "Mode": "",
                "RW": true,
                "Propagation": "rprivate"
            }
        ],
```

In the Destination there is only referenced data is stored.

## Tmpfs Mount

- One Container Mount
- Temporary data storage location
- Used to store user's sensitive information for Authentication/Authorization
- It will not effect container's performance.
- Only works on Linux-based operating systems

```bash
$ sudo docker run -it -d --name <container_name> --mount --type=tmpfs,target=/temporary_storage <image>

$ sudo docker run -it -d --name <container_name> --tmpfs <target> <image_name>
```

```json
"Mounts": [
                {
                    "Type": "tmpfs",
                    "Target": "/tmpfs_temp"
                }
            ],

 "Mounts": [
            {
                "Type": "tmpfs",
                "Source": "",
                "Destination": "/tmpfs_temp",
                "Mode": "",
                "RW": true,
                "Propagation": ""
            }
        ],

```

When the container will end the tmpfs storage will also distroy.
