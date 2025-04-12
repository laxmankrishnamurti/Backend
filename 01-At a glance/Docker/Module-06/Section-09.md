# AWS - ECR

Lets have a look on Docker container Journey

File/Image Registry(DockerHub) -> Docker File(Pre-built OR Customized) -> Docker Image(Blueprint for containers) -> Containers

# What is AWS-ECR?

ECR stands for Elastic Container Registry is an AWS service that acts as a dedicated location for storing Docker Images. First of all we need to authorize our Docker client and once the Docker client has been authorized it can push and pull images from the ECT registry.

It is useful in a scenario when we don't want to manage a dedicated storage for images and want to use other AWS services that make use of it.

## How to push an image on AWS-ECR?

<code>1. Run an EC2 instance.</code>
<code>2. Make a new directory in PWD and create two files.</code>

```html
<!-- index.html file -->

<html>
  <head>
    <title>AWS-ECR Services</title>
  </head>
  <body>
    <h1>Pushing an image from Local system to AWS.</h1>
  </body>
</html>
```

```bash
# Dockerfile

FROM nginx:alpine
COPY ./index.html /usr/share/nginx/html
```

<code>3. Build and Image using the Dockerfile</code>

```bash
$ sudo docker build -t <image_name> <Dockerfile_location>
```

<code>4. Create a container using the image. </code>

```bash
$ sudo docker run -it -d --name container_one -p 80:80 <image_name>
```

<code>5. Visit localhost to verify</code>
<code>6. Create a ECR-Repository</code>

ECR -> Create a Repository -> Get Started -> Configuration -> Create Repository -> Select the Repository and View push Command

<code>7. If we are using an EC2 instance we must give IAM access to the EC2 instance. It allows to push images from EC2 to ECR. </code>

Select that Instance -> Actions -> Instance Settings -> Attach/Replace IAM Role -> Create a new IAM role -> create role -> AWS services -> EC2 -> Next permissions -> Search ECR -> <code>Select -> AmazonEC2ContainerRegistryFullAccess</code> -> Next: Tags -> Next: Review -> Role name, Role Description -> Create Role

Now select the Role option -> Apply

<code>8. Come back to the EC2 instance and install AWS-CLI</code>

```bash
$ sudo apt update
$ sudo apt install awscli -y
```

<code>9. Authenticate Docker Client. </code>

Select the Repository -> View push command -> Run the first command on EC2 instance

<code>If login Succeeded.</code> -> Docker client is completly authenticated.

<code>10. As we know before pushing any image on Image registry we should tag our images with a proper naming convension.</code>

- Copy the ECR Repository URI
- Tag the existing image

```bash
$ sudo docker tag <image_name> <ECR-URI>
```

- Make sure Repository name shoudl match the image name.(Just for naming convension and good pratices)

<code>11. Push the Image</code>

```bash
$ sudo docker push <modified_image_name>
```

Open the Repository and refresh it. There will be an image which is uploaded recently.
