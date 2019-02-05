# crowdfundcassel

create the table:

aws dynamodb create-table --table-name crowdfundcassel \
  --attribute-definitions AttributeName=fundid,AttributeType=S \
  --key-schema AttributeName=fundid,KeyType=HASH \
  --provisioned-throughput ReadCapacityUnits=1,WriteCapacityUnits=1 \
  --region eu-west-1 \
  --query TableDescription.TableArn --output text