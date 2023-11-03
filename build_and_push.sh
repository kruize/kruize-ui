#!/bin/bash

BUILD_PARAMS="--pull --no-cache"
KRUIZE_UI_DOCKER_REPO="kruize/kruize-ui"
KRUIZE_UI_VERSION="$(grep -m1 '"version"' package.json | tr -d ' ' | cut -d: -f2 | tr -d \" | sed 's/,$//')"

if [ -n "$1" ]; then
	KRUIZE_UI_VERSION=$1
fi
KRUIZE_UI_DOCKER_IMAGE=${KRUIZE_UI_DOCKER_REPO}:${KRUIZE_UI_VERSION}
KRUIZE_UI_DOCKERHUB_IMAGE="docker.io/${KRUIZE_UI_DOCKER_REPO}"
KRUIZE_UI_QUAY_IMAGE="quay.io/${KRUIZE_UI_DOCKER_REPO}"

echo
echo "################################################################################"
echo "Build and Push Kruize-UI image: ${KRUIZE_UI_DOCKER_IMAGE} to DockerHub and Quay"
echo "Make sure you have logged in to the docker repos"
echo "################################################################################"
echo 

git pull
docker build ${BUILD_PARAMS} --format=docker -t ${KRUIZE_UI_DOCKER_IMAGE} -f Dockerfile .

docker tag ${KRUIZE_UI_DOCKER_IMAGE} ${KRUIZE_UI_DOCKERHUB_IMAGE}:${KRUIZE_UI_VERSION}
docker tag ${KRUIZE_UI_DOCKER_IMAGE} ${KRUIZE_UI_DOCKERHUB_IMAGE}:demo
docker tag ${KRUIZE_UI_DOCKER_IMAGE} ${KRUIZE_UI_DOCKERHUB_IMAGE}:latest

docker tag ${KRUIZE_UI_DOCKER_IMAGE} ${KRUIZE_UI_QUAY_IMAGE}:${KRUIZE_UI_VERSION}
docker tag ${KRUIZE_UI_DOCKER_IMAGE} ${KRUIZE_UI_QUAY_IMAGE}:demo
docker tag ${KRUIZE_UI_DOCKER_IMAGE} ${KRUIZE_UI_QUAY_IMAGE}:latest

docker push ${KRUIZE_UI_DOCKERHUB_IMAGE}:${KRUIZE_UI_VERSION}
docker push ${KRUIZE_UI_DOCKERHUB_IMAGE}:demo
docker push ${KRUIZE_UI_DOCKERHUB_IMAGE}:latest

docker push ${KRUIZE_UI_QUAY_IMAGE}:${KRUIZE_UI_VERSION}
docker push ${KRUIZE_UI_QUAY_IMAGE}:demo
docker push ${KRUIZE_UI_QUAY_IMAGE}:latest

docker images | grep -e "TAG" -e "${KRUIZE_UI_DOCKER_REPO}"
