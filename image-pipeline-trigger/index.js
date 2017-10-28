'use strict';

const AWS = require('aws-sdk');
const SHORT_ID = require('shortid');

const STEP = new AWS.StepFunctions();

exports.handler = (event, context, callback) => {
    var srcBucket = event.Records[0].s3.bucket.name;
    var srcKey = event.Records[0].s3.object.key;

    var input = {
        id: SHORT_ID.generate(),
        bucket: srcBucket,
        key: srcKey
    };

    console.log('Triggering image pipeline with: ' + JSON.stringify(input));

    var sfArn = process.env.STATE_MACHINE_ARN;

    var params = {
        stateMachineArn: sfArn,
        input: JSON.stringify(input),
        name: input.id
    };

    STEP.startExecution(params, (err, data) => {
        if (err) callback(err);
        else callback(null, data);
    });

};
