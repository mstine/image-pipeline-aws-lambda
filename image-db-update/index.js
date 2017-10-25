'use strict';

const AWS = require('aws-sdk');
const DOC = require('dynamodb-doc');
const DYNAMO = new DOC.DynamoDB();

exports.handler = function(event, context, callback) {
  var id = event[0].id;
  var bucket = event[0].bucket;
  var key = event[0].key;
  var labels = event[1].labels;

  var doc = {
    TableName : "ImagesProcessed",
    Item : {
      Id : id,
      Bucket : bucket,
      Key : key,
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
