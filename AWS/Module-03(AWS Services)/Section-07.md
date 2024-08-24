# AWS Load Balancer (Elastic Load Balancing)

As their name suggest that it is used to balance load among all running instances. There are 3 types of Load Balancer, these are ;-

#### Load Balancer -> Create Load Balancer -> All arguments -> Connect EC2 -> Create Load Balancer -> Target Instance.

- 1. Classic Load Balancer :- with these, we register instances with the load balancer.

  - Load Balancer
    - Instance-01
    - Instance-02
    - Instance-03
    - Instance-04
    - Instance-n

<code>May be depericated in future.</code>

- 2. Application Load Balancer :- In these we register targets in target groups, and route traffic to the target groups.

- Application Load Balancer goes deeper into appliation layer and figure it out to handle the request. So, that's why we face some delay using the Load Balancer.
- Communication happens using Private IPv4 address.

- Load Balancer

  - Target-group-01

    - Instance-01
    - Instance-02
    - Instance-03
    - Instance-n

  - Target-group-01

    - Instance-01
    - Instance-02
    - Instance-03
    - Instance-n

  - Target-group-n
    - Instance-n

- 3. Network Load Balancer :- In these we register targets in target groups, and route traffic to the target groups. But difference is that is dosen't go deeper as Application Load Balancer. Hence, it is faster than Application Load Balancer.

Disadvantage :- We can not purify the request as Application Load Balancer can do.
Advantage :- Faster than Application Load Balancer.

- Load Balancer

  - Target-group-01

    - Instance-01
    - Instance-02
    - Instance-03
    - Instance-n

  - Target-group-01

    - Instance-01
    - Instance-02
    - Instance-03
    - Instance-n

  - Target-group-n
    - Instance-n

## Cross-Zone Load Balancing

The nodes for our Load Balancer distribute requests from clients to registered targets.

When cross-zone load balancing is enabled, each load balancer node distributes traffic accross the registered targets in all enabled availability zone.

When cross-zone load balancing is disabled, each load balancer node distributes traffic only across the registered targets in its availability zone.
