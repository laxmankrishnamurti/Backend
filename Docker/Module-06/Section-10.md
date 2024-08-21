# AWS-ECS

ECS stands for "Elastic Container Service" is an AWS services that allows us to orchestrate our software deployment. It acts like any other orchestration tool like Kubernetes or Docker Swarm. It allow us to deploy, update, rollback, scale up our software development.

This is four step process.

- Container Definition -> Image
- Task Definition -> Network, more attributes
- Service Definition -> Replicas(Number of tasks)
- Cluster Definition -> Architecture/Infrastructure details

# Architecture of AWS-ECS

- ECR or Any Registry(Extra step of process)

  - ECS

    - Fargate(Automatically manage full infrastructure)
    - EC2 (Manually managed)

      - Load Balancer

# Deploying a website on ECS

<code>1. Open ECS and Get started.</code>
<code>2. Choose any one Image of choose the custom option if there is any image is uploaded on ECR and select the image from that place.</code>

- Fill Container name
- Fill Image URI
- Private repository authentication (if we are not using ECR as image registry) -> Credentials
- Memory reservation parameters (300-500)MB -> Recommended
- Port mapping -> 80
  --------- Optional
- Update

<code>3. Task Definition and then Next.</code>
<code>4. Define Services and then Next.</code>

- Number of desired task -> Increase
- On application load balancer (Optional)
- Save

<code>4. Configure the cluster and then Next.</code>
<code>5. Review and then Create.</code>
<code>6. View Service</code>
<code>7. Load balancer -> Target Group: (EC2 management console(opened)) -> Scroll down -> Click on load balancer -> DNS Name -> Open in new Tab.</code>

<code>8. Congratulations! We deployed a website on ECS successfully. </code>
