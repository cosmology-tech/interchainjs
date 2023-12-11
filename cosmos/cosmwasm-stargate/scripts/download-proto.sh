 #/usr/bin/env bash

source ../../scripts/download-proto.sh

wasmdFiles=(
    "cosmwasm/wasm/v1/tx.proto"
    )

downloadProto CosmWasm/wasmd@${WASMD_VERSION} ./proto "${wasmdFiles[@]}"