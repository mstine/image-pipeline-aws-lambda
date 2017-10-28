'use strict';

const AWS = require('aws-sdk');
const DOC = require('dynamodb-doc');
const DYNAMO = new DOC.DynamoDB();

exports.handler = function(event, context, callback) {
  var id = event[0].id;

  var originalBucket = event[0].originalBucket;
  var originalKey = event[0].originalKey;
  var originalUrl = 'http://s3.amazonaws.com/' + originalBucket + '/' + originalKey;

  var thumbnailBucket = event[0].thumbnailBucket;
  var thumbnailKey = event[0].thumbnailKey;
  var thumbnailUrl = 'http://s3.amazonaws.com/' + thumbnailBucket + '/' + thumbnailKey;

  var labels = event[1].labels;

  var doc = {
    TableName : process.env.TABLE_NAME,
    Item : {
      Id : id,
      Original: originalUrl,
      Thumbnail: thumbnailUrl,
      Labels : labels
    }
  };

  var pfunc = (err, data) => {
    if (err) {
      callback(JSON.stringify(err));
    } else {
      callback(null, JSON.stringify(data));
    }
  }

  DYNAMO.putItem(doc, pfunc);
}
