 #/usr/bin/env bash

source ../../scripts/download-proto.sh

cosmosSdkFiles=(
    "cosmos/crypto/secp256k1/keys.proto"
    )

downloadProto cosmos/cosmos-sdk@"${COSMOS_SDK_VERSION}" ./proto "${cosmosSdkFiles[@]}"
