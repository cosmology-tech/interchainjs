 #/usr/bin/env bash

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

downloadProto cosmos/cosmos-sdk@${COSMOS_SDK_VERSION} ./proto "${cosmosSdkFiles[@]}"
downloadProto cosmos/ibc-go@${IBC_GO_VERSION} ./proto "${ibcGoFiles[@]}"