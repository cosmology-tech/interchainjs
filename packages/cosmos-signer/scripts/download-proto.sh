#!/bin/bash

source ../../scripts/download-proto.sh

cosmosSdkFiles=(
    "cosmos/authz/v1beta1/tx.proto"
    "cosmos/bank/v1beta1/tx.proto"
    "cosmos/distribution/v1beta1/tx.proto"
    "cosmos/feegrant/v1beta1/tx.proto"
    "cosmos/gov/v1beta1/tx.proto"
    "cosmos/gov/v1/tx.proto"
    "cosmos/group/v1/tx.proto"
    "cosmos/staking/v1beta1/tx.proto"
    "cosmos/vesting/v1beta1/tx.proto"
    )

ibcGoFiles=(
    "ibc/applications/transfer/v1/tx.proto"
    "ibc/core/channel/v1/tx.proto"
    "ibc/core/client/v1/tx.proto"
    "ibc/core/connection/v1/tx.proto"
    )

wasmdFiles=(
    "cosmwasm/wasm/v1/tx.proto"
    )

download-proto cosmos/cosmos-sdk@v0.47.5 ./proto/cosmos-sdk "${cosmosSdkFiles[@]}"
download-proto cosmos/ibc-go@v7.3.0 ./proto/ibc-go "${ibcGoFiles[@]}"
download-proto CosmWasm/wasmd@v0.43.0 ./proto/wasmd "${wasmdFiles[@]}"