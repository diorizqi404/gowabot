const Docker = require("dockerode");
const unix_socket = process.env.DOCKER_UNIX_SOCKET || "/var/run/docker.sock";

let docker;
if (process.env.DOCKER_HOST && process.env.DOCKER_HOST_PORT) {
  docker = new Docker({ host: process.env.DOCKER_HOST, port: process.env.DOCKER_HOST_PORT });
} else {
  docker = new Docker({ socketPath: unix_socket });
}

async function listContainers() {
  try {
    const containers = await docker.listContainers();

    if (containers.length === 0) return "No containers found.";

    return containers
      .map((c) => `${c.Names[0].replace(/^\//, "")} - ${c.Image} - ${c.Ports[0].PublicPort}:${c.Ports[0].PrivatePort} (${c.State})`)
      .join("\n");
  } catch (err) {
    return `Error listing containers: ${err}`;
  }
}

module.exports = { listContainers }