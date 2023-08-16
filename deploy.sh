#!/bin/bash

export KRUIZE_UI_IMAGE="quay.io/kruize/kruize-ui:0.0.1"
KRUIZE_UI_MANIFEST_FILE="kruize-ui-nginx-setup.yaml"
MANIFEST_TEMPLATE="./manifests/templates/kruize-ui-nginx-setup-template.yaml"

launch_to_kube_with_image=false
is_image_set=false
image_name=""

POD_NAME="kruize-ui-nginx-pod"
SERVICE_NAME="kruize-ui-nginx-service"
NAMESPACE="monitoring"

function start_gui_dev_mode() {
    if ! command -v npm
    then
        echo "npm is NOT Installed on your machine."	
    else
    source getotps.sh
	 npm run build
     npm run start:dev
    fi
}

function start_gui_docker_mode() {
    npm run build
}

# Check the status of a pod
function check_pod_status() {
    local status=$(kubectl get pods -n "$NAMESPACE" "$POD_NAME" -o jsonpath='{.status.phase}')

    if [[ "${status}" == "Running" ]]; then
        echo "Pod ${POD_NAME} is running."
    else
        echo "Pod ${POD_NAME} is not running. Status: ${status}. Exiting"
        exit 1
    fi
}

function launch_gui_kube_mode() {
    if [ -f "./manifests/dynamic/kruize-ui-nginx-setup.yaml" ]; then
        # Remove existing deployments
        kubectl delete -f ./manifests/dynamic/
    fi

    if ${is_image_set}; then
        unset KRUIZE_UI_IMAGE
        export KRUIZE_UI_IMAGE="${image_name}"
    fi

    export KRUIZE_UI_NAMESPACE="${NAMESPACE}"

    envsubst < ./manifests/templates/kruize-ui-nginx-setup-template.yaml > "./manifests/dynamic/${KRUIZE_UI_MANIFEST_FILE}"

    echo ${manifest_file_content}

    # Re-Launch the UI deployment
    kubectl apply -f ./manifests/dynamic/

    # Sleep for 10 secs for UI to come up
    echo -n "Waiting for 10 secs for UI pod to start "
    for ((i = 0; i < 10; i++)); do
        echo -n "."
        sleep 1
    done

    echo " Done."
    echo "Checking pod status"
    check_pod_status

    port=$(kubectl -n ${NAMESPACE} get services | grep "${SERVICE_NAME}" | awk '{print $5}' | cut -d':' -f2 | cut -d'/' -f1)

    echo "Kruize UI is running on port: ${port}"
}



while getopts ":dcki:e:" gopts;
    do
        case ${gopts} in 
        d)  
            start_gui_dev_mode
            echo  "development mode"
            ;;
        c)
            start_gui_docker_mode
            echo "docker mode"
            ;;
        k)
            launch_to_kube_with_image=true
            echo "Launching to Kubernetes"
            ;;
        i)
            is_image_set=true
            image_name="${OPTARG}"
            ;;
        e)
            case "${OPTARG}" in
                minikube)
                    NAMESPACE="monitoring"
                    ;;
                openshift)
                    NAMESPACE="openshift-tuning"
                    ;;
                *)
                    echo "Invalid value for option -e. Use 'minikube' or 'openshift'."
                    exit 1
                    ;;
            esac
            ;;
        \?) 
            echo "exit, use d, c, or k (with i for passing image) options"
            ;;
        esac
    done

if ${launch_to_kube_with_image}; then
    launch_gui_kube_mode
fi