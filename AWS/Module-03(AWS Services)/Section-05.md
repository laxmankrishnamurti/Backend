# AWC-EC2

- Elastic containers - AMI(Amazon Machine image)
  - Select region
  - Instance
  - Launch Instance
  - Choose image
  - VPC (Virtual private cloud) -> To isolate an instance.
  - Set all configuration(Persistant storage, RAM, ....etc)
  - Set firewall rules
  - Launch

## Basic Architecture

- Basic

  - Instances and AMIs
  - Regions and Availability Zones
  - Instance types
  - Tags

- Network and Security

  - Amazon EC2 key pairs
  - Security Groups
  - Elastic IP address
  - Amazon EC2 and Amazon VPC

- Storage (Persistance Data Storage) -> Instance Store
  - Amazon EBS
  - Instance store

Once the instance terminated the storage or the data that we have stored in the instance will also get deleted. Because this is going to be stored into instance storage area.

## Create a Custom AMI(Amazon machine image).

- Select the instance
- Click on Actions
- Click on Image and templates
- Click on Create Image
- Set-up all configuration
- Create image.
- Verify -> Images (Tab) -> AMIs -> Check Status

<code>Instance configuration may vary.</code>

### Share the AMI.

- Select the image.
- Make it Public.
- Share to the collegeous.

## Root Device Storage

There are two types of root device storage for AMIs

- Instance store (Temporary storage) -> Host Computer hard-drive -> Temporary block level storage -> shutdown -> Data loss
- Amazon EBS(Elastic storage) -> SAN (Storage area network) -> Attached with over the network -> It cannot be shared across multiple instances.
  - EBS enables to keep file data persistantly on a file system, ever after the EC2 instance is shutdown.

## Types of AMI

Amazon Machine Images use one of the two types of virtualizations:-

- ParaVirtual(PV) -> Older generation of virtualization
- Hardware Virtual Machine(HVM)

Note :- HVM gives better performance and uses latest hardware.

<code>Use the the EC2 instance like a mini-computer and deploy your application using various tools like - Docker, Kubernetes...etc</code>
