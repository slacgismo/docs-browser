#!/bin/bash

function syntax()
{
    echo "Syntax: $(basename $0) [-f|--force] src [localhost|buckets ...]"
}

if [ $# -lt 1 ]; then
    syntax > /dev/stderr
    exit 1;
elif [ "$1" == "-h" -o "$1" == "--help" -o "$1" == "help" ]; then
    syntax
    exit 0
elif [ "$1" == "-f" -o "$1" == "--force" ]; then
    FORCE=yes
    shift 1
fi

if [ ! -d "$1" ]; then
    echo "ERROR: $(basename $0) folder '$1' not found" > /dev/stderr
    exit 2
fi

cd $1
if [ "$2" == "localhost" ]; then
    python3 -m http.server 1>http-server.log &
    open http://localhost:8000/index.html
else
    if [ -z "$(ls)" ]; then
        echo "ERROR: no files to deploy in $1" > /dev/stderr
        exit 3
    fi
    shift 1
    while [ $# -ge 1 ]; do
        for file in $(ls) ; do
            if [ -f "$file" -a -z "$(grep ^$file .deploy-ignore 2>/dev/null)" ]; then
                target="s3://$1/$file"
                if [ "${FORCE:-no}" == "yes" -o -z "$(grep ^$file .deploy-once)" -o -z "$(aws s3 ls $1/$file)" ]; then
                    # echo $file
                    aws s3 cp "$file" "$target"
                    aws s3api put-object-acl --bucket "$1" --key "$file" --acl public-read
                else
                    echo "skipped: ./$file to $target"
                fi
            fi
        done
        shift 1
    done
fi