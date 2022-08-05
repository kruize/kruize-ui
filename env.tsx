export function get_ip() {
    if (process.env.CLUSTER_IP) {
      const ip = process.env["CLUSTER_IP"];
      console.debug("MINIKUBE IP is " + process.env["CLUSTER_IP"]);
      return ip;
    } else {
      console.debug("No set!");
      return null;
    }
  }
  export function get_port() {
    if (process.env.AUTOTUNE_PORT) {
      const port = process.env["AUTOTUNE_PORT"];
      console.debug("autotun is on! " + process.env["AUTOTUNE_PORT"]);
      return port;
    } else {
      console.debug("No set!");
      return null;
    }
  }
