# Monitoring Docker

Continuous monitoring is an important part of software development. It is something we take up as measure to maintain the health of a software and to improve the quality of the software, and this is based on feedback we get from the insights gained from monitoring.

Almost every company monitor their software performance and try to extract some insightful information by continuous monitoring.

Companies like Google, Microsoft, Facebook, IBM, Spotify, Adobe, Amazon, Netflix, \_Bose..etc they spend lots of money on monitoriing and grow their businesses.

Monitoring Form :: Server logs, Memory usages, specific time measuring.......etc.

## Monitoring Processes.

Data -> Data Processing(Cleaning) -> Monitor -> Analyze -> Visualization

## Long-term Benefits

- Product Polished (Brand value)
- Business Scalability
- Trend Analysis

## Types of Monitoring

- System Performance (Hardware)
- Process monitoring (Overall)
- Integration monitoring (Software connection & Communication status)
- Application Performance
- Business Monitoring

## Monitoring Tools

- ELK (Elastic search logstacks kibana) -> Logging
- Amazon Cloudwatch -> To monitor AWS services
- Nagios (Open source)
- splunk> (Commercial usages)
- Prometheus (Metrix monitoring tool) (Open source)
- Grafana (Visualization tool) (Open source)
  --------------n

Metrix Monitoring -> Measures resource usage -> Number format
Log Monitoring -> Error -> String format

<code>Every Single application produce logs. </code>

# What is Prometheus?

Prometheus is an opensource tool that is primarily used for metrics monitoring and alerting. It was developed in 2012 to fulfill soundcloud's neef of having a multidimensional data model, scaling and simplicity in their monitoring capabilities. It makes use of PromQL, a very powerful quering language. Prometheus is a pull based metric monitoring system which needs the location of specific endpoint(The point from where data can flow outside from the system).

## Prometheus Features

- Multi-Dimensional data model
- PromQL
- Service Discovery
- Time series collection via pull model
- No reliance on distributed storage

## Prometheus Architecture

1. Service Discovery, discover the service and inform Prometheus.

2. Once Prometheus have access of service name or end-points. It has two options, first it can directly pull all the metrics if endpoint is open. Otherwise Premetheus choose the second option, by using this method premetheus uses an Exporter to open the endpoint so that it can pull the metrics.

3. When pull operation is done it will store all the metrics into its localstorage.

4. We can use PromQL language to query data and push it to the Grafana to Visualize it.

5. In some other cases we can use Alert manager that push alerts if defined configuration will be matched,

## What is Grafana?

Grafana is an Open-source monitoring solutions that allows us to monitor real time data collected using collection agents like Prometheus using beautiful visualizations that give us in-depth insights.

## Grafana Features

- Visualise
- Dynamic Dashboards
- Explore matrics & Logs
- Alerting
- Mixed data sources

# Monitoring with Prometheus & Grafana

<code>1. Initialize Docker Swarm and connect multiple nodes using the docker swarm join token.</code>

<code>2. For now, Fork/Clone the Github Repository</code>

[Visit the Repo](https://github.com/remi-code/swarmprom)

In YAML file.

- Services Details
  - dockerd-exporter -> To open docker-engine end-point.
  - mode: global -> Runs on every replicas
  - cadvisor -> To collect metrics from the container.
  - node-exporter -> Extract node data
  - caddy -> Layer of security

Explore the Repo or the Directory structure.

### Flow - Structure

- node-exporter -> Open nodes endpoints
- cadvisor -> Open containers endpoints
- Prometheus -> Pull all matrics (Using multi-dimensional data model) -> store -> localstorage
- Grafana -> Fetch all data and visualize

<code>3. Deploy the Docker Compose</code>

```bash
$ sudo docker stack deploy -c <docker-compose-file-name> <stack-name>
$ sudo docker stack deploy -c docker-compose.yml monitor_container

# List services
$ sudo docker service ls
```

<code>4. Create a service with three replicas to monitor the service when it's data will come.</code>

```bash
$ sudo docker service create --name service_one --replicas 3 nginx

# List all service
$ sudo docker service ls
```

<code>5. To access Prometheus we need it's IP address.</code>

[Visit Prometheus](192.168.175.163:9090)
[Visit Prometheus](192.168.175.163:3000)

Password : admin & admin

<code>Explore more by experimenting.</code>
