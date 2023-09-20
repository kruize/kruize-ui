# Kruize-UI

This repository contains the code for Kruize user interface. The objective behind creating the UI is to enable users to explore and contribute to Kruize. The UI significantly reduces the burden on user to understand, operate and work with Kruize. Not only this it also helps better represent the remarkable optimizations Kruize can bring to your optimization usecases.

This application is built using [Patternfly and React](https://www.patternfly.org/v4/get-started/developers)

## Before You Start

Kruize UI needs Kruize server running locally. You can setup Kruize [from here](https://github.com/kruize/kruize-demos/tree/main/remote_monitoring_demo). 

Also, make sure you have [`Node.js`](https://nodejs.org/en/) and [`npm`](https://www.npmjs.com/) installed. Check the currently maintained versions at https://nodejs.org/en/about/releases/.

## Quick Start

```
git clone git@github.com:kruize/kruize-ui.git
cd kruize-ui
npm install
export CLUSTER_IP=$(minikube ip) 
export KRUIZE_PORT=$(kubectl -n monitoring  get svc kruize --no-headers -o=custom-columns=PORT:.spec.ports[*].nodePort 2>/dev/null)
npm run start:dev
```

## Code Origin

This repository uses the patternfly-react-seed base code as taken from [Patternfly Seed](https://github.com/patternfly/patternfly-react-seed).
