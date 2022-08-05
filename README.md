# kruize-ui
This repository contains the code for Kruize Autotune user interface. The objective behind creating the UI is to enable newbies to explore and contribute to Autotune and simplify the initial steps of starting an Autotune experiment. The UI significantly reduces the burden on user to understand, operate and work with Autotune. Not only this it also helps better explain and present what remarkable optimizations Autotune can bring to site reliability engineering.

## Quick Start
To run the kruize ui you can select any of the 2 options :

1. Native way<br />
Latest Node.js source code can be downloaded from [here](https://nodejs.org/en/download/).
To run the Kruize-ui: clone the repository and then execute the following command to run the launch script.<br />
```
source deploy.sh
```
<br />

2. Containerized way<br />
Create the image using the following command<br />

```
docker build -t sample-kruize-ui -f Dockerfile .
```
Run the application using the following command

```
docker run --rm -it -p 9000:3000 sample-kruize-ui
```
Use http://localhost:9000/ to view the UI in Browser.

## Code Origin
This repository uses the patternfly-react-seed base code as copied from [Patternfly Seed](https://github.com/patternfly/patternfly-react-seed).
