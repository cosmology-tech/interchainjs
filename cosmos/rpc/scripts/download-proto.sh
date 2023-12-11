 #/usr/bin/env bash

source ../../scripts/download-proto.sh

cosmosSdkFiles=(
    "cosmos/tx/v1beta1/service.proto"
    "cosmos/auth/v1beta1/query.proto"
    "cosmos/bank/v1beta1/query.proto"
    "cosmos/staking/v1beta1/query.proto"
    "cosmos/gov/v1beta1/query.proto"
    "cosmos/vesting/v1beta1/vesting.proto"
    )

wasmdFiles=(
    "cosmwasm/wasm/v1/query.proto"
)

downloadProto cosmos/cosmos-sdk@"${COSMOS_SDK_VERSION}" ./proto "${cosmosSdkFiles[@]}"
downloadProto CosmWasm/wasmd@${WASMD_VERSION} ./proto "${wasmdFiles[@]}"