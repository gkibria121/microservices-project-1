#!/bin/sh


if [ -d "$1" ]; then

echo "building $1"
    cd $1 && docker build -t gkibria121/$1 -f ../dockerfiles/Dockerfile  .

else
    echo "Error: Directory $1 does not exist."

fi
