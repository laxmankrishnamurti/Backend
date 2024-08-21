# What is Kubernetes?

Docker -> Create Contaiiners
Kubernetes -> Manage Containers

By definition, Kubernetes is an Open-source container orchestration tool that allows us to manage multiple containers in different types of environment. A pro about Kubernetes compare to other orchestration tool is that it is a very robust and secure orchestration tool that dosen't leave us wanting much.

# Kubernetes Features.

- Easy updates and Rollbacks
- Storage Distribution
- Secret Handling
- Heals itself -> Used to reduce application down-time.
- Load Balancing
- Easy Scaling

# How does Kubernetes function?

In a cluster there are many containers that are in running state and in that container there is a Manager Node and rest of the containers are called Worker Node. The manager node manages all worker node using Kubernetes.

Yes, Instead of using Docker Swarm we uses Kubernetes because kubernetes is more efficient and provides robust architecture.

POD :: Logical set of Containers (Worker Nodes)

Docker Swarm -> Minor
Kubernetes -> Large scale

## Kubernetes Node Cluster

- Manager Node

  - Worker Node-1
    - POD-1
    - POD-2
  - Worker Node-2
    - POD-1
    - POD-2

- PODs can be Replicas

# Kubernetes Components

- Service :: A service allows Kubernetes to show a set of pods as a service that can be connected to other sets of pods.

- Ingress :: An ingress is used to manage the external access of an application.

#### Diagram

- Ingress
  - Service-1
    - POD-1
    - POD-2
    - POD-3
    - POD-4
  - Service-2
    - POD-1
    - POD-2
    - POD-3
    - POD-4
  - Service-3
    - POD-1
    - POD-2
    - POD-3
    - POD-4

## Kubernetes Cluster Parts

- Kubectl :: Used to run kubernetes command

  - Manager Node

    - API Server
    - Controller Manager
    - Scheduler
    - etcd

  - Worker Node
    - Kubetlet
    - Kube-Proxy
    - PODs
