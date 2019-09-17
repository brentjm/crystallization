#!/bin/bash

################################################################################
# Script name: docker_teardown.sh
# Description: Removes all created docker containers, images, volumes and networks
# Args: None
# Author: Brent Maranzno
# email: brent_maranzano@gmail.com

# Usage:
# ./docker_teardown.sh
################################################################################

PRE="template-app_"
NAME="app"

function remove_containers () {
    echo "Stop and remove all containers"
    for CONTAINER in 'mosquitto' 'node-red' 'grafana' 'postgres' 'influxdb'
    do
        docker stop ${CONTAINER}
        docker rm ${CONTAINER}
    done
}

function remove_images () {
    echo "Removing images"
    for IMAGE in 'mosquitto-custom' 'node-red-custom' 'grafana-custom' 'postgres-custom' 'influxdb-custom'
    do
        docker image rm "$IMAGE"
    done
}

function remove_volumes () {
    echo "Delete volumes"
    for VOLUME in 'mosquitto_log' 'mosquitto_data' 'node-red-data' 'grafana-data' 'postgres-data' 'influxdb-data'
    do
        FULL_VOLUME="$PRE$VOLUME"
        docker volume rm ${FULL_VOLUME}
    done
}

function remove_network () {
    docker network rm "$PRE$NAME"
}


remove_containers
remove_images
remove_volumes
remove_network
