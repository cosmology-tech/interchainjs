 #/usr/bin/env bash

source ../../scripts/download-proto.sh

cosmosSdkFiles=(
    "cosmos/auth/v1beta1/query.proto"
    "cosmos/tx/v1beta1/service.proto"
    "cosmos/vesting/v1beta1/vesting.proto"
    )

downloadProto cosmos/cosmos-sdk@"${COSMOS_SDK_VERSION}" ./proto "${cosmosSdkFiles[@]}"