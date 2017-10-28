'use strict';

const AWS = require('aws-sdk');
const S3 = new AWS.S3({
  signatureVersion: 'v4',
});
const JIMP = require('jimp');

exports.handler = function(event, context, callback) {
  console.log('executing resize job...');
  var id = event.id;
  var srcBucket = event.bucket;
  var srcKey = event.key;

  var dstBucket = process.env.THUMBNAIL_BUCKET;
  var dstKey = "thumbnail-" + srcKey;

  var output = {
    id : id,
    originalBucket: srcBucket,
    originalKey: srcKey,
    thumbnailBucket: dstBucket,
    thumbnailKey: dstKey
  };

  S3.getObject({Bucket: srcBucket, Key: srcKey}).promise()
    .then(data => JIMP.read(data.Body)
      .then(function (image) {
        console.log('Scaling image by 0.5.');
        image.scale(0.5);
        image.getBuffer(JIMP.MIME_PNG, function(error, imageData) {
          console.log('Storing thumbnail to S3: ' + dstBucket + '/' + dstKey);
          S3.putObject({
            ACL: 'public-read',
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
