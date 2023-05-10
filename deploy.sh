#!/bin/bash
#source getotps.sh


export  CLUSTER_IP=$IP
export AUTOTUNE_PORT=$PORT

echo $CLUSTER_IP
echo $AUTOTUNE_PORT


if [[ -z "$CLUSTER_IP" ]]; then
  source getotps.sh
  echo "in getotps" 
else
  echo "CLUSTERIP is set to $CLUSTERIP"
fi

function start_gui_dev_mode() {
    if command -v npm 
    then
        npm run start:dev
    else
        echo "npm is NOT Installed on your machine."	
    fi
    echo "dev m"
}

function start_gui_prod_mode() {
    if ! command -v npm
    then
        echo "npm is NOT Installed on your machine."	
    else
	 npm run build
        #npm run start
    fi
    echo "prod m"
}

function start_gui_docker_mode() {
    npm run build
    
}

while getopts ":dpc" gopts;
    do
        case ${gopts} in 
        d)  
            # production=0
            start_gui_dev_mode
            echo "d"
            ;;
        p)  
            # production=1
            start_gui_prod_mode
            echo  "p"
            ;;
        c)
            # contanerized mode - docker 
            start_gui_docker_mode
            echo "docker mode"
            ;;
        \?) 
            echo "exit, use p or d options"
            ;;
        esac
    done
