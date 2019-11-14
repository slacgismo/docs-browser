#!/bin/bash

function syntax()
{
    echo "Syntax: $(basename $0) buckets ..."
}

if [ $# -lt 1 ]; then
    syntax > /dev/stderr
    exit 1;
elif [ "$1" == "-h" -o "$1" == "--help" ]; then
    syntax
    exit 0
elif [ ! -d "src" ]; then
    echo "ERROR: $(basename $0) must be run from project root directory" > /dev/stderr
    exit 2
fi

cd src
if [ -z "$(ls)" ]; then
    echo "ERROR: no files to deploy in src" > /dev/stderr
    exit 3
fi
while [ $# -ge 1 ]; do
    for file in $(ls) ; do
        if [ -f "$file" ]; then
            target="s3://$1/$file"
            if [ -z "$(grep ^$file ../deploy.once)" -o -z "$(aws s3 ls $target)" ]; then
                # echo $file
                aws s3 cp "$file" "$target"
                aws s3api put-object-acl --bucket "$1" --key "$file" --acl public-read 
            fi
        fi
    done
    shift 1
done
