'use strict';

const AWS = require('aws-sdk');
const S3 = new AWS.S3({
  signatureVersion: 'v4',
});
const JIMP = require('jimp');

exports.handler = function(event, context, callback) {
  var id = event.id;
  var srcBucket = event.bucket;
  var srcKey = event.key;

  var dstBucket = "resized-" + srcBucket;
  var dstKey = "resized-" + srcKey;

  var output = {
    id : id,
    bucket: dstBucket,
    key: dstKey
  };

  S3.getObject({Bucket: srcBucket, Key: srcKey}).promise()
    .then(data => JIMP.read(data.Body)
      .then(function (image) {
        image.scale(0.5);
        image.getBuffer(JIMP.MIME_PNG, function(error, imageData) {
          S3.putObject({
            Body: imageData,
            Bucket: dstBucket,
            ContentType: JIMP.MIME_PNG,
            Key: dstKey,
          }).promise()
          .then(() => callback(null, output))
          .catch(err => callback(err))
        });
      }));
}
