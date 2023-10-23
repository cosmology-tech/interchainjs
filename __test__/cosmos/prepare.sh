 #/usr/bin/env bash

rm -rf ./proto
rm -rf ./codegen

## Step1: download proto

source ../../scripts/download-proto.sh

cosmosSdkFiles=(
    "cosmos/bank/v1beta1/tx.proto"
    )

downloadProto cosmos/cosmos-sdk@"${COSMOS_SDK_VERSION}" ./proto "${cosmosSdkFiles[@]}"

## Step2: codegen
npx telescope transpile --config .telescope.json