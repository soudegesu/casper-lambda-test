# casper-lambda-test

casper-lambda-test, a sample script for running CasperJS on AWS Lambda.
This program is made with reference to [node-casperjs-aws-lambda](https://github.com/narainsagar/node-casperjs-aws-lambda).
With the PUT event of S3 triggered, the program on AWS Lambda will execute.

## Runtime
* AWS lambda
* Node 6.10

## Install

```
npm install
```

## Execute
### Environment Variable
`export` the following parameters as environment variables.

|variable name  |meaning                                                 | sample value   |
|---------------|--------------------------------------------------------|----------------|
|TMP            |Directory to put file temporary                         |/tmp/           |
|SNAPSHOT_BUCKET|bucket name to upload capured file                      |hogehoge-bucket |
|SNAPSHOT_DIR   |bucket folder to upload capured file on SNAPSHOT_BUCKET | result/        |
|AWS_REGION     |AWS Region bucket exists                                | ap-northeast-1 |

### Execute In local
#### Precondition
Before doing the following you need to set credential information for AWS. Please see [here](https://docs.aws.amazon.com/cli/latest/userguide/cli-config-files.html).

#### Edit Parameters

Open `index.local.js` and edit the following parts to suit your environment.

```
let PUT_EVENT_BUCKET = 'bucket_xxxxxxx';
let OBJECT_KEY = 'path/to/object_key_xxxxx';
let BUCKET_REGION = 'Region where PUT_EVENT_BUCKET is located';
```

#### Execute Command

```
npm run local
```

### Execute on Lambda
1. After executing `npm install --production` command, Zip the project directory.
2. Upload the zip file to Lambda and set the event trigger of the S3 bucket.
3. To use more resources to run casperjs, memory is allocated a bit larger (around 2MB).
4. Set environment variables.