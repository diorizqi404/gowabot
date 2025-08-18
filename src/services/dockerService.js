const Docker = require("dockerode");
const unix_socket = process.env.DOCKER_UNIX_SOCKET || "/var/run/docker.sock";

let docker;
if (process.env.DOCKER_HOST && process.env.DOCKER_HOST_PORT) {
  docker = new Docker({
    host: process.env.DOCKER_HOST,
    port: process.env.DOCKER_HOST_PORT,
  });
} else {
  docker = new Docker({ socketPath: unix_socket });
}

async function listContainers() {
  try {
    const containers = await docker.listContainers({ all: true });

    if (containers.length === 0) return "No containers found.";

    return containers
      .map((c) => {
        const name = c.Names[0].replace(/^\//, "");
        const image = c.Image;
        const ports =
          Array.isArray(c.Ports) && c.Ports.length > 0
            ? `${c.Ports[0].PublicPort}:${c.Ports[0].PrivatePort}`
            : "No ports";
        const state = c.State;
        const status = c.Status;
        return `Name: ${name} \nImage: ${image} \nPorts: ${ports} \nState: ${state} \nStatus: ${status}`;
      })
      .join("\n\n");
  } catch (err) {
    return `Error listing containers: ${err}`;
  }
}

async function startContainer(name) {
  try {
    const container = docker.getContainer(name);
    await container.start();

    if (!container) return `Container ${name} not found.`;

    return `Container ${name} started successfully.`;
  } catch (err) {
    if (err.statusCode === 304) {
      return `Container ${name} is already started.`;
    }
    return `Error starting container: ${err}`;
  }
}

async function restartContainer(name) {
  try {
    const container = docker.getContainer(name);
    if (!container) return `Container ${name} not found.`;
    await container.restart();

    return `Container ${name} restarted successfully.`;
  } catch (err) {
    return `Error restarting container: ${err}`;
  }
}

async function stopContainer(name) {
  try {
    const container = docker.getContainer(name);
    if (!container) return `Container ${name} not found.`;
    await container.stop();

    return `Container ${name} stopped successfully.`;
  } catch (err) {
    return `Error stopping container: ${err}`;
  }
}

async function getContainerLogs(name) {
  try {
    const container = docker.getContainer(name);
    if (!container) return `Container ${name} not found.`;
    const logs = await container.logs({
      stdout: true,
      stderr: true,
      follow: false,
      tail: 100,
    });

    return `Logs for container ${name} retrieved successfully:\n\n${logs.toString()}`;
  } catch (err) {
    return `Error getting logs for container ${name}: ${err}`;
  }
}

async function getContainer(id) {
  try {
    const container = await docker.getContainer(id).inspect();
    return JSON.stringify(container, null, 2);
  } catch (err) {
    return `Error getting container: ${err}`;
  }
}

async function listImages() {
  try {
    const images = await docker.listImages();

    if (images.length === 0) return "No images found.";

    return images
      .map((img) => {
        const sizeMB = (img.Size / (1024 * 1024)).toFixed(2);
        return `${img.RepoTags[0]} [${sizeMB} MB]`;
      })
      .join("\n\n");
  } catch (err) {
    return `Error listing images: ${err}`;
  }
}

async function listVolumes() {
  try {
    const { Volumes } = await docker.listVolumes();

    if (!Volumes || Volumes.length === 0) return "No volumes found.";

    return Volumes.map((v) => `Name: ${v.Name} \nDriver: ${v.Driver} \nMountpoint: ${v.Mountpoint}`).join("\n\n");
  } catch (err) {
    return `Error listing volumes: ${err}`;
  }
}

async function listNetworks() {
  try {
    const networks = await docker.listNetworks();

    if (networks.length === 0) return "No networks found.";

    return networks.map((n) => `Name: ${n.Name} \nID: ${n.Id} \nDriver: ${n.Driver}`).join("\n\n");
  } catch (err) {
    return `Error listing networks: ${err}`;
  }
}

module.exports = {
  listContainers,
  startContainer,
  restartContainer,
  stopContainer,
  getContainerLogs,
  listImages,
  getContainer,
  listVolumes,
  listNetworks,
};
