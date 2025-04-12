# AWS SQS and SNS

- SQS :: Simple Queue Service
- SNS :: Simple Notification Service

## SQS

Lets forget about its definition, let understand what exactly it is. Let say we are running a travel website on AWS and we have created multiple instance to handle the user request. In that website we offers to book flight ticket. Let there is a user came to the website and he is looking for a flight from Bihar to Kerala and we have partnered with multile air base companies like :- Vistara, Air India, Indigo, Akasha ......etc

So whenever user hits a request our EC2 instance will fetch those flight details from the air base companies's servers and send it to the user. But what if the instance get down after recevinig the request? The server is no longer to respond of the request. Here comes SQS.

It helps to get the request details from the previous instance and send it to the new instance and the instance will do all these stuffs and send response to the client.

According to Amazon, "Amazon simple Queue service (SQS) is a fast, reliable, scalable, fully managed message queuing service."

It is a web service that gives us access to message queue that store messages waiting to be processed.

- Standard Queue :-
  - High throughput
  - At least one delivery
- Fifo Queue :-
  - Limited throughput (300 transaction per second)
  - First in, first out
  - Exactly one processing.
