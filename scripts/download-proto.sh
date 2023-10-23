 #/usr/bin/env bash

GIT="https://raw.githubusercontent.com"
GIT_API="https://api.github.com/repos"
NEWLINE=$'\n'

## versions of targets
COSMOS_SDK_VERSION="v0.47.5"
IBC_GO_VERSION="v7.3.0"
WASMD_VERSION="v0.43.0"

## sources of dependencies
cosmosProtoRepo="cosmos/cosmos-proto"
echo "Fetching latest commit: $GIT_API/$cosmosProtoRepo/commits/main"
cosmosProtoCommit=$(curl -s $GIT_API/$cosmosProtoRepo/commits/main | jq -r '.sha')
if [ "$cosmosProtoCommit" = "null" ] ;then
    echo "Failed to fetch $cosmosProtoRepo latest commit, using main/master"
    cosmosProtoCommit="main"
fi

gogoprotoRepo="cosmos/gogoproto"
echo "Fetching latest commit: $GIT_API/$gogoprotoRepo/commits/main"
gogoprotoCommit=$(curl -s $GIT_API/$gogoprotoRepo/commits/main | jq -r '.sha')
if [ "$gogoprotoCommit" = "null" ] ;then
    echo "Failed to fetch $gogoprotoRepo latest commit, using main/master"
    gogoprotoCommit="main"
fi

protobufRepo="protocolbuffers/protobuf"
echo "Fetching latest commit: $GIT_API/$protobufRepo/commits/main"
protobufCommit=$(curl -s $GIT_API/$protobufRepo/commits/main | jq -r '.sha')
if [ "$protobufCommit" = "null" ] ;then
    echo "Failed to fetch $protobufRepo latest commit, using main/master"
    protobufCommit="main"
fi

googleapisRepo="googleapis/googleapis"
echo "Fetching latest commit: $GIT_API/$googleapisRepo/commits/master"
googleapisCommit=$(curl -s $GIT_API/$googleapisRepo/commits/master | jq -r '.sha')
if [ "$googleapisCommit" = "null" ] ;then
    echo "Failed to fetch $googleapisRepo latest commit, using main/master"
    googleapisCommit="master"
fi

ics23Repo="cosmos/ics23"
echo "Fetching latest commit: $GIT_API/$ics23Repo/commits/master"
ics23Commit=$(curl -s $GIT_API/$ics23Repo/commits/master | jq -r '.sha')
if [ "$ics23Commit" = "null" ] ;then
    echo "Failed to fetch $ics23Repo latest commit, using main/master"
    ics23Commit="master"
fi

cosmosSdkRepo="cosmos/cosmos-sdk"
cosmosSdkCommit="${COSMOS_SDK_VERSION}"

ibcRepo="cosmos/ibc-go"
ibcCommit="${IBC_GO_VERSION}"

cosmwasmRepo="CosmWasm/wasmd"
cosmwasmCommit="${WASMD_VERSION}"

