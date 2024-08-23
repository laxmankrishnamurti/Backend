# Introduction to Kubernetes.

[Practice on lab](https://kode.wiki/kubernetes-labs)

Rest of Notes are in PDf Format.
<br>

[Download the PDF Notes](https://learn.kodekloud.com/user/courses/youtube-labs-kubernetes-crash-course/module/7b38906b-f64e-4b40-8cd4-57ad41790a9a/lesson/ed7c78e4-0cd3-4cc8-8d6e-3aac1b70c441)

# Key-points

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

As we discussed before with kubernetes our ultimate goal is to deploy our application in the form of containers on a set of machines that are configured as a worker node in a cluster.

However kubernetes does not deploy contianers directly on the worker nodes the containers are encapsulated into a kubernetes object known as a pods.

- A Pod is a single instance of an application.
- A Pod is the smallest object that we can create in kubernetes.

So, the question is that what happen when we want to scale our application? Should we add more containers to the Pod?

- The answer is No. We should create more Pods. Typically an application instance running as a container has a one-to-one relationship with a pod. To create more instance of an application we create more pods.

Howeve the one-to-one relationship is not a straight rule. It is a common practice to have a helper container or a sidecar container as it's known along with the main application. This could be an agent that collets logs or monitors the application and reports to a third party.

```bash
# create a pod
$ kubectl run <pod_name> <image>

# Ex :- kubectl run nginx --image nginx

# List all running pods
$ kubectl get pods
```

This was a imperative way to create a pod but this will not gonna help too much. In most of the cases we use Declarative way to create pods using YAML file.

Top level property for creating a yaml file

- apiversion
- kind
- metadata
- spec (Specification)

```yaml
# pod-definition.yml
# It's always a good practice to stick to two spaces.

apiversion: v1

# Kind of pods (Case-sensitive)
kind: Pod or Service or ReplicaSet or Deployment

# Data about pods
metadata:
  name: myapp-pod
  labels:
    app: myapp

# Specification (Different for different object/kind)
spec:
  containers:
    - name: nginx-container
      image: nginx
```

Once the file is created run the command to create pods.

```bash
# Create pods
$ kubectl create -f <file-name>

# Describe pod details
$ kubectl describe pod <pod-name>
```

In the specification object there is a key named "containers" which is a list of objects. The name that we assigned to the container is the name of the container within the pod and there could be multiple containers and each can have a different name. Like this :-

```yaml
spec:
  containers:
    - name: nginx-container
      image: nginx

    - name: busybox
      image: busybox

    --------n containers
```
