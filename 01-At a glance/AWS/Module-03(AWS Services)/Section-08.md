# Amazon CloudFront

## CDN (Content Delivery Network)

- Uses Amazon backbone network

Amazon cloudfront is a web service that speeds up distribution of our static and dynamic web content, such as .html, .css, .js and image files, video files, to our users.

Cloudfront delivers our content through a worldwide network of data centers colled edge locations.

When a user requests content that we're serving with cloudfront, the user is routed to the edge location that provides the lowest latency(time delay), so that content is delivered with the best possible performance.

    - If the content is already in the edge location with the lowest latency, CloudFront delivers it immediately.

    - If the content is not in that edge location, CloudFront retrieves it from an origin that we're defined-such as an Amazon S3 bucket, a MediaPackage channel, or an HTTP server(for example, a web server) that we have identified as the source for the definitive version of our content.

#### S3 -> Create Bucket -> All arguments -> Add authentcatin -> Create Bucket -> Select Bucket -> Upload multiple file or content -> Open the object URL

#### CloudFront -> Create a CloudFront distribution -> All arguments -> Create Distibution -> Get the Domain name -> domainname/filename.

In the Cloudfront POP(edge location), CloudFront checks its cache for the requested files. If the files are in the cache, CloudFront returns then to the user. If the file are not in the cache, it will request for the file to the origin server.

Origin servers send the file back to the edge location.
