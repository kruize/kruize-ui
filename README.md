# Kruize-UI

This repository contains the code for Kruize user interface. The objective behind creating the UI is to enable users to explore and contribute to Kruize. The UI significantly reduces the burden on user to understand, operate and work with Kruize. Not only this it also helps better represent the remarkable optimizations Kruize can bring to your optimization usecases.

This application is built using [Patternfly and React](https://www.patternfly.org/v4/get-started/developers)

## Prerequisites

1. **Kruize Server**  
   The Kruize UI requires a running instance of the Kruize server. You can set up Kruize using [Kruize Demos](https://github.com/kruize/kruize-demos/tree/main/monitoring/local_monitoring). The setup will also provide you with a link to access the UI.

2. **Node.js and npm**  
   Make sure you have the latest stable versions of [`Node.js`](https://nodejs.org/en/) and [`npm`](https://www.npmjs.com/) installed. Check supported versions [here](https://nodejs.org/en/about/releases/).


## Quick Start

For development purposes we prefer running ui locally on minikube or kind as it helps in debugging the ui code.
> **Note**: The main development branch is `mvp_demo`. Please raise your pull requests to this branch.

1. Clone the repository:

   ```
   git clone git@github.com:kruize/kruize-ui.git
   cd kruize-ui 
   ```
2. Install dependencies:

    ```
    npm install
    ```
3. Set the cluster IP:
    - For minikube
    ```
    export CLUSTER_IP=$(minikube ip)
    ```
    - For KIND
    ```
    export CLUSTER_IP=$(docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' kind-control-plane)
    ```
4. Export the Kruize port:

    ```
    export KRUIZE_PORT=$(kubectl -n monitoring  get svc kruize --no-headers -o=custom-columns=PORT:.spec.ports[*].nodePort 2>/dev/null)
    ```
5. Start the development server:

    ```
    npm run start:dev
    ```


## Code Origin

This repository uses the patternfly-react-seed base code as taken from [Patternfly Seed](https://github.com/patternfly/patternfly-react-seed).
