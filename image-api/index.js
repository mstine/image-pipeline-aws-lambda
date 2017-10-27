'use strict';

const AWS = require('aws-sdk');
const DOC = require('dynamodb-doc');
const DYNAMO = new DOC.DynamoDB();

exports.handler = function(event, context, callback) {

  const done = (err, res) => callback(null, {
        statusCode: err ? '400' : '200',
        body: err ? err.message : JSON.stringify(res),
        headers: {
            'Content-Type': 'application/json',
        },
    });

  var id = event.pathParameters.id;

  if (id) {
    var params = {
      TableName : "ImagesProcessed",
      Key : { Id : id}
    };
    DYNAMO.getItem(params, done);
  } else {
    DYNAMO.scan({ TableName : "ImagesProcessed"}, done);
  }

}
