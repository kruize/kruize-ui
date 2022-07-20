export function get_ip() {
    if (process.env.CLUSTERIP) {
      const ip = process.env["CLUSTERIP"];
      console.log("MINIKUBE IP is " + process.env["CLUSTERIP"]);
      return ip;
    } else {
      console.log("No set!");
      return "";
    }
  }
  export function get_port() {
    if (process.env.AUTOTUNEPORT) {
      const port = process.env["AUTOTUNEPORT"];
      console.log("autotun is on! " + process.env["AUTOTUNEPORT"]);
      return port;
    } else {
      console.log("No set!");
      return "";
    }
  }
  