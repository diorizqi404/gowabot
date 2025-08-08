const systemInfoService = require('../services/systemInfoService');

module.exports = {
  ping: async ({ phone, gowaClient }) => {
    await gowaClient.sendMessage(phone, "pong");
  },
    status: async ({ phone, gowaClient }) => {
    await gowaClient.sendMessage(phone, "semua sistem normal");
  },

  info: async ({ phone, gowaClient }) => {
    await gowaClient.sendMessage(phone, "⏳ Collecting system information...");
    const result = await systemInfoService.getSystemInfo();
    await gowaClient.sendMessage(phone, result);
  },
}