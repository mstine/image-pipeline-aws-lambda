#!/usr/bin/env bash
aws cloudformation package --template-file ./sam-template.yml --s3-bucket stine-lambda-staging --output-template-file packaged-sam-template.yml

aws cloudformation deploy --template-file ./packaged-sam-template.yml --stack-name my-sam-stack --capabilities CAPABILITY_IAM
