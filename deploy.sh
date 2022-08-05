#!/bin/bash

function start_gui() {
if rpm -qa | grep npm
then
	npm run start:dev
else
	echo "npm is NOT Installed on your machine."	
fi
}
function check_cluster() {
    cluster_type=$(kubectl config current-context | grep "minikube")
    cluster_info=$(kubectl -n openshift cluster-info | grep -q "running")

    if [ "${cluster_type}" == "minikube" ]; then
        echo "Connected to minikube cluster" ;
        call_cmds "minikube"
    
    
    elif [ "$cluster_info" == "running" ]; then 
        echo "Connected to openshift cluster" ;
        call_cmds "openshift"
    else 
        echo "NO cluster connected"
    fi
}

function call_cmds() {
    CLUSTER=$1
    
    get_ip $CLUSTER
    get_port $CLUSTER
    get_url $CLUSTER_IP $AUTOTUNE_PORT
    display_url_output $url
    export  CLUSTER_IP=$CLUSTER_IP
    export AUTOTUNE_PORT=$AUTOTUNE_PORT  
    start_gui
}

function get_ip() {
    CLUSTER=$1
    if [ "${CLUSTER}" == "minikube" ]; then
        CLUSTER_IP=$( ${CLUSTER} ip)
    elif [ "${CLUSTER}" == "openshift" ]; then
        CLUSTER_IP=$(kubectl -n openshift-tuning get pods -l=app=autotune -o wide -n openshift-tuning -o=custom-columns=NODE:.spec.nodeName --no-headers)
    fi
    echo $CLUSTER_IP
}

function get_port() {
    CLUSTER=$1
    if [ "${CLUSTER}" == "minikube" ]; then
        kubectl_cmd="kubectl -n monitoring"
    elif [ "${CLUSTER}" == "openshift" ]; then
        kubectl_cmd="kubectl -n openshift-tuning"
    fi
    AUTOTUNE_PORT=$(${kubectl_cmd} get svc autotune --no-headers -o=custom-columns=PORT:.spec.ports[*].nodePort)  
    echo $AUTOTUNE_PORT
}

function get_url() {
    CLUSTER_IP=$1
    AUTOTUNE_PORT=$2
    url=http://${CLUSTER_IP}:${AUTOTUNE_PORT}/listAutotuneTunables
    echo "Info: Access Autotune tunables at $url"
}

function display_url_output() {
    url=$1
    
    if (curl ${url}) then
        echo "Autotune is up and running"
    else 
        echo "Error: Autotune not running"
    fi
    echo $url
}

check_cluster
