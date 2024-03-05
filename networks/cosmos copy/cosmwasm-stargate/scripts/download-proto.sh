 #/usr/bin/env bash

source ../../scripts/download-proto.sh

wasmdFiles=(
    "cosmwasm/wasm/v1/tx.proto"
    "cosmwasm/wasm/v1/query.proto"
    )

downloadProto CosmWasm/wasmd@${WASMD_VERSION} ./proto "${wasmdFiles[@]}"