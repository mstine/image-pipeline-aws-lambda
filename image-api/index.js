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

  var id = null;

  if (event.pathParameters) {
    id = event.pathParameters.id;
  }

  if (id) {
    var params = {
      TableName : process.env.TABLE_NAME,
      Key : { Id : id}
    };
    DYNAMO.getItem(params, done);
  } else {
    console.log('Performing table scan...')
    DYNAMO.scan({ TableName : process.env.TABLE_NAME}, done);
  }

}
