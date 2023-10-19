 #/usr/bin/env bash

source ../../scripts/download-proto.sh

cosmosSdkFiles=(
    "cosmos/auth/v1beta1/query.proto"
    "cosmos/auth/v1beta1/auth.proto"
    "cosmos/vesting/v1beta1/vesting.proto"
    "cosmos/tx/v1beta1/service.proto"
    "cosmos/tx/v1beta1/tx.proto"
    "cosmos/crypto/ed25519/keys.proto"
    "cosmos/crypto/secp256k1/keys.proto"
    "cosmos/crypto/secp256r1/keys.proto"
    )

downloadProto cosmos/cosmos-sdk@"${COSMOS_SDK_VERSION}" ./proto "${cosmosSdkFiles[@]}"