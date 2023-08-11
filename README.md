# Kruize-UI

This repository contains the code for Kruize user interface. The objective behind creating the UI is to enable users to explore and contribute to Kruize. The UI significantly reduces the burden on user to understand, operate and work with Kruize. Not only this it also helps better represent the remarkable optimizations Kruize can bring to your optimization usecases.

This application is built using [Patternfly and React](https://www.patternfly.org/v4/get-started/developers)

## Before You Start

Kruize UI needs Kruize server running locally in the remote monitoring mode. You can setup Kruize [from here](https://github.com/kruize/kruize-demos/tree/main/remote_monitoring_demo). 

Additionally Kruize UI can directly be accessed once remote monitoring demo is setup.

In case you want to run UI locally you would need the Cluster IP and Kruize Port number. Make use of the following commands:
1. Cluster IP : In case of a minikube cluster 
```
minikube ip
```
2. Kruize Port Number :  
``` 
kubectl -n monitoring  get svc kruize --no-headers -o=custom-columns=PORT:.spec.ports[*].nodePort 2>/dev/null
```

Also, make sure you have [`Node.js`](https://nodejs.org/en/) and [`npm`](https://www.npmjs.com/) installed. Check the currently maintained versions at https://nodejs.org/en/about/releases/.

## Quick Start

```
git clone git@github.com:kruize/kruize-ui.git
cd kruize-ui
npm install
export CLUSTER_IP=<Cluster IP> && export KRUIZE_PORT=<Kruize Port Number>
npm run start:dev
```

## Code Origin

This repository uses the patternfly-react-seed base code as taken from [Patternfly Seed](https://github.com/patternfly/patternfly-react-seed).
