 #/usr/bin/env bash

GIT="https://raw.githubusercontent.com"
NEWLINE=$'\n'

COSMOS_SDK_VERSION="v0.47.5"
IBC_GO_VERSION="v7.3.0"
WASMD_VERSION="v0.43.0"

downloadLocalDeps() {
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
            "cosmos_proto")
            repo="cosmos/cosmos-proto"
            commit=$(curl -s https://api.github.com/repos/$repo/commits/main | jq -r '.sha')
            GIT_PATH="$repo/$commit/proto/${FILE}"
            ;;
            "gogoproto")
            repo="cosmos/gogoproto"
            commit=$(curl -s https://api.github.com/repos/$repo/commits/main | jq -r '.sha')
            GIT_PATH="$repo/$commit/${FILE}"
            ;;
        esac

        case $(echo "$FILE" | cut -d "/" -f1,2 -s) in
            "google/protobuf")
            repo="protocolbuffers/protobuf"
            commit=$(curl -s https://api.github.com/repos/$repo/commits/main | jq -r '.sha')
            GIT_PATH="$repo/$commit/src/${FILE}"
            ;;
            google/*)
            repo="googleapis/googleapis"
            commit=$(curl -s https://api.github.com/repos/$repo/commits/master | jq -r '.sha')
            GIT_PATH="$repo/$commit/${FILE}"
            ;;
            "cosmos/ics23")
            repo="cosmos/ics23"
            commit=$(curl -s https://api.github.com/repos/$repo/commits/master | jq -r '.sha')
            GIT_PATH="$repo/$commit/proto/${FILE}"
            ;;
            cosmos/*|amino/*|tendermint/*)
            repo="cosmos/cosmos-sdk"
            commit="${COSMOS_SDK_VERSION}"
            GIT_PATH="$repo/$commit/proto/${FILE}"
            ;;
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
        downloadLocalDeps "${newDownloaded[@]}"
    fi
}

downloadProto() {
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

    ## targets
    for FILE in "${FILES[@]}"; do
        SRC=${GIT}/${REPO}/${VERSION}/proto/${FILE}
        printf "\e[1;33m%-12s\e[0m \e[1;35m%s\e[0m\n%-12s \e[1;36m%s\e[0m\n" [target] ${FILE} "" ${SRC}
        echo "|[${FILE}](${SRC})|${REPO}|${VERSION}|target|200|" >> ${OUT}/README.md
        curl ${SRC} -o ${OUT}/${FILE} --create-dirs -s
    done

    ## local dependencies
    allDownloaded=("${FILES[@]}")
    downloadLocalDeps "${FILES[@]}"

    printf "\nAutodownloaded from github repository, see \`scripts/download-proto.sh\`\n\n" >> ${OUT}/README.md
}