downloadDeps() {
    local FILES=("$@")
    deps=""
    for FILE in "${FILES[@]}"; do
        deps="$deps${NEWLINE}$(sed -n 's/^import "\(.*\)";$/\1/p' ${OUT}/${FILE})"
    done
    deps=`echo "$deps" | sort | uniq`

    newDownloaded=()
    while read FILE; do
        if [[ "${FILE}" = "" || "${allDownloaded[@]}" =~ "$FILE" ]]; then
            continue
        fi

        case $(echo "$FILE" | cut -d "/" -f1) in
            "ibc")
            repo=$ibcRepo; commit=$ibcCommit
            GIT_PATH="$repo/$commit/proto/${FILE}"
            ;;
            "cosmwasm")
            repo=$cosmwasmRepo; commit=$cosmwasmCommit
            GIT_PATH="$repo/$commit/proto/${FILE}"
            ;;
            "cosmos_proto") 
            repo=$cosmosProtoRepo; commit=$cosmosProtoCommit
            GIT_PATH="$repo/$commit/proto/${FILE}"
            ;;
            "gogoproto")
            repo=$gogoprotoRepo; commit=$gogoprotoCommit
            GIT_PATH="$repo/$commit/${FILE}"
            ;;
            *)
                case $(echo "$FILE" | cut -d "/" -f1,2 -s) in
                "google/protobuf")
                repo=$protobufRepo; commit=$protobufCommit
                GIT_PATH="$repo/$commit/src/${FILE}"
                ;;
                google/*)
                repo=$googleapisRepo; commit=$googleapisCommit
                GIT_PATH="$repo/$commit/${FILE}"
                ;;
                "cosmos/ics23")
                repo=$ics23Repo; commit=$ics23Commit
                GIT_PATH="$repo/$commit/proto/${FILE}"
                ;;
                cosmos/*|amino/*|tendermint/*) 
                repo=$cosmosSdkRepo; commit=$cosmosSdkCommit
                GIT_PATH="$repo/$commit/proto/${FILE}"
                ;;
                *)
                echo "Failed to get matched repo and commit"
                exit 1
                ;;
            esac
        esac
        
        SRC=${GIT}/${GIT_PATH}
        content=`curl ${SRC} -s`

        if [ "$content" = "404: Not Found" ]; then
            echo "|[${FILE}](${SRC})|$repo|$commit|dependency|404|" >> ${OUT}/README.md
            printf "\n\e[1;31m%s\e[0m\n%-12s \e[1;36m%s\e[0m\n\n" "Failed to get proto [${FILE}]" "" ${SRC}
        else
            echo "|[${FILE}](${SRC})|$repo|$commit|dependency|200|" >> ${OUT}/README.md
            printf "\e[1;33m%-12s\e[0m \e[1;35m%s\e[0m\n%-12s \e[1;36m%s\e[0m\n" [dependency] ${FILE} "" ${SRC}
            mkdir -p `dirname ${OUT}/${FILE}`
            echo "$content" > ${OUT}/${FILE}
            newDownloaded=("${newDownloaded[@]}" "${FILE}")
            allDownloaded=("${allDownloaded[@]}" "${FILE}")
        fi
    done <<< "$deps"

    if [ ${#newDownloaded[@]} -ne 0 ]; then
        downloadDeps "${newDownloaded[@]}"
    fi
}

downloadTargets() {
    if [[ $1 =~ ^(.*)@(.*)$ ]]; then
        REPO=${BASH_REMATCH[1]}
        VERSION=${BASH_REMATCH[2]}
    else 
        echo "Invalid argument $1"
    fi
    local OUT="$2"
    shift 2
    local FILES=("$@")

    printf "\n\e[1;33m%s\e[0m\n\n" "**** Downloading from git repository $REPO@$VERSION to $OUT ****"
    mkdir -p ${OUT}
    echo "## ${REPO}@${VERSION}" >> ${OUT}/README.md
    echo "|file|repo|commit|type|code|" >> ${OUT}/README.md
    echo "|--|--|--|--|--|" >> ${OUT}/README.md

    for FILE in "${FILES[@]}"; do
        SRC=${GIT}/${REPO}/${VERSION}/proto/${FILE}
        printf "\e[1;33m%-12s\e[0m \e[1;35m%s\e[0m\n%-12s \e[1;36m%s\e[0m\n" [target] ${FILE} "" ${SRC}
        echo "|[${FILE}](${SRC})|${REPO}|${VERSION}|target|200|" >> ${OUT}/README.md
        curl ${SRC} -o ${OUT}/${FILE} --create-dirs -s
    done
}

## download both targets and dependencies
downloadProto() {
    local SOURCE="$1"
    local OUT="$2"
    shift 2
    local FILES=("$@")

    ## targets
    downloadTargets $SOURCE $OUT "${FILES[@]}"

    ## local dependencies
    allDownloaded=("${FILES[@]}")
    downloadDeps "${FILES[@]}"

    printf "\nAutodownloaded from github repository, see \`scripts/download-proto.sh\`\n\n" >> ${OUT}/README.md
}