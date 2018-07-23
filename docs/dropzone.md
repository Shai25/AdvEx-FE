# S3-Dropzone

This document lists the steps needed to set up Amazon Lambda to serverlessly create pre-signed URLs, which are then used to upload files to Amazon S3 directly from the browser.

## Disclaimer

This document is intended for developers with basic understanding of JavaScript, Web development and Amazon Web Services. We recommend the following resources if you need some catch-up materials:

- [Web Technology for Developers](https://developer.mozilla.org/en-US/docs/Web)
- [Getting Started on Amazon Web Services (AWS)](https://aws.amazon.com/getting-started/)

## Dependencies

- [dropzone](https://www.npmjs.com/package/dropzone)
- [axios](https://www.npmjs.com/package/axios)

## Setup

0. Create a S3 bucket.

1. Create an Amazon Lambda function with runtime `Node.js 4.3`.

2. Select `Create a custom role`. In the page that opens, create an IAM role with the following policy document. Remember to change the bucket name.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents"
      ],
      "Resource": "arn:aws:logs:*:*:*"
    },
    {
        "Effect": "Allow",
        "Action": [
            "s3:PutObject",
            "s3:PutObjectAcl"
        ],
        "Resource": [
            "arn:aws:s3:::<YOUR_BUCKET_NAME>/*"
        ]
    }
  ]
}
```

3. Paste the following code into the editor. Create an environment variable with name = `AWS_BUCKET_NAME` and value = your bucket name.

```javascript
var AWS = require('aws-sdk')
var s3 = new AWS.S3();
var bucketName = process.env.AWS_BUCKET_NAME

exports.handler = (event, context) => {
    if (!event.hasOwnProperty('contentType')) {
        context.fail({ err: 'Missing contentType' })
    }

    if (!event.hasOwnProperty('filePath')) {
        context.fail({ err: 'Missing filePath' })
    }

    var params = {
        Bucket: bucketName,
        Key: event.filePath,
        Expires: 3600,
        ContentType: event.contentType
    }

    s3.getSignedUrl('putObject', params, (err, url) => {
        if (err) {
            context.fail({ err })
        } else {
            context.succeed({ url })
        }
    })
}
```

4. Create an API on Amazon API Gateway. Then Create a resource. Finally create a new POST method under the resource.

5. In `Integration Request`, set type to `Lambda Function` and specify the function created in in step 3.

6. Enable CORS with default settings.

7. Deploy the API to a stage. (This needs to be done each time the API is modified.) Then create a usage plan that associates the API.

8. Get `Invoke URL` from stage editor and put it into `AWS_LAMBDA_GETSIGNEDURL_ENDPOINT` of `config.js`.

9. Edit CORS configuration of the S3 bucket with the following.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<CORSConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
    <CORSRule>
        <AllowedOrigin>*</AllowedOrigin>
        <AllowedMethod>GET</AllowedMethod>
        <MaxAgeSeconds>3000</MaxAgeSeconds>
        <AllowedHeader>Authorization</AllowedHeader>
    </CORSRule>
    <CORSRule>
        <AllowedOrigin>*</AllowedOrigin>
        <AllowedMethod>PUT</AllowedMethod>
        <MaxAgeSeconds>3000</MaxAgeSeconds>
        <AllowedHeader>*</AllowedHeader>
    </CORSRule>
</CORSConfiguration>
```
