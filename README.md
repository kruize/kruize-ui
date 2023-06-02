# kruize-ui

This repository contains the code for Kruize Autotune user interface. The objective behind creating the UI is to enable newbies to explore and contribute to Autotune and simplify the initial steps of starting an Autotune experiment. The UI significantly reduces the burden on user to understand, operate and work with Autotune. Not only this it also helps better explain and present what remarkable optimizations Autotune can bring to site reliability engineering.

## Quick Start

### Clone Repository

```
git clone git@github.com:kruize/kruize-ui.git
```

### Go to the kruize folder

```
cd kruize-ui
```

### Switch to mvp_demo branch

```
git fetch origin
git checkout -b mvp_demo origin/mvp_demo
```

### Install Node Package Manager

```
npm install
```

### Run the UI

To run the kruize ui you can select any of the 2 options :

1. Native way<br />
   If you are starting the UI for the very first time, it is suggested to
   Latest Node.js source code can be downloaded from [here](https://nodejs.org/en/download/).
   To run the Kruize-ui: clone the repository and then execute the following command to run the launch script in production mode.<br />

```
./deploy.sh -p
```

And to launch in development mode use

```
./deploy.sh -d
```

<br />

2. Containerized way<br />

We make use of nginx as a default react server for the UI.
Create the image using the following command<br />

```
 docker build -t ui-demo .

```

Run the application using the following command

```
docker run --rm -it -p 8080:8080 ui-demo
```

here ui-demo is the image name.<br />
Use http://localhost:8080/ to view the UI in Browser.

## Code Origin

This repository uses the patternfly-react-seed base code as copied from [Patternfly Seed](https://github.com/patternfly/patternfly-react-seed).
