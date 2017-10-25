'use strict';

const AWS = require('aws-sdk');
const REK = new AWS.Rekognition();

exports.handler = function(event, context, callback) {
  var id = event.id;
  var srcBucket = event.bucket;
  var srcKey = event.key;

  var params = {
    Image: {
      S3Object: {
        Bucket: srcBucket,
        Name: srcKey,
      },
    },
    MaxLabels: 10,
    MinConfidence: 50,
  };

  REK.detectLabels(params, (err, data) => {
    if (err) {
      callback(err);
    }

    console.log('Analysis labels: ', data.Labels);

    var justTheLabels = [];
    data.Labels.forEach(element => justTheLabels.push(element.Name));

    var output = {
      id : id,
      labels : justTheLabels
    };

    callback(null, output);
  })
}
