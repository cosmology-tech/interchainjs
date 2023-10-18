#!/bin/bash

GIT="https://raw.githubusercontent.com"
NEWLINE=$'\n'

download-local-deps() {
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
        content=`curl ${GIT}/${REPO}/${VERSION}/proto/${FILE} -s`
        if [ "$content" != "404: Not Found" ]; then
            echo "[dependency:local] ${GIT}/${REPO}/${VERSION}/proto/${FILE}"
            mkdir -p `dirname ${OUT}/${FILE}`
            echo "$content" > ${OUT}/${FILE}
            newDownloaded=("${newDownloaded[@]}" "${FILE}")
            allDownloaded=("${allDownloaded[@]}" "${FILE}")
        fi
    done <<< "$deps"

    if [ ${#newDownloaded[@]} -ne 0 ]; then
        download-local-deps "${newDownloaded[@]}"
    fi
}

download-proto() {
    if [[ $1 =~ ^(.*)@(.*)$ ]]; then
        REPO=${BASH_REMATCH[1]}
        VERSION=${BASH_REMATCH[2]}
    else 
        echo "Invalid argument $1"
    fi
    local OUT="$2"
    shift 2
    local FILES=("buf.lock" "$@")

    echo "**** Downloading from git repository $REPO@$VERSION to $OUT ****"

    ## targets
    for FILE in "${FILES[@]}"; do
        echo "[target] ${GIT}/${REPO}/${VERSION}/proto/${FILE}"
        curl ${GIT}/${REPO}/${VERSION}/proto/${FILE} -o ${OUT}/${FILE} --create-dirs -s
    done

    ## remote dependencies
    while read -r; do
        if [[ $REPLY =~ ^[[:space:]]*-[[:space:]]remote:[[:space:]](.*)$ ]]; then
            remote=${BASH_REMATCH[1]}
        elif [[ $REPLY =~ ^[[:space:]]*[[:space:]]owner:[[:space:]](.*)$ ]]; then
            owner=${BASH_REMATCH[1]}
        elif [[ $REPLY =~ ^[[:space:]]*[[:space:]]repository:[[:space:]](.*)$ ]]; then
            repository=${BASH_REMATCH[1]}
        elif [[ $REPLY =~ ^[[:space:]]*[[:space:]]commit:[[:space:]](.*)$ ]]; then
            commit=${BASH_REMATCH[1]}
            echo "[dependency:remote] $remote/$owner/$repository:$commit"
            result=`buf export $remote/$owner/$repository:$commit --output ${OUT}`
            if [ "$result" = "Failure: the server hosted at that remote is unavailable." ]; then
                echo "$result"
                exit 1
            fi;
        fi;
    done < ${OUT}/buf.lock

    ## local dependencies
    deps=""
    for FILE in "${FILES[@]}"; do
        deps="$deps${NEWLINE}$(sed -n 's/^import "\(.*\)";$/\1/p' ${OUT}/${FILE})"
    done
    deps=`echo "$deps" | sort | uniq`

    echo "$deps" | while read FILE; do
        if [[ "${FILE}" = "" || "${FILES[@]}" =~ "$FILE" ]]; then
            continue
        fi
        content=`curl ${GIT}/${REPO}/${VERSION}/proto/${FILE} -s`
        if [ "$content" != "404: Not Found" ]; then
            echo "[dependency:local] ${GIT}/${REPO}/${VERSION}/proto/${FILE}"
            mkdir -p `dirname ${OUT}/${FILE}`
            echo "$content" > ${OUT}/${FILE}
        fi
    done

    allDownloaded=("${FILES[@]}")
    download-local-deps "${FILES[@]}"

    echo "Autodownloaded from github repository ${REPO}@${VERSION}, see scripts/download-proto.sh" > ${OUT}/README.md
}