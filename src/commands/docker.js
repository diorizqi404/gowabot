const dockerService = require('../services/dockerService');

module.exports = {
  list: async ({ phone, gowaClient }) => {
    const result = await dockerService.listContainers()
    await gowaClient.sendMessage(phone, result);
  },
};
