'use strict'
const index = require('./index.js');

// Edit these parameters
let PUT_EVENT_BUCKET = 'bucket_xxxxxxx';
let OBJECT_KEY = 'path/to/object_key_xxxxx';
let BUCKET_REGION = 'Region where PUT_EVENT_BUCKET is located';

let event = {
    'Records': [
        {
            eventVersion: '2.0',
            eventSource: 'aws:s3',
            awsRegion: BUCKET_REGION,
            eventTime: '2018-04-18T01:46:37.276Z',
            eventName: 'ObjectCreated:Put',
            userIdentity: {
                principalId: "Amazon-customer-ID-of-the-user-who-caused-the-event"
            },
            requestParameters: {
                sourceIPAddress: "ip-address-where-request-came-from"
            },
            responseElements: {
                "x-amz-request-id":"Amazon S3 generated request ID",
                "x-amz-id-2":"Amazon S3 host that processed the request"
            },
            s3: {
                "s3SchemaVersion": "1.0",
                "configurationId": "ID found in the bucket notification configuration",
                "bucket": {
                    "name": PUT_EVENT_BUCKET,
                    "ownerIdentity":{
                        "principalId":"Amazon-customer-ID-of-the-bucket-owner"
                    },
                    "arn": "arn:aws:s3:::" + PUT_EVENT_BUCKET
                },
                "object": {
                    "key": OBJECT_KEY,
                    "size": "object-size",
                    "eTag": "object eTag",
                    "versionId": "object version if bucket is versioning-enabled, otherwise null",
                    "sequencer": "a string representation of a hexadecimal value used to determine event sequence, only used with PUTs and DELETEs"
                }
            }
        }
    ]
}
let context = {
    done: function(){
        console.log('context is done.');
    }
}
let callback = function() {
    console.log('callback is called.');
}

index.handler(event, context, callback);