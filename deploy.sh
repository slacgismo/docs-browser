#!/bin/bash

function syntax()
{
    echo "Syntax: $(basename $0) src [localhost|buckets] ..."
}

if [ $# -lt 1 ]; then
    syntax > /dev/stderr
    exit 1;
elif [ "$1" == "-h" -o "$1" == "--help" -o "$1" == "help" ]; then
    syntax
    exit 0
elif [ ! -d "$1" ]; then
    echo "ERROR: $(basename $0) folder '$1' not found" > /dev/stderr
    exit 2
fi

if [ "$2" == "localhost" ]; then
    cd $1
    python3 -m http.server 1>http-server.log 2>&1 &
    open http://localhost:8000/index.html
else
    cd $1
    if [ -z "$(ls)" ]; then
        echo "ERROR: no files to deploy in $1" > /dev/stderr
        exit 3
    fi
    shift 1
    while [ $# -ge 1 ]; do
        for file in $(ls) ; do
            if [ -f "$file" ]; then
                target="s3://$1/$file"
                if [ -z "$(grep ^$file .deploy-once)" -o -z "$(aws s3 ls $target)" ]; then
                    # echo $file
                    aws s3 cp "$file" "$target"
                    aws s3api put-object-acl --bucket "$1" --key "$file" --acl public-read 
                fi
            fi
        done
        shift 1
    done
fi