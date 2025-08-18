const dockerService = require("../services/dockerService");

module.exports = {
  ls: async ({ phone, gowaClient }) => {
    const result = await dockerService.listContainers();
    await gowaClient.sendMessage(phone, result);
  },
  start: async ({ phone, gowaClient, args }) => {
    const result = await dockerService.startContainer(args);
    await gowaClient.sendMessage(phone, result);
  },
  restart: async ({ phone, gowaClient, args }) => {
    const result = await dockerService.restartContainer(args);
    await gowaClient.sendMessage(phone, result);
  },
  stop: async ({ phone, gowaClient, args }) => {
    const result = await dockerService.stopContainer(args);
    await gowaClient.sendMessage(phone, result);
  },
  logs: async ({ phone, gowaClient, args }) => {
    const result = await dockerService.getContainerLogs(args);
    await gowaClient.sendMessage(phone, result);
  },
  inspect: async ({ phone, gowaClient, args }) => {
    const result = await dockerService.getContainer(args);
    await gowaClient.sendMessage(phone, result);
  },
  images: async ({ phone, gowaClient }) => {
    const result = await dockerService.listImages();
    await gowaClient.sendMessage(phone, result);
  },
  volumes: async ({ phone, gowaClient }) => {
    const result = await dockerService.listVolumes();
    await gowaClient.sendMessage(phone, result);
  },
  networks: async ({ phone, gowaClient }) => {
    const result = await dockerService.listNetworks();
    await gowaClient.sendMessage(phone, result);
  },
};
