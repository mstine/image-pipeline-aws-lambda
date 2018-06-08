#!/usr/bin/env bash

# override this default with -b or --s3-bucket
S3_BUCKET=stine-lambda-staging

## Parse Args ##
POSITIONAL=()
while [[ $# -gt 0 ]]; do
    case $1 in
        -b|--s3-bucket) S3_BUCKET="$2"; shift; shift;;
        *) shift ;;
    esac
done
set -- "${POSITIONAL[@]}"
## done parsing args

aws cloudformation package --template-file ./sam-template.yml --s3-bucket "$S3_BUCKET" --output-template-file packaged-sam-template.yml

aws cloudformation deploy --template-file ./packaged-sam-template.yml --stack-name my-sam-stack --capabilities CAPABILITY_IAM
