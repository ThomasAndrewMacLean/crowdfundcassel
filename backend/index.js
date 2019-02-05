const ApiBuilder = require('claudia-api-builder'),
  AWS = require('aws-sdk');
AWS.config.update({ region: 'eu-west-1' });
var api = new ApiBuilder(),
  dynamoDb = new AWS.DynamoDB.DocumentClient();

api.post(
  '/funds',
  function(request) {
    var params = {
      TableName: 'crowdfundcassel',
      Item: {
        fundid: request.body.fundid,
        name: request.body.name,
        amount: request.body.amount,
        message: request.body.message,
      },
    };
    return dynamoDb.put(params).promise();
  },
  { success: 201 }
);

api.get('/funds', function(request) {
  return dynamoDb
    .scan({ TableName: 'crowdfundcassel' })
    .promise()
    .then(response => response.Items);
});

module.exports = api;
