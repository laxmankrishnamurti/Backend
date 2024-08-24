# AWS-VPC (AWS - virtual private cloud)

Private means? A thing that is not publically available even though it can be accessable by ohter users but they are not authorized to modify it. Same goes with the Virtual private cloud, we have already cover it into previous section but the point is we have not talked about too much about this.

So, what happens is when we run our instance it actually runs on a virtual private cloud network we can deploy any application on that isntance and perople can use the application but if talk about the management or the control of the instance is in our hand. Nobody can access our instance that is build upon virtual private cloud.

But this is not end here it is just an introduction of the Virtual private network. This is only the tip of the ice-burg, rest of the part is actually laying under the hood. Let's explore them all.

## Important components of Virtual private network/cloud

- Virtual private cloud
  - Public, Private, and Elastic IP address
  - Public and Private subnets
  - Internet Gateway
  - Route tables
  - NAT Gateway
  - Security Groups
  - Network ACLs
  - VPC best practises

# What is Virtual Private Cloud?

Virtual private cloud is a custom-defined virtual network within the AWS cloud. To me more precise, all things that are releated to the virtual network of our whole infrastructure within AWS is a part of Virtual network or Virtual private cloud.

VPC is like a network manager tool that AWS offers us to manage whole network releated stuffs on our running instance. We can create our own custom Virtual pricate network in AWS.

To learn VPC in more clear way requires a good networking knowledge to manage all our instances.

Within a region, we can create multiple VPCs, and each VPC is logically isolated evern it it shares its IP address space. Because VPC is "Isolated cloud resources" means cloud resources in one VPC will not communicate with other VPCs.

AWS account have a default VPC created in each region with a default subnet created in each availability zone. AWS does these all stufs because let say there is a developer who simply wants to spin up an instance of AWS-EC2 to deploy their application and it doesn't have more knowledge about networking. So, before spining up a machine it must require to set-up VPC and define its own VPC network for the instance that he wants to run. So, for hiding such kind of underlyning networking complexity they creates a bydefault VPCs for different-different zone.

So, that's why we have different-different VPCs network for different regions and multiple subnets for different availabilty zones.

## Default VPC components

<code>Followed by AWS Documentation.</code>

Amazon creates the following resources on your behalf:-

- When we create a default VPC, we do the following to set it up for you.
  - Create a VPC with a size <code>/16</code> IPv4 CIDR block (172.31.0.0/16). This provides up to 65,536 private IPv4 address.
  - Create a size <code>/20</code> default subnet in each availability zone. This provide up to 4,096 addresses per subnet, a few of which are reserved for our use.
  - Create an Internet Gateway and connect it to your default VPC.
  - Create a default security group and associate it with your default VPC.
  - Create a default network access control list (ACL) and associate it with your default VPC.
  - Associate the default DHCP options set for your AWS account with your default VPC.

## AWS VPC Concepts

AWS VPC is a networking layer for AWS-EC2 instance.

The following are the key concept of VPCs.

- Virtual private cloud (VPC) :- A virtual network dedicated to our AWS account.
- Subnet :- A range of IP address in our VPC.
- Route Table :- A set of rules, called routes, that are used to determine where network traffic is directed.
- Internet Gateway :- A gateway that we attach to our VPC to enable communication between resources in our VPC and the internet.

## Custom VPC.

<code>Follow a unique naming convention</code>

VPC -> Create VPC -> All arguments -> Create VPC.

Note :- Instance is a part of a subnet it dosen't run on a VPC so after creating a VPC network we must have to create a subnet for our instance.

- Subnets -> Create subnet -> VPC ID -> All arguments -> Create subnet.

Associate the subnets with the Routing table. If we do not associate a subnet with a Route table it is bydefault a part of main Route Table.

- Route Table -> Create route table -> All arguments -> Create route table.

By default main route table is created when the default VPC is created. And all subnets of different availability zones is a part of the main route table it means bydefault they all are associated with the main route table.

If we create a custom route table we need to associate subets explicitly to the route table.

- Select Route table -> Subnet association -> edit -> select subnet -> Save

- internet gateway -> Create internet gateway -> All arguments -> Create Internet gateway -> Action -> Attach to VPC -> Select VPC -> Attach internet gateway

If Route table dosen't have information about Root then having an igw-xxxxx internet gateway does not make any sense. So we must attch the root.

To check it select the route table and look for root as default, if it dosen't not present then edit routes.

Edit route -> Add route -> select default root -> igw-xxxxxx(the internet gateway) -> Save chagnes

Now the instance have internet gateway.

- igw-xxxxxxxxxx -> Main internet gateway(Not revealed by AWS)

Try to run a instance based on the custom VPC.
