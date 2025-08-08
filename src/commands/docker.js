const dockerService = require('../services/dockerService');

module.exports = {
  list: async ({ phone, gowaClient }) => {
    const result = await dockerService.listContainers()
    await gowaClient.sendMessage(phone, result);
  },
  container: async ({ phone, gowaClient, args }) => {
    const result = await dockerService.getContainer(args)
    await gowaClient.sendMessage(phone, result);
  },
  img: async ({ phone, gowaClient }) => {
    const result = await dockerService.listImages()
    await gowaClient.sendMessage(phone, result);
  },
  volume: async ({ phone, gowaClient }) => {
    const result = await dockerService.listVolumes()
    await gowaClient.sendMessage(phone, result);
  },
};
