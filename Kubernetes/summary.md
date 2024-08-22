# Introduction to Kubernetes.

[Practice on lab](https://kode.wiki/kubernetes-labs)

## What are Containers?

Containers help up to create isolated environment on our systems to run applications completely isolated from each other.

## What is Kubernetes?

With Docker we are able to run a single instance of an application using the docker run command which is great! Running an application has never been so easy before. With Kubernetes using the Kubernets CLI known as <code>kubectl</code>. We can run a thousand instance of the same application with a single command. Kubernetes can scale it up to 2000 with another command.

- Kubernetes can even be configured to do these automatically so that instances and the infrastructure itself can scale UP and DOWN based on user load.

- Kubernetes can upgrade these 2000 instances of application in a rolling fashing one at a time with a single command and if something goes wrong it can help us roll back these images with a single command.

- Kubernetes can help us to test new features of our application by only upgrading a percentage of these instances through ab testing methods.

- With Kubernetes we can run multiple instances of a service. It is like a set of replicas and we can define different-different state of an instance it anything goes wrong it can move backward towards their default state.

## What is a Node?

A node is a machine physical or virtual on which Kubernetes is installed and this is where containers are launched by kubernetes.

What if when the node goes down on which our application is running. It's Obviously our application goes down so we need to have more than one Node.

## What is a Cluster?

A Cluster is a set of Nodes grouped together. This way even if one node fails we have our application still accessable from the other nodes moreover having multiple nodes helps in sharing load between the node as well.

In Cluster there is a ControlPlane. The ControlPlane watches over the nodes in the cluster and is responsible for the actual orchastration of containers on the worker nodes.

## When we install Kubernetes on a system we are actually installing the following components..

- ControlPlane Node

  - kube-apiserver :: Acts as a frontend for Kubernetes.(Only way to communicate with the cluster)
  - etcd :: Distributed reliable key-value store used by Kubernets to store all data used to manage the cluster.
  - controller-manager :: Brain behind Orchestration
  - kube-scheduler :: Work-load distributer. It looks for newly created containers and assign them to nodes.

- Worker Node

  - kubelet :: It will make sure all worker containers are running as expected.
  - kube-proxy :: It is responsible to maintaning rules on the nodes. The proxy helps in to communicate with each other the worker nodes and the container nodes.
  - container runtime :: Responsible to run a particular node.

- kubectl :: Command-Line utility for Kubernetes

# Commands

```bash
# Check kubernetes version
$ kubectl version

# Help information
$ kubectl --help

# List all running nodes within a Cluster.
$ kubectl get nodes
```
