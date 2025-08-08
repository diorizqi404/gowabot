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

async function getContainer(id) {
  try {
    const container = await docker.getContainer(id).inspect()
    return JSON.stringify(container, null, 2);
  } catch (err) {
    return `Error getting container: ${err}`;
  }
}

async function listImages() {
  try {
    const images = await docker.listImages()

    if (images.length === 0) return "No images found.";

    return images.map((img) => {
      const sizeMB = (img.Size / (1024 * 1024)).toFixed(2);
      return `${img.RepoTags[0]} - ${sizeMB} MB`;
    }).join("\n");
  } catch (err) {
    return `Error listing images: ${err}`;
  }
}

async function listVolumes() {
  try {
    const { Volumes } = await docker.listVolumes();

    if (!Volumes || Volumes.length === 0) return "No volumes found.";

    return Volumes.map((v) => `${v.Name} - ${v.Driver} - ${v.Mountpoint}`).join("\n");
  } catch (err) {
    return `Error listing volumes: ${err}`;
  }
}

module.exports = { listContainers, listImages, getContainer, listVolumes };