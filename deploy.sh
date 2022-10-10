#!/bin/bash
source getotps.sh
function start_gui_dev_mode() {
    if rpm -qa | grep npm 
    then
        npm run start:dev
    else
        echo "npm is NOT Installed on your machine."	
    fi
    echo "dev m"
}

function start_gui_prod_mode() {
    if ! rpm -qa | grep npm
    then
        echo "npm is NOT Installed on your machine."	
    else
	    npm run build
        npm run start
    fi
    echo "prod m"
}

while getopts ":dp" gopts;
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
        \?) 
            echo "exit, use p or d options"
            ;;
        esac
    done
