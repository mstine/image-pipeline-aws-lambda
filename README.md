# Image Pipeline Demo for AWS Lambda

This project contains AWS Lambda function definitions intended to create a image processing pipeline with AWS Step Functions.

* `image-pipeline-trigger`: Intended to be triggered by Object Create events in an S3 bucket, it will generate a unique ID for the event, and trigger the Step Function with that ID, and the bucket name and object key.
* `image-resize`: Will create an image thumbnail (using 50% scaling) and drop it into a different S3 bucket.
* `image-analysis`: Uses AWS Rekognition to generate tags for the image.
* `image-db-update`: Stores the location of the thumbnail as well as the tags in a DynamoDB table.
* `image-api`: Read-only API that accesses DynamoDB table.

The S3 Buckets, DynamoDB table, and Lambdas are all provisioned using the SAM template `sam-template.yml`.

You can see the Step Function code in `step-function-code.txt`.

![](step_function_graph.png)
