#!/bin/sh

# Check if the directory exists
if [ -d "$1" ]; then
    echo "Building $1"
    cd "$1" && docker build -t gkibria121/"$1" -f ../dockerfiles/Dockerfile .

    # Check if --push flag is provided
    if [ "$2" = "--push" ]; then
        echo "Pushing gkibria121/$1 to Docker Hub..."
        docker push gkibria121/"$1"
    fi
else
    echo "Error: Directory $1 does not exist."
fi
