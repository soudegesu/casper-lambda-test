'use strict'
const runner = require('./src/runner');
const AWS = require('aws-sdk');
const path = require('path');
const fs = require('fs');

const TMP = process.env['TMP'];
const SNAPSHOT_BUCKET = process.env['SNAPSHOT_BUCKET'];
const SNAPSHOT_DIR = process.env['SNAPSHOT_DIR'];
AWS.config.region = process.env['AWS_REGION'];

// Create Promise object to upload to S3 bucket
function get_s3_update(filename) {
    console.log('File path: ' + TMP + filename);
    return new Promise((resolve, reject) => {
        let capture_s3 = new AWS.S3();
        let params = {
            Bucket: SNAPSHOT_BUCKET,
            Key: SNAPSHOT_DIR + filename,
            Body: fs.createReadStream(TMP + filename),
        };
        new AWS.S3().upload(params, (err, data) => {
            if (err) {
                console.log("Upload capture image error: " + err);
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

// App entry Point
exports.handler = function (event, context) {
    console.log('Running index.handler');
    console.log('Event Records:', event);

    // get S3 object information from S3 put event records
    let bucket = event.Records[0].s3.bucket.name;
    let key = event.Records[0].s3.object.key;
    let params = {
        Bucket: bucket,
        Key: key
    };

    new AWS.S3().getObject(params, function(err, data) {
        if (err) {
            console.log(err, err.stack);
            return
        }
        // save S3 object to /tmp/ on Lambda
        let paths = key.split('/');
        let upload_file = TMP + paths[paths.length - 1];

        console.log('Write to local: ' + upload_file);
        fs.writeFileSync(upload_file, data.Body);

        var filename = 'sample-script.js'; // file should be placed inside /src/scripts/
        var args = { // attach & pass this data to sample-script.js
            'upload_file': upload_file,
            'tmp': TMP
        };
        console.log('Executing file named: ', filename, 'with parameters:', JSON.stringify(args));

        // Execute the casperJS script and exit.
        runner(filename, args, function(err, data) {

            // Upload capture image .png files
            console.log('Upload capture files');
            fs.readdir(TMP, function(err, files){
                if (err) {
                    console.log(err);
                }
                let fileList = files.filter(function(file){
                    return /.*\.png$/.test(file);
                })

                console.log('Image files found at ' + TMP)
                console.log(fileList);

                let task_arr = [];
                for (let f of fileList) {
                    task_arr.push(get_s3_update(f));
                }
                Promise.all(task_arr).then(function(){
                    context.done();
                    console.log('All processes are sucsess');
                });
            });
        });
    });
};