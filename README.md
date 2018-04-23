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
`export` the following parameters as a environment variable.

|variable name  |meaning                                                 | sample value   |
|===============|========================================================|================|
|TMP            |Directory to put file temporary                         |/tmp/           |
|SNAPSHOT_BUCKET|bucket name to upload capured file                      |hogehoge-bucket |
|SNAPSHOT_DIR   |bucket folder to upload capured file on SNAPSHOT_BUCKET | result/        |
|AWS_REGION     |AWS Region bucket exists                                | ap-northeast-1 |

### Execute in local

#### Precondition
Before doing the following you need to set credential information for AWS. Please see this [here](https://docs.aws.amazon.com/cli/latest/userguide/cli-config-files.html).
