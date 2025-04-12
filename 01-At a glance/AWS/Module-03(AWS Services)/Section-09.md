# Amazon CloudWatch (Cloud Monitoring Service)

- Easy to integrate
- To be more precise, this is just a monitoring tool to manage all AWS cloud Service.
- This is helpful to monitor user trafic and resources utilization.
- Helps to scale an application.
- This is like a matrics repository. Key matrics includes :-

  - CPU Usage
  - CPU latency
  - Network traffic
  - Disk storage

  - Based on these matrics it provides a real-time summary of system activity and indivisual resources.

  - In short, CloudWatch provides a comprehensive at-a-glance view of AWS infrastructure to keep track of application performance.

## CloudWatch Alarms

An alarm can be used to automatically initiate actions on our behalf. It watches a single metric over a specific time period and performs one or more specified actions.

The action is a simply a notification that is sent to Amazon SNS topic.

- Metric alarm
  - single metric or single condition
- Composite alarm
  - Multiple condition or multiple metrics

Alarm states

- OK :: Within the defined state.
- ALARM :: Outside of the defined threshold.
- INSUFICIENT DATA :: Alarm has just started.
